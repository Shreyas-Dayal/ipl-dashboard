"use client"

import { useIplStore } from '@/store/iplStore';
import FeaturedMatchCard from "./components/FeaturedMatchCard";
import UpcomingMatchesCarousel from './components/UpcomingMatchesCarousel';
import PointsTableSection from './components/PointsTableSection';

export const dynamic = "force-dynamic";

export default function Home() {
  const { data, loading, error } = useIplStore();


  if (loading) {
    return <p>Loading IPL data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>No data available at the moment.</p>;
  }

  const match = data.featuredMatch;
  const scheduleWeeks = data.schedule || [];
  const pointsTableData = data.pointsTable || [];
  const matchNotes = data.matchNotes || [];

  if (!match) {
    console.warn("Featured match data is missing from the store.");
  }

  const allScheduleMatches: ScheduleMatch[] = scheduleWeeks.reduce(
    (matches: ScheduleMatch[], week: ScheduleWeek): ScheduleMatch[] => {
      // Ensure week.matches exists and is an array
      if (Array.isArray(week.matches)) {
        return [...matches, ...week.matches];
      }
      return matches;
    },
    []
  );

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingMatches: ScheduleMatch[] = allScheduleMatches.filter(
    (match: ScheduleMatch) => {
      if (typeof match?.date !== 'string') return false; // Skip if date is invalid

      const matchDateParts = match.date.split(" ");
      if (matchDateParts.length !== 3) return false; // Skip if format is wrong

      const matchDay = parseInt(matchDateParts[0], 10);
      const matchMonthString = matchDateParts[1];
      const matchYear = parseInt(matchDateParts[2], 10);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const matchMonth = monthNames.indexOf(matchMonthString);

      if (isNaN(matchDay) || matchMonth === -1 || isNaN(matchYear)) return false; // Skip if parsing failed

      try {
        const matchDate = new Date(matchYear, matchMonth, matchDay);
        // Check if date object is valid
        return !isNaN(matchDate.getTime()) && matchDate >= currentDate;
      } catch (e) {
        console.error("Error creating date object for match:", match, e);
        return false; // Skip if date creation throws error
      }
    }
  );

  // Limit upcoming matches for display
  const displayedUpcomingMatches = upcomingMatches.slice(0, 5);

  return (
    <section className="space-y-8">
      {/* Featured Match Card Component */}
      {match ? (
        <FeaturedMatchCard match={match} matchNotes={matchNotes} />
      ) : (
        <div className="p-4 text-center bg-gray-100 rounded-lg shadow">No featured match currently available.</div>
      )}
      {/* Upcoming Matches Carousel Section */}
      {displayedUpcomingMatches.length > 0 ? (
        <UpcomingMatchesCarousel upcomingMatches={displayedUpcomingMatches} />
      ) : (
        <div className="p-4 text-center bg-gray-100 rounded-lg shadow">No upcoming matches to display.</div>
      )}
      {/* Points Table Section on Home Page */}
      {pointsTableData.length > 0 ? (
        <PointsTableSection pointsTableData={pointsTableData} />
      ) : (
        <div className="p-4 text-center bg-gray-100 rounded-lg shadow">Points table data is currently unavailable.</div>
      )}
    </section>
  );
}