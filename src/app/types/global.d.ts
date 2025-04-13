// types/global.d.ts

/**
 * Type definitions for IPL Dashboard Global State based on API data.
 * Not all fields may be used in the final application, but are defined for completeness.
 */

// ----------------------- Points Table Types -----------------------

/**
 * Represents the overall response structure for the points table API.
 */
interface PointsTableApiResponse {
  category: null | string; // Example shows null
  points: PointsTableEntryRaw[];
}

/**
 * Raw data structure for a points table entry from the API.
 * This includes all fields available in the 'points' array of the API response.
 */
interface PointsTableEntryRaw {
  StandingFlag: string; // "NET" in example
  Category: null | string; // Example shows null
  CompetitionID: string; // "203"
  TeamID: string; // Team ID as string, e.g., "14"
  TeamCode: string; // Team short code, e.g., "DC"
  TeamName: string; // Team full name, e.g., "Delhi Capitals"
  TeamLogo: string; // URL to team logo
  Matches: string; // Number of matches played as string, e.g., "4"
  Wins: string; // Number of wins as string, e.g., "4"
  Loss: string; // Number of losses as string, e.g., "0"
  Tied: string; // Number of tied matches as string, e.g., "0"
  NoResult: string; // Number of no result matches as string, e.g., "0"
  Points: string; // Points earned as string, e.g., "8"
  Draw: string; // Number of draws, likely always "0" in T20, as string
  ForTeams: string; // Runs scored for/overs faced, e.g., "729\/73.2"
  AgainstTeam: string; // Runs conceded/overs bowled, e.g., "693\/80.0"
  NetRunRate: string; // Net Run Rate, e.g., "1.278"
  Quotient: string; // Quotient, e.g., "1.434"
  OrderNo: string; // Rank order number as string, e.g., "1"
  IsQualified: null | string; // Qualification status, example shows null
  LeadBy: string; // Difference leading by, e.g., "0"
  Deficit: string; // Deficit, e.g., "0"
  Performance: string; // Performance in last few matches, e.g., "W,W,W,W"
  Status: string; // Status, e.g., "SAME"
  MATCH_ID: string; // Match ID, e.g., "1824"
  PrevPosition: string; // Previous position, e.g., "1"
}

/**
 *  Processed Points Table Entry used in the application.
 *  Extends PointsTableEntryRaw and converts relevant string fields to numbers.
 */
interface PointsTableEntry extends Omit<PointsTableEntryRaw, 'Matches' | 'Wins' | 'Loss' | 'Tied' | 'NoResult' | 'Points' | 'Draw' | 'OrderNo'> {
  pos: number;         // Rank position as number
  Matches: number;           // Matches played as number
  Wins: number;           // Wins as number
  Loss: number;           // Losses as number
  Points: number;         // Points as number
  team: string;        // Team Name
  teamCode: string;    // Team Code
  nrr: string;         // Net Run Rate
  // ... (other string fields remain as strings)
}


// ----------------------- Match Schedule Types -----------------------

/**
 * Represents the overall response structure for the match schedule API.
 */
interface ScheduleApiResponse {
  CompetitionID: number; // 203
  Matchsummary: ScheduleMatchRaw[];
}


/**
 * Raw data structure for a match schedule entry from the API.
 * This includes almost all fields available in the 'Matchsummary' array of the API response.
 * Some very specific or less relevant fields might be skipped for brevity if not needed.
 */
interface ScheduleMatchRaw {
  CompetitionID: number; // 203
  MatchID: number; // Match ID, e.g., 1822
  MatchTypeID: number; // Match Type ID, e.g., 8
  MatchType: string; // Match Type, e.g., "T20 (N)"
  MatchStatus: string; // Match status, e.g., "Post", "In Progress", "Upcoming"
  MatchDate: string; // Match date in YYYY-MM-DD format, e.g., "2025-04-10"
  MatchDateNew: string; // Match date in readable format, e.g., "10 Apr 2025"
  MatchName: string; // Full match name, e.g., "Royal Challengers Bengaluru vs Delhi Capitals"
  MatchTime: string; // Match time, e.g., "19:30"
  GMTMatchTime: string; // GMT match time, e.g., "14:00 GMT"
  GMTMatchDate: string; // GMT match date, e.g., "2025-04-10"
  GMTMatchEndTime: string; // GMT match end time, e.g., "18:29 GMT"
  GMTMatchEndDate: string; // GMT match end date, e.g., "2025-04-10"
  FirstBattingTeamID: number; // Team ID of first batting team
  FirstBattingTeamName: string; // Name of first batting team
  SecondBattingTeamID: number; // Team ID of second batting team
  SecondBattingTeamName: string; // Name of second batting team
  FirstBattingTeamCode: string; // Short code of first batting team, e.g., "RCB"
  SecondBattingTeamCode: string; // Short code of second batting team, e.g., "DC"
  GroundID: number; // Ground ID, e.g., 12
  GroundName: string; // Ground name, e.g., "M Chinnaswamy Stadium"
  Commentss?: string; // Match comments/result summary
  TossTeam?: string; // Team that won the toss
  TossDetails?: string; // Details of toss decision
  TossText?: string; // Toss details text
  Flag?: number; // Flag value, e.g., 1
  FirstBattingSummary?: string; // Summary of first batting innings, e.g., "163/7 (20.0 Ov)"
  SecondBattingSummary?: string; // Summary of second batting innings, e.g., "169/4 (17.5 Ov)"
  ClientMatchID?: string; // Client match ID
  MATCH_COMMENCE_START_DATE?: string; // Match commence start date and time
  city?: string; // City of the match, e.g., "Bengaluru"
  FlickrAlbumID?: string; // Flickr album ID
  LiveStream?: string; // Live stream URL
  FBURL?: string; // Facebook URL
  T20ProMatchID?: string; // T20 Pro Match ID
  Temperature?: string; // Temperature
  WeatherIcon?: string; // Weather icon URL
  TempUpdatedDate?: string; // Last updated date of temperature
  GroundUmpire1ID?: number; // Ground umpire 1 ID
  GroundUmpire2ID?: number; // Ground umpire 2 ID
  GroundUmpire3ID?: number; // Ground umpire 3 ID (Third umpire in example data)
  RefereeID?: number; // Referee ID
  HomeTeamID?: string; // Home team ID
  HomeTeamName?: string; // Home team name
  HomeTeamColor1?: string; // Home team color 1 (hex code or name)
  HomeTeamColor2?: string; // Home team color 2
  AwayTeamColor1?: string; // Away team color 1
  AwayTeamColor2?: string; // Away team color 2
  AwayTeamID?: string; // Away team ID
  AwayTeamName?: string; // Away team name
  timezone1?: string; // Timezone, e.g., "Asia/Kolkata"
  MatchEndDate?: string; // Match end date
  MatchEndTime?: string; // Match end time
  MATCH_NO_OF_OVERS?: string; // Number of overs in match, e.g., "20"
  ROUND_ID?: string; // Round ID, e.g., "0"
  MatchTypeName?: string; // Match type name, e.g., "T20"
  RowNo?: number; // Row number in schedule
  TeamType?: null | string; // Team type, example shows null
  CompetitionName?: string; // Competition name, e.g., "Tata Ipl 2025"
  GroundUmpire1?: string; // Ground umpire 1 name
  GroundUmpire2?: string; // Ground umpire 2 name
  ThirdUmpire?: string; // Third umpire name
  Comments?: string; // Match comments (duplicate of Commentss?)
  HomeTeamLogo?: string; // Home team logo URL
  AwayTeamLogo?: string; // Away team logo URL
  MatchHomeTeamLogo?: string; // Match home team logo URL (duplicate of HomeTeamLogo?)
  MatchAwayTeamLogo?: string; // Match away team logo URL (duplicate of AwayTeamLogo?)
  VideoScorecard?: number; // Video scorecard flag, e.g., 0
  TimeZone?: string; // Timezone offset, e.g., "+9.5"
  CurrentStrikerID?: string; // ID of current striker
  CurrentStrikerName?: string; // Name of current striker
  StrikerRuns?: number; // Runs of current striker
  StrikerBalls?: number; // Balls faced by current striker
  StrikerFours?: number; // Fours by current striker
  StrikerSixes?: number; // Sixes by current striker
  StrikerSR?: number; // Strike rate of current striker
  StrikerImage?: string; // Image URL of current striker
  CurrentNonStrikerID?: string; // ID of current non-striker
  CurrentNonStrikerName?: string; // Name of current non-striker
  NonStrikerRuns?: number; // Runs of current non-striker
  NonStrikerBalls?: number; // Balls faced by current non-striker
  NonStrikerFours?: number; // Fours by current non-striker
  NonStrikerSixes?: number; // Sixes by current non-striker
  NonStrikerSR?: number; // Strike rate of current non-striker
  NonStrikerImage?: string; // Image URL of current non-striker
  CurrentBowlerID?: string; // ID of current bowler
  CurrentBowlerName?: string; // Name of current bowler
  BowlerOvers?: string; // Overs bowled by current bowler, e.g., "3.5"
  BowlerRuns?: number; // Runs conceded by current bowler
  BowlerMaidens?: number; // Maidens bowled by current bowler
  BowlerWickets?: number; // Wickets taken by current bowler
  BowlerEconomy?: number; // Economy rate of current bowler
  BowlerSR?: number; // Strike rate of current bowler
  BowlerImage?: string; // Image URL of current bowler
  ChasingText?: string; // Text related to chasing target
  MatchBreakComments?: string; // Comments during match break
  MatchProgress?: string; // Match progress status
  CurrentInnings?: string; // Current innings number, e.g., "2"
  "1Summary"?: string; // Summary for 1st innings, e.g., "163/7 (20.0 Overs)"
  "1FallScore"?: string; // Fall of wickets score for 1st innings, e.g., "163"
  "1FallWickets"?: string; // Fall of wickets count for 1st innings, e.g., "7"
  "1FallOvers"?: string; // Fall of wickets overs for 1st innings, e.g., "20.0"
  "1RunRate"?: string; // Run rate for 1st innings, e.g., "8.15"
  "2Summary"?: string; // Summary for 2nd innings, e.g., "169/4 (17.5 Overs)"
  "2FallScore"?: string; // Fall of wickets score for 2nd innings, e.g., "169"
  "2FallWickets"?: string; // Fall of wickets count for 2nd innings, e.g., "4"
  "2FallOvers"?: string; // Fall of wickets overs for 2nd innings, e.g., "17.5"
  "2RunRate"?: string; // Run rate for 2nd innings, e.g., "9.48"
  "3Summary"?: string; // Summary for 3rd innings (unlikely in T20)
  "3FallScore"?: string; // Fall of wickets score for 3rd innings
  "3FallWickets"?: string; // Fall of wickets count for 3rd innings
  "3FallOvers"?: string; // Fall of wickets overs for 3rd innings
  "3RunRate"?: string; // Run rate for 3rd innings
  "4Summary"?: string; // Summary for 4th innings (unlikely in T20)
  "4FallScore"?: string; // Fall of wickets score for 4th innings
  "4FallWickets"?: string; // Fall of wickets count for 4th innings
  "4FallOvers"?: string; // Fall of wickets overs for 4th innings
  "4RunRate"?: string; // Run rate for 4th innings
  "5Summary"?: string; // Summary for 5th innings (highly unlikely)
  "5FallScore"?: string; // Fall of wickets score for 5th innings
  "5FallWickets"?: string; // Fall of wickets count for 5th innings
  "5FallOvers"?: string; // Fall of wickets overs for 5th innings
  "5RunRate"?: string; // Run rate for 5th innings
  "6Summary"?: string; // Summary for 6th innings (extremely unlikely)
  "6FallScore"?: string; // Fall of wickets score for 6th innings
  "6FallWickets"?: string; // Fall of wickets count for 6th innings
  "6FallOvers"?: string; // Fall of wickets overs for 6th innings
  "6RunRate"?: string; // Run rate for 6th innings
  DivisionID?: string; // Division ID, e.g., "6"
  SecondInningsFirstBattingID?: null | string; // ID for 1st batting team in 2nd innings (unlikely to be used)
  SecondInningsFirstBattingName?: string; // Name for 1st batting team in 2nd innings
  SecondInningsSecondBattingID?: null | string; // ID for 2nd batting team in 2nd innings
  SecondInningsSecondBattingName?: string; // Name for 2nd batting team in 2nd innings
  ThirdInningsFirstBattingID?: null | string; // IDs and Names for 3rd and 4th innings - very unlikely in T20
  ThirdInningsFirstBattingName?: string;
  ThirdInningsSecondBattingID?: null | string;
  ThirdInningsSecondBattingName?: string;
  WinningTeamID?: string; // ID of winning team
  MatchOrder?: string; // Match order text, e.g., "Match 24"
  RevisedOver?: string; // Revised overs if match is shortened
  RevisedTarget?: string; // Revised target score if applicable
  PreMatchCommentary?: string; // Pre-match commentary HTML
  MatchRow?: number; // Match row number
  ProjectedScore?: string; // Projected score
  "2ndProjectedScore"?: string; // 2nd projected score
  "3rdProjectedScore"?: string; // 3rd projected score
  MOM?: string; // Man of the match player name
  MOM_TYPE?: string; // Man of the match type, e.g., "Batting"
  MOMPlayerId?: string; // Man of the match player ID
  MOMRuns?: string; // Man of the match runs
  MOMBalls?: string; // Man of the match balls faced
  MOMWicket?: string; // Man of the match wickets taken
  MOMRC?: string; // Man of the match runs conceded (likely for bowlers)
  MOMImage?: string; // Man of the match player image URL
  KO?: string; // Knockout status? (Example shows "")
}


/**
 * Processed Match Schedule Entry used in the application.
 * Extends ScheduleMatchRaw and selects/processes fields as needed.
 */
interface ScheduleMatch extends Pick<ScheduleMatchRaw, 'MatchDateNew' | 'MatchTime' | 'GroundName'> {
  date: string; // MatchDateNew - for consistency and clarity
  teams: [string, string]; // [FirstBattingTeamCode, SecondBattingTeamCode]
  time: string; // MatchTime
  venue: string; // GroundName
  matchStatus: string; // MatchStatus
  matchName: string; // MatchName
  team1Code: string; // FirstBattingTeamCode
  team2Code: string; // SecondBattingTeamCode
}


/**
 * Weekly schedule section (as before, reusing the structure).
 */
interface ScheduleWeek {
  date: string;
  matches: ScheduleMatch[];
}


/**
 * Featured or live match info (as before, potentially extend if needed from ScheduleMatchRaw).
 */
interface MatchInfo extends Pick<ScheduleMatchRaw, 'GroundName' | 'MatchTime' | 'FirstBattingTeamName' | 'SecondBattingTeamName' | 'MatchStatus'> {
  team1: string; // FirstBattingTeamName
  team2: string; // SecondBattingTeamName
  score1?: string; // "1Summary"
  score2?: string; // "2Summary"
  overs1?: string; // "1FallOvers"
  overs2?: string; // "2FallOvers"
  venue: string; // GroundName
  time: string; // MatchTime
  date?: string; // MatchDateNew
  status?: string; // MatchStatus -  "Post" | "In Progress" | "upcoming" | "completed" (and other possible statuses from API)
  team1Code: string; // FirstBattingTeamCode
  team2Code: string; // SecondBattingTeamCode
}


/**
 * API response from /api/ipl-data (as before).
 */
interface ScrapedDataResponse {
  featuredMatch: MatchInfo | null;
  pointsTable: PointsTableEntry[];
  schedule: ScheduleWeek[];
}