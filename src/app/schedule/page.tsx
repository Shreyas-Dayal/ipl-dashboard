"use client";

import { useState, useMemo } from 'react'; 
import { useIplStore } from '@/store/iplStore';
import { MatchCard } from './matchCard';

type MatchStatusFilter = 'All' | 'Live' | 'Upcoming' | 'Completed';

const Schedule = () => {
  const scrapedData = useIplStore((state) => state.data);
  const loading = useIplStore((state) => state.loading);
  const error = useIplStore((state) => state.error);

  const [filter, setFilter] = useState<MatchStatusFilter>('All');

  const allMatches = useMemo(() => {
    if (!scrapedData?.schedule) return [];
    return scrapedData.schedule.reduce((acc: ScheduleMatch[], week: ScheduleWeek) => {
        if (Array.isArray(week.matches)) {
            const matchesWithWeekDate = week.matches.map(match => ({ ...match, weekDate: week.date }));
            return acc.concat(matchesWithWeekDate);
        }
        return acc;
    }, []);
  }, [scrapedData?.schedule]);


  const filteredMatches = useMemo(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return allMatches.filter(match => {
      if (filter === 'All') return true;

      let matchDate: Date | null = null;
      if (typeof match.date === 'string') {
          const parts = match.date.split(" ");
          if (parts.length === 3) {
              const day = parseInt(parts[0], 10);
              const monthStr = parts[1];
              const year = parseInt(parts[2], 10);
              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const month = monthNames.indexOf(monthStr);
              if (!isNaN(day) && month !== -1 && !isNaN(year)) {
                  try { matchDate = new Date(year, month, day); } catch {/* ignore */}
              }
          }
      }

      const isUpcoming = matchDate && matchDate >= currentDate;
      // const isCompleted = match.matchStatus === 'Post' || (matchDate && matchDate < currentDate && match.matchStatus !== 'Live' && match.matchStatus !== 'Scheduled'); // Basic heuristic for completed


      switch (filter) {
        case 'Live':
          // Assuming 'In Progress' or 'Live' signifies live
          return match.matchStatus === 'Live' || match.matchStatus === 'In Progress';
        case 'Upcoming':
          // Scheduled status OR future date and not live/completed
          return match.matchStatus === 'Scheduled' || (isUpcoming && match.matchStatus !== 'Live' && match.matchStatus !== 'In Progress' && match.matchStatus !== 'Post');
        case 'Completed':
           // 'Post' status OR a past date (and not live)
           return match.matchStatus === 'Post' || (matchDate && matchDate < currentDate && match.matchStatus !== 'Live' && match.matchStatus !== 'In Progress');
        default:
          return true;
      }
    });
  }, [allMatches, filter]);

  type ScheduleMatchWithWeek = ScheduleMatch & { weekDate?: string };

  const groupedFilteredMatches = useMemo(() => {
    const groups: { [date: string]: ScheduleMatch[] } = {};
    filteredMatches.forEach(match => {
        const weekDate = (match as ScheduleMatchWithWeek).weekDate || match.date; // Use weekDate or fallback to match.date
        if (!groups[weekDate]) {
            groups[weekDate] = [];
        }
        groups[weekDate].push(match);
    });
    return Object.entries(groups)
           .sort(([dateA], [dateB]) => {
                try {
                    // Rudimentary date sort - implement robustly if needed
                    return new Date(dateA).getTime() - new Date(dateB).getTime();
                } catch {
                    return 0;
                }
           })
           .map(([date, matches]) => ({ date, matches }));
  }, [filteredMatches]);


  if (loading) {
    return <p>Loading schedule data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!scrapedData?.schedule || allMatches.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 text-lg">No schedule data available at the moment.</p>
      </div>
    )
  }


  const getFilterButtonClass = (buttonFilter: MatchStatusFilter) => {
    const baseClass = "py-2 px-4 rounded-lg text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50";
    if (filter === buttonFilter) {
      return `${baseClass} bg-blue-600 text-white focus:ring-blue-400`;
    }
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400`;
  };


  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          IPL Match Schedule
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Browse upcoming, live, and completed matches.
        </p>
      </header>

      {/* Filter Controls */}
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 flex-wrap gap-2">
        <button className={getFilterButtonClass('All')} onClick={() => setFilter('All')}>All</button>
        <button className={getFilterButtonClass('Upcoming')} onClick={() => setFilter('Upcoming')}>Upcoming</button>
        <button className={getFilterButtonClass('Live')} onClick={() => setFilter('Live')}>Live</button>
        <button className={getFilterButtonClass('Completed')} onClick={() => setFilter('Completed')}>Completed</button>
      </div>


      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {groupedFilteredMatches.length > 0 ? (
            groupedFilteredMatches.map((week, weekIndex) => (
              <div key={`filtered-week-${week.date}-${weekIndex}`} className="py-8 px-4 sm:px-6 md:px-8">
                <h3 className="font-medium text-gray-700 mb-3 px-3 py-1.5 bg-gray-100 rounded-md inline-block text-base md:text-lg">
                  <i className="far fa-calendar-week mr-2"></i> {week.date}
                </h3>
                <div className="space-y-8 mt-6">
                  {week.matches.map((match, matchIndex) => (
                    <MatchCard key={match.matchId || `filtered-match-${matchIndex}`} match={match} index={matchIndex} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-lg">No matches found for the selected filter: <span className="font-semibold">{filter}</span>.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;