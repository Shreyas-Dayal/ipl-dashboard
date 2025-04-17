// app/page.tsx
"use client"

import { useEffect, useState } from "react";
import FeaturedMatchCard from "./components/FeaturedMatchCard";
import UpcomingMatchesCarousel from './components/UpcomingMatchesCarousel'; // Adjust path if needed
import PointsTableSection from './components/PointsTableSection'; // Adjust path if needed

export const dynamic = "force-dynamic"; // Server-side rendering

export default function Home() {
  const [data, setData] = useState<ScrapedDataResponse | null>(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "/api/ipl-data", { cache: "no-store" });
      console.log("Fetching data from API...");
      const fetchedData: ScrapedDataResponse = await res.json();
      console.log('ScrapedDataResponse', fetchedData);
      setData(fetchedData); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchData(); // Initial data fetch when the component mounts

    // Set an interval to re-fetch the data every 10 seconds
    const intervalId = setInterval(fetchData, 30000); // 10000 ms = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run once on mount

  // Return loading state if data is not yet fetched
  if (!data) {
    return <p>Loading data...</p>;
  }

  const match = data.featuredMatch as ScheduleMatchRaw | null;
  const scheduleWeeks = data.schedule;
  const pointsTableData = data.pointsTable;
  const matchNotes = data.matchNotes

  if (!match) {
    return <p>No featured match data available.</p>;
  }

  const allScheduleMatches: ScheduleMatch[] = scheduleWeeks.reduce(
    (matches: ScheduleMatch[], week: ScheduleWeek): ScheduleMatch[] => {
      return [...matches, ...week.matches];
    },
    []
  );

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingMatches: ScheduleMatch[] = allScheduleMatches.filter(
    (match: ScheduleMatch) => {
      const matchDateParts = match.date.split(" ");
      const matchDay = parseInt(matchDateParts[0], 10);
      const matchMonthString = matchDateParts[1];
      const matchYear = parseInt(matchDateParts[2], 10);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const matchMonth = monthNames.indexOf(matchMonthString);
      const matchDate = new Date(matchYear, matchMonth, matchDay);
      return matchDate >= currentDate;
    }
  );

  const displayedUpcomingMatches = upcomingMatches.slice(0, 5); // Limit to 5 for carousel and table

  return (
    <section className="space-y-8">
      {/* Featured Match Card Component */}
      <FeaturedMatchCard match={match} matchNotes={matchNotes}/>

      {/* Upcoming Matches Carousel Section */}
      <UpcomingMatchesCarousel upcomingMatches={displayedUpcomingMatches} />

      {/* Points Table Section on Home Page */}
      <PointsTableSection pointsTableData={pointsTableData} />
    </section>
  );
}
