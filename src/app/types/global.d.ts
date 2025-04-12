// types/global.d.ts

// Featured or live match
interface MatchInfo {
  team1: string
  team2: string
  score1?: string
  score2?: string
  overs1?: string
  overs2?: string
  venue: string
  time: string
  date?: string
  status?: "live" | "upcoming" | "completed"
}

// Points Table Row
interface PointsTableEntry {
  pos: number
  team: string
  p: number
  w: number
  l: number
  pts: number
  nrr: string
}

// Match in a weekly grouped schedule
interface ScheduleMatch {
  date: string
  teams: [string, string]
  time: string
  venue: string
}

// Weekly schedule section
interface ScheduleWeek {
  date: string
  matches: ScheduleMatch[]
}

// API response from /api/scrape
interface ScrapedDataResponse {
  featuredMatch: MatchInfo | null; // Made featuredMatch optional (nullable)
  pointsTable: PointsTableEntry[];
  schedule: ScheduleWeek[];
}