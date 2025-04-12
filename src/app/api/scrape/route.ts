// app/api/ipl-data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // --- Fetch Match Schedule and Summary Data ---
    const scheduleUrl =
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp";
    const scheduleResponse = await fetch(scheduleUrl);
    if (!scheduleResponse.ok) {
      throw new Error(`Failed to fetch match schedule: ${scheduleResponse.status} ${scheduleResponse.statusText}`);
    }
    const scheduleText = await scheduleResponse.text();
    console.log("Schedule Data (Text):", scheduleText.substring(0, 200) + "...");

    // Extract JSON from scheduleText (remove JS wrapping)
    const scheduleJsonStartIndex = scheduleText.indexOf('({'); // Start of JSON for schedule is '({'
    const scheduleJsonEndIndex = scheduleText.lastIndexOf('})'); // End of JSON for schedule is '})'
    const scheduleJsonString = scheduleText.substring(scheduleJsonStartIndex + 1, scheduleJsonEndIndex + 1);
    const scheduleData = JSON.parse(scheduleJsonString);


    // --- Fetch Points Table Data ---
    const pointsTableUrl =
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp";
    const pointsTableResponse = await fetch(pointsTableUrl);
    if (!pointsTableResponse.ok) {
      throw new Error(`Failed to fetch points table: ${pointsTableResponse.status} ${pointsTableResponse.statusText}`);
    }
    const pointsTableText = await pointsTableResponse.text();
    console.log("Points Table Data (Text):", pointsTableText.substring(0, 200) + "...");

    // Extract JSON from pointsTableText (remove JS wrapping) - already correct from previous version
    const pointsTableJsonStartIndex = pointsTableText.indexOf('(');
    const pointsTableJsonEndIndex = pointsTableText.lastIndexOf(')');
    const pointsTableJsonString = pointsTableText.substring(pointsTableJsonStartIndex + 1, pointsTableJsonEndIndex);
    const pointsTableData = JSON.parse(pointsTableJsonString);


    // --- Featured Match (simple logic: pick first "in progress" match if available) ---
    const allMatches = scheduleData?.Matchsummary || [];
    const featuredRaw = allMatches.find((match: any) => match.MatchStatus === "In Progress") || allMatches[0];

    const featuredMatch: MatchInfo | null = featuredRaw
      ? {
          team1: featuredRaw.FirstBattingTeamName,
          team2: featuredRaw.SecondBattingTeamName,
          score1: featuredRaw["1Summary"] ?? "",
          score2: featuredRaw["2Summary"] ?? "",
          overs1: featuredRaw["1FallOvers"] ?? "",
          overs2: featuredRaw["2FallOvers"] ?? "",
          venue: featuredRaw.GroundName,
          time: featuredRaw.MatchTime,
          status: featuredRaw.MatchStatus?.toLowerCase() || "upcoming",
        }
      : null;

    // --- Points Table ---
    const pointsTable: PointsTableEntry[] = pointsTableData?.points || [];

    // --- Group Schedule by Date ---
    const groupedScheduleMap: { [date: string]: ScheduleWeek["matches"] } = {};
    for (const match of allMatches) {
      const date = match.MatchDateNew;
      if (!groupedScheduleMap[date]) groupedScheduleMap[date] = [];
      groupedScheduleMap[date].push({
        date,
        teams: [match.FirstBattingTeamCode, match.SecondBattingTeamCode],
        time: match.MatchTime,
        venue: match.GroundName,
      });
    }

    const schedule: ScheduleWeek[] = Object.entries(groupedScheduleMap).map(([date, matches]) => ({
      date,
      matches,
    }));

    // --- Final Response ---
    const scraped: ScrapedDataResponse = {
      featuredMatch,
      pointsTable,
      schedule,
    };

    console.log("Scraped Data:", scraped);

    return NextResponse.json(scraped);
  } catch (error: any) {
    console.error("Scraping failed:", error.message);

    const fallback: ScrapedDataResponse = {
      featuredMatch: {
        team1: "Fallback Team A",
        team2: "Fallback Team B",
        score1: "120/3",
        score2: "119/7",
        overs1: "14.5",
        overs2: "20",
        venue: "Fallback Stadium",
        time: "16:00 IST",
        status: "live",
      },
      pointsTable: [],
      schedule: [],
    };

    return NextResponse.json(fallback);
  }
}

// // app/api/ipl-data/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // --- Fetch Match Schedule and Summary Data ---
//     const scheduleUrl =
//       "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp";
//     const scheduleResponse = await fetch(scheduleUrl);
//     if (!scheduleResponse.ok) {
//       throw new Error(`Failed to fetch match schedule: ${scheduleResponse.status} ${scheduleResponse.statusText}`);
//     }
//     const scheduleText = await scheduleResponse.text();
//     console.log("Schedule Data (Text):", scheduleText.substring(0, 200) + "..."); // Log first 200 chars

//     // Extract JSON from scheduleText (remove the JS wrapping)
//     const scheduleJsonStartIndex = scheduleText.indexOf('{');
//     const scheduleJson = scheduleText.substring(scheduleJsonStartIndex);
//     const scheduleData = JSON.parse(scheduleJson);


//     // --- Fetch Points Table Data ---
//     const pointsTableUrl =
//       "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp";
//     const pointsTableResponse = await fetch(pointsTableUrl);
//     if (!pointsTableResponse.ok) {
//       throw new Error(`Failed to fetch points table: ${pointsTableResponse.status} ${pointsTableResponse.statusText}`);
//     }
//     const pointsTableText = await pointsTableResponse.text();
//     console.log("Points Table Data (Text):", pointsTableText.substring(0, 200) + "..."); // Log first 200 chars

//     // Extract JSON from pointsTableText (remove the JS wrapping)
//     const pointsTableJsonStartIndex = pointsTableText.indexOf('(');
//     const pointsTableJsonEndIndex = pointsTableText.lastIndexOf(')');
//     const pointsTableJsonString = pointsTableText.substring(pointsTableJsonStartIndex + 1, pointsTableJsonEndIndex);
//     const pointsTableData = JSON.parse(pointsTableJsonString);


//     // --- Featured Match (simple logic: pick first "in progress" match if available) ---
//     const allMatches = scheduleData?.Matchsummary || [];
//     const featuredRaw = allMatches.find((match: any) => match.MatchStatus === "In Progress") || allMatches[0];

//     const featuredMatch: MatchInfo | null = featuredRaw
//       ? {
//           team1: featuredRaw.FirstBattingTeamName,
//           team2: featuredRaw.SecondBattingTeamName,
//           score1: featuredRaw["1Summary"] ?? "",
//           score2: featuredRaw["2Summary"] ?? "",
//           overs1: featuredRaw["1FallOvers"] ?? "",
//           overs2: featuredRaw["2FallOvers"] ?? "",
//           venue: featuredRaw.GroundName,
//           time: featuredRaw.MatchTime,
//           status: featuredRaw.MatchStatus?.toLowerCase() || "upcoming",
//         }
//       : null;

//     // --- Points Table ---
//     const pointsTable: PointsTableEntry[] = pointsTableData?.points || [];

//     // --- Group Schedule by Date ---
//     const groupedScheduleMap: { [date: string]: ScheduleWeek["matches"] } = {};
//     for (const match of allMatches) {
//       const date = match.MatchDateNew;
//       if (!groupedScheduleMap[date]) groupedScheduleMap[date] = [];
//       groupedScheduleMap[date].push({
//         date,
//         teams: [match.FirstBattingTeamCode, match.SecondBattingTeamCode],
//         time: match.MatchTime,
//         venue: match.GroundName,
//       });
//     }

//     const schedule: ScheduleWeek[] = Object.entries(groupedScheduleMap).map(([date, matches]) => ({
//       date,
//       matches,
//     }));

//     // --- Final Response ---
//     const scraped: ScrapedDataResponse = {
//       featuredMatch,
//       pointsTable,
//       schedule,
//     };

//     console.log("Scraped Data:", scraped);

//     return NextResponse.json(scraped);
//   } catch (error: any) {
//     console.error("Scraping failed:", error.message);

//     const fallback: ScrapedDataResponse = {
//       featuredMatch: {
//         team1: "Fallback Team A",
//         team2: "Fallback Team B",
//         score1: "120/3",
//         score2: "119/7",
//         overs1: "14.5",
//         overs2: "20",
//         venue: "Fallback Stadium",
//         time: "16:00 IST",
//         status: "live",
//       },
//       pointsTable: [],
//       schedule: [],
//     };

//     return NextResponse.json(fallback);
//   }
// }

// // app/api/ipl-data/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // --- Fetch Match Schedule and Summary Data ---
//     const scheduleUrl =
//       "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp";
//     const scheduleResponse = await fetch(scheduleUrl);
//     if (!scheduleResponse.ok) {
//       throw new Error(`Failed to fetch match schedule: ${scheduleResponse.status} ${scheduleResponse.statusText}`);
//     }
//     const scheduleText = await scheduleResponse.text(); // Get text as text
//     console.log("Schedule Data (Text):", scheduleText); // Log text response
//     // const scheduleData = (await scheduleResponse.json()); // REMOVE or comment out JSON parsing here

//     // --- Fetch Points Table Data ---
//     const pointsTableUrl =
//       "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp";
//     const pointsTableResponse = await fetch(pointsTableUrl);
//     if (!pointsTableResponse.ok) {
//       throw new Error(`Failed to fetch points table: ${pointsTableResponse.status} ${pointsTableResponse.statusText}`);
//     }
//     const pointsTableData = await pointsTableResponse.json(); // Parse as JSON - ONLY ONCE
//     console.log("Points Table Data (JSON):", pointsTableData); // Log JSON response

//     // --- Featured Match (simple logic: pick first "in progress" match if available) ---
//     // **⚠️  `scheduleData` is not JSON - allMatches will be undefined or error. Fix after parsing scheduleText!**
//     const allMatches = scheduleData?.Matchsummary || []; // This line will cause error or undefined now, fix later
//     const featuredRaw = allMatches.find((match: any) => match.MatchStatus === "In Progress") || allMatches[0];

//     const featuredMatch: MatchInfo | null = featuredRaw
//       ? {
//           team1: featuredRaw.FirstBattingTeamName,
//           team2: featuredRaw.SecondBattingTeamName,
//           score1: featuredRaw["1Summary"] ?? "",
//           score2: featuredRaw["2Summary"] ?? "",
//           overs1: featuredRaw["1FallOvers"] ?? "",
//           overs2: featuredRaw["2FallOvers"] ?? "",
//           venue: featuredRaw.GroundName,
//           time: featuredRaw.MatchTime,
//           status: featuredRaw.MatchStatus?.toLowerCase() || "upcoming",
//         }
//       : null;

//     // --- Points Table ---
//     const pointsTable: PointsTableEntry[] = pointsTableData?.points || [];

//     // --- Group Schedule by Date ---
//     const groupedScheduleMap: { [date: string]: ScheduleWeek["matches"] } = {};
//     for (const match of allMatches) { // allMatches will be empty/undefined now
//       const date = match.MatchDateNew;
//       if (!groupedScheduleMap[date]) groupedScheduleMap[date] = [];
//       groupedScheduleMap[date].push({
//         date,
//         teams: [match.FirstBattingTeamCode, match.SecondBattingTeamCode],
//         time: match.MatchTime,
//         venue: match.GroundName,
//       });
//     }

//     const schedule: ScheduleWeek[] = Object.entries(groupedScheduleMap).map(([date, matches]) => ({
//       date,
//       matches,
//     }));

//     // --- Final Response ---
//     const scraped: ScrapedDataResponse = {
//       featuredMatch,
//       pointsTable,
//       schedule,
//     };

//     console.log("Scraped Data:", scraped); // Debugging line

//     return NextResponse.json(scraped);
//   } catch (error: any) {
//     console.error("Scraping failed:", error.message);

//     const fallback: ScrapedDataResponse = {
//       featuredMatch: {
//         team1: "Fallback Team A",
//         team2: "Fallback Team B",
//         score1: "120/3",
//         score2: "119/7",
//         overs1: "14.5",
//         overs2: "20",
//         venue: "Fallback Stadium",
//         time: "16:00 IST",
//         status: "live",
//       },
//       pointsTable: [],
//       schedule: [],
//     };

//     return NextResponse.json(fallback);
//   }
// }

// // app/api/scrape/route.ts
// import { NextResponse } from "next/server"

// export async function GET() {
//   // Dummy data to simulate scraping results.
//   const dummyData = {
//     featuredMatch: {
//       team1: "Chennai Super Kings",
//       team2: "Mumbai Indians",
//       score1: "156/4",
//       score2: "124/8",
//       overs1: "16.2",
//       overs2: "20",
//       venue: "M. A. Chidambaram Stadium, Chennai",
//       time: "15:30 IST",
//       status: "live",
//     },
//     pointsTable: [
//       { pos: 1, team: "CSK", p: 8, w: 6, l: 2, pts: 12, nrr: "+0.825" },
//       { pos: 2, team: "RR", p: 7, w: 5, l: 2, pts: 10, nrr: "+0.677" },
//       { pos: 3, team: "KKR", p: 7, w: 5, l: 2, pts: 10, nrr: "+0.493" },
//       { pos: 4, team: "LSG", p: 8, w: 4, l: 4, pts: 8, nrr: "+0.334" },
//       // ... add additional teams as needed
//     ],
//     schedule: [
//       {
//         date: "April 15-21",
//         matches: [
//           {
//             date: "Apr 15",
//             teams: ["KKR", "RCB"],
//             time: "19:30 IST",
//             venue: "Eden Gardens, Kolkata",
//           },
//           {
//             date: "Apr 16",
//             teams: ["CSK", "SRH"],
//             time: "15:30 IST",
//             venue: "M. A. Chidambaram Stadium, Chennai",
//           },
//         ],
//       },
//       // You can add more week ranges if needed.
//     ],
//   }

//   return NextResponse.json(dummyData)
// }
