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
interface PointsTableEntry extends Omit<PointsTableEntryRaw, 'Matches' | 'Wins' | 'Loss' | 'Tied' | 'NoResult' | 'Points' | 'Draw' | 'OrderNo'>{
    StandingFlag: string;
    Category: null;
    CompetitionID: string;
    TeamID: string;
    TeamCode: string;
    TeamName: string;
    TeamLogo: string;
    Matches: string;
    Wins: string;
    Loss: string;
    Tied: string;
    NoResult: string;
    Points: string;
    Draw: string;
    ForTeams: string;
    AgainstTeam: string;
    NetRunRate: string;
    Quotient: string;
    OrderNo: string;
    IsQualified: null;
    LeadBy: string;
    Deficit: string;
    Performance: string; // Performance string like "W,W,W,W,L"
    Status: string;
    MATCH_ID: string;
    PrevPosition: string;
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
    CompetitionID: number;
    MatchID: number;
    MatchTypeID: number;
    MatchType: string;
    MatchStatus: 'Post' | 'In Progress' | 'Scheduled' | string; // Add possible MatchStatus values
    MatchDate: string;
    MatchDateNew: string;
    MatchName: string;
    MatchTime: string;
    GMTMatchTime: string;
    GMTMatchDate: string;
    GMTMatchEndTime: string;
    GMTMatchEndDate: string;
    FirstBattingTeamID: number;
    FirstBattingTeamName: string;
    SecondBattingTeamID: number;
    SecondBattingTeamName: string;
    FirstBattingTeamCode: string;
    SecondBattingTeamCode: string;
    GroundID: number;
    GroundName: string;
    Commentss: string;
    TossTeam: string;
    TossDetails: string;
    TossText: string;
    Flag: number;
    FirstBattingSummary: string;
    SecondBattingSummary: string;
    ClientMatchID: string;
    MATCH_COMMENCE_START_DATE: string;
    city: string;
    FlickrAlbumID: string;
    LiveStream: string;
    FBURL: string;
    T20ProMatchID: string;
    Temperature: string;
    WeatherIcon: string;
    TempUpdatedDate: string;
    GroundUmpire1ID: number;
    GroundUmpire2ID: number;
    GroundUmpire3ID: number;
    RefereeID: number;
    HomeTeamID: string;
    HomeTeamName: string;
    HomeTeamColor1: string;
    HomeTeamColor2: string;
    AwayTeamColor1: string;
    AwayTeamColor2: string;
    AwayTeamID: string;
    AwayTeamName: string;
    timezone1: string;
    MatchEndDate: string;
    MatchEndTime: string;
    MATCH_NO_OF_OVERS: string;
    ROUND_ID: string;
    MatchTypeName: string;
    RowNo: number;
    TeamType: null;
    CompetitionName: string;
    GroundUmpire1: string;
    GroundUmpire2: string;
    ThirdUmpire: string;
    Comments: string;
    HomeTeamLogo: string;
    AwayTeamLogo: string;
    MatchHomeTeamLogo: string;
    MatchAwayTeamLogo: string;
    VideoScorecard: number;
    TimeZone: string;
    CurrentStrikerID: string;
    CurrentStrikerName: string;
    StrikerRuns: number;
    StrikerBalls: number;
    StrikerFours: number;
    StrikerSixes: number;
    StrikerSR: number;
    StrikerImage: string;
    CurrentNonStrikerID: string;
    CurrentNonStrikerName: string;
    NonStrikerRuns: number;
    NonStrikerBalls: number;
    NonStrikerFours: number;
    NonStrikerSixes: number;
    NonStrikerSR: number;
    NonStrikerImage: string;
    CurrentBowlerID: string;
    CurrentBowlerName: string;
    BowlerOvers: string;
    BowlerRuns: number;
    BowlerMaidens: number;
    BowlerWickets: number;
    BowlerEconomy: number;
    BowlerSR: number;
    BowlerImage: string;
    ChasingText: string;
    MatchBreakComments: string;
    MatchProgress: string;
    CurrentInnings: string;
    "1Summary": string;
    "1FallScore": string;
    "1FallWickets": string;
    "1FallOvers": string;
    "1RunRate": string;
    "2Summary": string;
    "2FallScore": string;
    "2FallWickets": string;
    "2FallOvers": string;
    "2RunRate": string;
    "3Summary": string;
    "3FallScore": string;
    "3FallWickets": string;
    "3FallOvers": string;
    "3RunRate": string;
    "4Summary": string;
    "4FallScore": string;
    "4FallWickets": string;
    "4FallOvers": string;
    "4RunRate": string;
    "5Summary": string;
    "5FallScore": string;
    "5FallWickets": string;
    "5FallOvers": string;
    "5RunRate": string;
    "6Summary": string;
    "6FallScore": string;
    "6FallWickets": string;
    "6FallOvers": string;
    "6RunRate": string;
    DivisionID: string;
    SecondInningsFirstBattingID: null;
    SecondInningsFirstBattingName: string;
    SecondInningsSecondBattingID: null;
    SecondInningsSecondBattingName: string;
    ThirdInningsFirstBattingID: null;
    ThirdInningsFirstBattingName: string;
    ThirdInningsSecondBattingID: null;
    ThirdInningsSecondBattingName: string;
    WinningTeamID: string;
    MatchOrder: string;
    RevisedOver: string;
    RevisedTarget: string;
    PreMatchCommentary: string;
    PostMatchCommentary: string;
    MatchRow: number;
    ProjectedScore: string;
    "2ndProjectedScore": string;
    "3rdProjectedScore": string;
    MOM: string;
    MOM_TYPE: string;
    MOMPlayerId: string;
    MOMRuns: string;
    MOMBalls: string;
    MOMWicket: string;
    MOMRC: string;
    MOMImage: string;
    KO: string;
    venue:string;
    time:string;
    status:string;
    team1Code:string;
    team2Code:string;
}

interface MatchNote {
    Notes: string;
    MatchID: string;
    InningsNo: string;
    TeamID: string;
    TeamCode: string;
    Description: string;
    OverNo: string;
    BallNo: string;
}


/**
 * Processed Match Schedule Entry used in the application.
 * Extends ScheduleMatchRaw and selects/processes fields as needed.
 */
interface ScheduleMatch extends Pick<ScheduleMatchRaw, 'MatchDateNew' | 'MatchTime' | 'GroundName'> {
  date: string;
  teams: [string, string];
  time: string;
  venue: string;
  matchStatus: string;
  matchName: string;
  team1Code: string;
  team2Code: string;
  team1Logo: string;
  team2Logo: string;
  matchId: number | string; 
  matchNumber?: number;
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
  featuredMatch: ScheduleMatchRaw | null;
  pointsTable: PointsTableEntry[];
  schedule: ScheduleWeek[];
  matchNotes:MatchNote[]
}



// src/app/types/match-details.d.ts (or global.d.ts)

interface BattingCardEntry {
  MatchID: number;
  InningsNo: number;
  TeamID: number;
  PlayerID: string;
  PlayerName: string;
  PlayerImage?: string; // Optional
  PlayingOrder?: number; // Optional
  BowlerName?: string; // If out
  OutDesc?: string; // Description of dismissal
  ShortOutDesc?: string; // Short description
  Runs: number;
  Balls: number;
  DotBalls?: number;
  Ones?: number;
  Twos?: number;
  Threes?: number;
  Fours: number;
  Sixes: number;
  StrikeRate: string; // Often provided as string
  WicketNo?: string; // Optional
  // ... other fields if needed
}

interface BowlingCardEntry {
  MatchID: number;
  InningsNo: number;
  TeamID: number;
  PlayerID: string;
  PlayerName: string;
  PlayerShortName?: string;
  PlayerImage?: string;
  Overs: number; // Can be decimal like 3.5
  Maidens: number;
  Runs: number;
  Wickets: number;
  Wides?: number;
  NoBalls?: number;
  Economy: number | string; // API might return string or number
  BowlingOrder?: number;
  // ... other fields if needed
}

interface ExtrasInfo {
  MatchID: string; // API shows string here
  InningsNo: number;
  TeamID: string; // API shows string here
  Total: string; // e.g., "162/5 (20.0 Overs)"
  TotalExtras: string; // As string
  Byes?: string;
  LegByes?: string;
  NoBalls?: string;
  Wides?: string;
  Penalty?: string;
  CurrentRunRate?: string; // May not be relevant post-match
  BattingTeamName: string;
  BowlingTeamName: string;
  // ... other fields if needed
}

interface FallOfWicketEntry {
  MatchID: string; // API shows string here
  InningsNo: number;
  TeamID: string; // API shows string here
  PlayerID: string;
  PlayerName: string;
  Score: string; // e.g., "59/1(7.3)"
  FallScore: string; // As string
  FallWickets: number;
  FallOvers: string; // As string
}

// Structure for the data within the "Innings1" or "Innings2" key
interface InningsData {
  BattingCard: BattingCardEntry[];
  Extras: ExtrasInfo[]; // It's an array in the example, usually just one entry
  FallOfWickets: FallOfWicketEntry[];
  BowlingCard: BowlingCardEntry[];
  // Add other keys like ManhattanGraph, OverHistory etc. if you plan to use them
}

// Structure of the parsed JSON response
interface MatchInningsApiResponse {
  Innings1?: InningsData;
  Innings2?: InningsData;
}

// Structure combining both innings for the page component
interface MatchDetailData {
    matchId: string;
    innings1: InningsData | null;
    innings2: InningsData | null;
    matchSummary?: ScheduleMatchRaw | null; // Optional: Add overall summary later
}