// app/schedule/page.tsx

"use client"; // Add this line at the top of the file to mark this as a client component

import { useEffect, useState } from "react";
import { MatchCard } from './matchCard';  // Adjust import if necessary

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ipl-data");
        const data: ScrapedDataResponse = await res.json();
        setScheduleData(data.schedule);  // Update state with the fetched data
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, []);  // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <p>Loading schedule data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Process schedule data (upcoming and completed weeks)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingWeeks: ScheduleWeek[] = [];
  const completedWeeks: ScheduleWeek[] = [];

  scheduleData.forEach(week => {
    const upcomingMatchesInWeek: ScheduleMatch[] = [];
    const completedMatchesInWeek: ScheduleMatch[] = [];

    week.matches.forEach((match) => {
      const matchDateParts = match.date.split(" ");
      const matchDay = parseInt(matchDateParts[0], 10);
      const matchMonthString = matchDateParts[1];
      const matchYear = parseInt(matchDateParts[2], 10);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const matchMonth = monthNames.indexOf(matchMonthString);
      const matchDate = new Date(matchYear, matchMonth, matchDay);

      if (matchDate >= currentDate) {
        upcomingMatchesInWeek.push(match);
      } else {
        completedMatchesInWeek.push(match);
      }
    });

    if (upcomingMatchesInWeek.length > 0) {
      upcomingWeeks.push({ date: week.date, matches: upcomingMatchesInWeek });
    }
    if (completedMatchesInWeek.length > 0) {
      completedWeeks.push({ date: week.date, matches: completedMatchesInWeek });
    }
  });

  return (
    <section className="container mx-auto py-12 px-6 md:px-8 lg:px-12 space-y-10">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          IPL Match Schedule
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Get ready for the excitement! Here&apos;s the schedule for upcoming and completed matches.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {scheduleData.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500 text-lg">No schedule data available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {upcomingWeeks.length > 0 && (
              <div className="py-8 px-6 md:px-8">
                <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-6">
                  <i className="far fa-calendar-alt mr-2"></i> Upcoming Matches
                </h2>
                <div className="space-y-8">
                  {upcomingWeeks.map((week, weekIndex) => (
                    <div key={`upcoming-week-${weekIndex}`} className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3 px-3 py-1.5 bg-gray-100 rounded-md inline-block text-base md:text-lg">
                        <i className="far fa-calendar-week mr-2"></i> {week.date}
                      </h3>
                      <div className="space-y-8 mt-6">
                        {week.matches.map((match, matchIndex) => (
                          <MatchCard key={`upcoming-match-${matchIndex}`} match={match} index={matchIndex} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedWeeks.length > 0 && (
              <div className="py-8 px-6 md:px-8">
                <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-6">
                  <i className="fas fa-history mr-2"></i> Completed Matches
                </h2>
                <div className="space-y-8">
                  {completedWeeks.map((week, weekIndex) => (
                    <div key={`completed-week-${weekIndex}`} className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-3 px-3 py-1.5 bg-gray-100 rounded-md inline-block text-base md:text-lg">
                        <i className="far fa-calendar-week mr-2"></i> {week.date}
                      </h3>
                      <div className="space-y-8 mt-6">
                        {week.matches.map((match, matchIndex) => (
                          <MatchCard key={`completed-match-${matchIndex}`} match={match} index={matchIndex} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;
