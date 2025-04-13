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
    // console.log("Schedule Data (Text):", scheduleText.substring(0, 200) + "...");

    // Extract JSON from scheduleText (remove JS wrapping)
    const scheduleJsonStartIndex = scheduleText.indexOf('({'); // Start of JSON for schedule is '({'
    const scheduleJsonEndIndex = scheduleText.lastIndexOf('})'); // End of JSON for schedule is '})'
    const scheduleJsonString = scheduleText.substring(scheduleJsonStartIndex + 1, scheduleJsonEndIndex + 1);
    const scheduleData = JSON.parse(scheduleJsonString);

    // console.log("Schedule Data (Parsed):", scheduleData); // Log the parsed data for debugging


    // --- Fetch Points Table Data ---
    const pointsTableUrl =
      "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp";
    const pointsTableResponse = await fetch(pointsTableUrl);
    if (!pointsTableResponse.ok) {
      throw new Error(`Failed to fetch points table: ${pointsTableResponse.status} ${pointsTableResponse.statusText}`);
    }
    const pointsTableText = await pointsTableResponse.text();
    // console.log("Points Table Data (Text):", pointsTableText.substring(0, 200) + "...");

    // Extract JSON from pointsTableText (remove JS wrapping) - already correct from previous version
    const pointsTableJsonStartIndex = pointsTableText.indexOf('(');
    const pointsTableJsonEndIndex = pointsTableText.lastIndexOf(')');
    const pointsTableJsonString = pointsTableText.substring(pointsTableJsonStartIndex + 1, pointsTableJsonEndIndex);
    const pointsTableData = JSON.parse(pointsTableJsonString);


    // --- Featured Match (simple logic: pick first "in progress" match if available) ---
    const allMatches = scheduleData?.Matchsummary || [];
    const featuredRaw = allMatches.find((match: any) => match.MatchStatus === "In Progress") || allMatches[0];

    // console.log("Featured Match Raw Data:", featuredRaw); // Log the raw data for debugging

    // --- Featured Match - Use all parameters from featuredRaw ---
    const featuredMatch: any | null = featuredRaw ? featuredRaw : null;


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
        matchStatus: match.MatchStatus, // Added matchStatus
        matchName: match.MatchName, // Added matchName
        team1Code: match.FirstBattingTeamCode, // Added team1Code
        team2Code: match.SecondBattingTeamCode, // Added team2Code
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

    // console.log("Scraped Data:", scraped);

    return NextResponse.json(scraped);
  } catch (error: any) {
    console.error("Scraping failed:", error.message);

    const fallback: ScrapedDataResponse = {
      featuredMatch: {
        CompetitionID: 203,
        MatchID: 1825,
        MatchTypeID: 8,
        MatchType: "T20 (N)",
        MatchStatus: "Post",
        MatchDate: "2025-04-12",
        MatchDateNew: "12 Apr 2025",
        MatchName: "Sunrisers Hyderabad vs Punjab Kings",
        MatchTime: "19:30",
        GMTMatchTime: "14:00 GMT",
        GMTMatchDate: "2025-04-12",
        GMTMatchEndTime: "18:29 GMT",
        GMTMatchEndDate: "2025-04-12",
        FirstBattingTeamID: 15,
        FirstBattingTeamName: "Punjab Kings",
        SecondBattingTeamID: 20,
        SecondBattingTeamName: "Sunrisers Hyderabad",
        FirstBattingTeamCode: "PBKS",
        SecondBattingTeamCode: "SRH",
        GroundID: 13,
        GroundName: "Rajiv Gandhi International Stadium",
        Commentss: "Sunrisers Hyderabad Won by 8  Wickets ",
        TossTeam: "Punjab Kings",
        TossDetails: "Punjab Kings Won The Toss And Elected To Bat",
        TossText: " Won The Toss And Elected To Bat",
        "1Summary": "245/6 (20.0 Ov)",
        "2Summary": "247/2 (18.3 Ov)",
        "1FallOvers": "20.0",
        "2FallOvers": "18.3",
        venue: "Fallback Stadium", // venue is still here for type compatibility if frontend expects it.
        time: "16:00 IST", // time is still here for type compatibility if frontend expects it.
        status: "live", // status is still here for type compatibility if frontend expects it.
        team1Code: "TeamA", // team1Code is still here for type compatibility if frontend expects it.
        team2Code: "TeamB", // team2Code is still here for type compatibility if frontend expects it.
        MatchTime: "16:00 IST",
        GroundName: "Fallback Stadium"
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
//     console.log("Schedule Data (Text):", scheduleText.substring(0, 200) + "...");

//     // Extract JSON from scheduleText (remove JS wrapping)
//     const scheduleJsonStartIndex = scheduleText.indexOf('({'); // Start of JSON for schedule is '({'
//     const scheduleJsonEndIndex = scheduleText.lastIndexOf('})'); // End of JSON for schedule is '})'
//     const scheduleJsonString = scheduleText.substring(scheduleJsonStartIndex + 1, scheduleJsonEndIndex + 1);
//     const scheduleData = JSON.parse(scheduleJsonString);


//     // --- Fetch Points Table Data ---
//     const pointsTableUrl =
//       "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp";
//     const pointsTableResponse = await fetch(pointsTableUrl);
//     if (!pointsTableResponse.ok) {
//       throw new Error(`Failed to fetch points table: ${pointsTableResponse.status} ${pointsTableResponse.statusText}`);
//     }
//     const pointsTableText = await pointsTableResponse.text();
//     console.log("Points Table Data (Text):", pointsTableText.substring(0, 200) + "...");

//     // Extract JSON from pointsTableText (remove JS wrapping) - already correct from previous version
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
