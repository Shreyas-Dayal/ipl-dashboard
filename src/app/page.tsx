import Link from "next/link"

// app/page.tsx
export const dynamic = "force-dynamic" // Server-side rendering

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/ipl-data", { cache: "no-store" })
  console.log("Fetching data from API...")
  console.log(res)

  const data: ScrapedDataResponse = await res.json()
  console.log('ScrapedDataResponse', data)
  const match = data.featuredMatch as any; // Type as any to access all params
  const scheduleWeeks = data.schedule
  const pointsTableData = data.pointsTable; // Get points table data

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
  const displayedPointsTable = pointsTableData.slice(0, 5); // Limit to top 5 teams


  return (
    <section className="space-y-8">
      {/* Featured Match Card */}
      <section>
        <h2 className="text-xl font-bold mb-4">Featured Match</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden border">
          {match.MatchStatus === 'Post' && ( // Use MatchStatus from full object
            <div className="bg-green-500 p-2 text-white text-sm font-medium flex items-center justify-start">
              <div className="flex-1">Completed</div>
              <span>{match.MatchTime} IST</span>
            </div>
          )}
          {match.MatchStatus !== 'Post' && match.MatchStatus === 'In Progress' && ( // Use MatchStatus from full object
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 text-white text-sm font-medium flex items-center justify-start">
              <div className="flex-1">LIVE</div>
              <span>{match.MatchTime} IST</span>
            </div>
          )}
          {match.MatchStatus !== 'Post' && match.MatchStatus !== 'In Progress' && ( // Use MatchStatus from full object
              <div className="bg-gray-200 p-2 text-gray-700 text-sm font-medium flex items-center justify-start">
                <div className="flex-1">{match.MatchStatus?.toUpperCase() || 'UPCOMING'}</div>
                <span>{match.MatchTime} IST</span>
              </div>
          )}
          <div className="p-4 md:p-6">
            <h3 className="text-lg font-semibold text-center mb-4">{match.MatchName}</h3> {/* Match Name */}
            <p className="text-center text-sm text-gray-500 mb-2">{match.MatchType}</p> {/* Match Type */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-1 flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mb-2">
                  {match.MatchHomeTeamLogo ? ( // Use team logos if available
                    <img src={match.MatchHomeTeamLogo} alt={match.FirstBattingTeamName} className="w-full h-full rounded-full object-contain" />
                  ) : (
                    <span className="text-gray-500 text-xl font-bold">{match.FirstBattingTeamCode.substring(0,3).toUpperCase()}</span>
                  )}
                </div>
                <h3 className="font-bold">{match.FirstBattingTeamName}</h3>
                <p className="text-2xl font-bold mt-2">{match["1Summary"] || "-"}</p>
                <p className="text-sm text-gray-500">({match["1FallOvers"] || "-"} overs)</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm font-medium text-gray-500 mb-2">Match Details</div>
                <div className="text-xl font-bold">VS</div>
                <div className="flex items-center mt-4 text-sm text-gray-600">
                  <span>{match.GroundName}</span> {/* Use GroundName from full object */}
                </div>
                <div className="text-sm text-gray-600">{match.MatchDateNew}, {match.MatchTime} IST</div> {/* Use MatchDateNew and MatchTime */}
              </div>

              <div className="flex flex-1 flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mb-2">
                  {match.MatchAwayTeamLogo ? ( // Use team logos if available
                    <img src={match.MatchAwayTeamLogo} alt={match.SecondBattingTeamName} className="w-full h-full rounded-full object-contain" />
                  ) : (
                    <span className="text-gray-500 text-xl font-bold">{match.SecondBattingTeamCode.substring(0,3).toUpperCase()}</span>
                  )}
                </div>
                <h3 className="font-bold">{match.SecondBattingTeamName}</h3>
                <p className="text-2xl font-bold mt-2">{match["2Summary"] || "-"}</p>
                <p className="text-sm text-gray-500">({match["2FallOvers"] || "-"} overs)</p>
              </div>
            </div>
            {match.MatchStatus === 'Post' && ( // Use MatchStatus from full object
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-green-600">
                  {match.Commentss} {/* Use Commentss for match result */}
                  {match.MOM ? <>, Player of the Match: {match.MOM}</> : null} {/* Show MOM if available */}
                </p>
                {match.PostMatchCommentary && ( // Show Post Match Commentary if available
                  <div className="mt-2 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: match.PostMatchCommentary.substring(0, 200) + '...' }} />
                )}
              </div>
            )}
            {match.MatchStatus !== 'Post' && match.MatchStatus !== 'In Progress' && ( // Use MatchStatus from full object
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-gray-600">Match {match.MatchStatus || 'scheduled'}</p>
                {match.PreMatchCommentary && ( // Show Pre Match Commentary if available
                  <div className="mt-2 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: match.PreMatchCommentary.substring(0, 200) + '...' }} />
                )}
              </div>
            )}
             {match.MatchStatus === 'In Progress' && match.MatchBreakComments && ( // Show Match Break Commentary if available during live match
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-blue-700">{match.MatchBreakComments}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Matches Carousel Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upcoming Matches</h2>
          <Link href="/schedule" className="text-blue-600 hover:underline text-sm font-medium">View Full Schedule</Link>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4">
          {displayedUpcomingMatches.map((match, index) => (
            <div key={index} className="min-w-[280px] flex-shrink-0 bg-white rounded-lg shadow border">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{match.time} IST</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-bold">{match.teams[0].substring(0,3).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-medium mt-1">{match.teams[0]}</span>
                  </div>
                  <div className="text-lg font-bold">VS</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-bold">{match.teams[1].substring(0,3).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-medium mt-1">{match.teams[1]}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                  <span>{match.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Points Table Section on Home Page */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Points Table <span className="text-gray-500 text-sm">(Top 5)</span></h2>
          <Link href="/points-table" className="text-blue-600 hover:underline text-sm font-medium">View Full Table</Link>
        </div>
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 font-semibold text-left border-b border-gray-200">#</th>
                  <th className="p-2 font-semibold text-left border-b border-gray-200">Team</th>
                  <th className="p-2 font-semibold text-center border-b border-gray-200">P</th>
                  <th className="p-2 font-semibold text-center border-b border-gray-200">W</th>
                  <th className="p-2 font-semibold text-center border-b border-gray-200">L</th>
                  <th className="p-2 font-semibold text-center border-b border-gray-200">Pts</th>
                  <th className="p-2 font-semibold text-center border-b border-gray-200">NRR</th>
                </tr>
              </thead>
              <tbody>
                {displayedPointsTable.map((team, index) => (
                  <tr key={team.TeamID} className={`${index <= 3 ? "bg-blue-50" : ""} border-b border-gray-200`}>
                    <td className="p-2 text-center font-medium">{index + 1}</td>
                    <td className="p-2 flex items-center">
                      <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 overflow-hidden flex items-center justify-center">
                        <img src={team.TeamLogo} alt={team.TeamName} className="w-5 h-5 rounded-full"/>
                      </div>
                      {team.TeamName}
                    </td>
                    <td className="p-2 text-center">{team.Matches}</td>
                    <td className="p-2 text-center">{team.Wins}</td>
                    <td className="p-2 text-center">{team.Loss}</td>
                    <td className="p-2 text-center font-bold">{team.Points}</td>
                    <td className="p-2 text-center">{team.NetRunRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  )
}