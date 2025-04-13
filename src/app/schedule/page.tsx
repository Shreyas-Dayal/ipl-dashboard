// app/schedule/page.tsx
export const revalidate = 3600 // 1 hour

export default async function Schedule() {
  const res = await fetch("http://localhost:3000/api/ipl-data")
  const data: ScrapedDataResponse = await res.json()
  const allScheduleWeeks: ScheduleWeek[] = data.schedule // Renamed to allScheduleWeeks

  // Get current date (without time)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingWeeks: ScheduleWeek[] = [];
  const completedWeeks: ScheduleWeek[] = [];

  allScheduleWeeks.forEach(week => {
    const upcomingMatchesInWeek: ScheduleMatch[] = [];
    const completedMatchesInWeek: ScheduleMatch[] = [];

    week.matches.forEach(match => {
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
    <section className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">📅 Match Schedule</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden p-4">
        {allScheduleWeeks.length === 0 ? ( // Using allScheduleWeeks for initial check
          <p>No schedule data available.</p>
        ) : (
          <div className="space-y-6">
            {upcomingWeeks.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Upcoming Matches</h2>
                <div className="space-y-6">
                  {upcomingWeeks.map((week, i) => (
                    <div key={`upcoming-week-${i}`} className="mb-6">
                      <h3 className="font-medium text-gray-500 mb-3">{week.date}</h3>
                      <div className="space-y-3">
                        {week.matches.map((match, idx) => (
                          <div
                            key={`upcoming-match-${idx}`}
                            className="flex flex-col sm:flex-row sm:items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto justify-between sm:justify-start">
                              <div className="w-20 sm:w-24 text-sm font-medium text-gray-500">{match.date}</div>
                              <div className="flex items-center">
                                <span className="font-medium">{match.teams[0]}</span>
                                <span className="mx-2 text-gray-400">vs</span>
                                <span className="font-medium">{match.teams[1]}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 sm:ml-auto w-full sm:w-auto justify-between sm:justify-start">
                              <span className="mr-4">{match.time}</span>
                              <span>{match.venue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedWeeks.length > 0 && (
              <div className="space-y-4 mt-8"> {/* Added mt-8 to separate sections */}
                <h2 className="text-lg font-semibold text-gray-700">Completed Matches</h2>
                <div className="space-y-6">
                  {completedWeeks.map((week, i) => (
                    <div key={`completed-week-${i}`} className="mb-6">
                      <h3 className="font-medium text-gray-500 mb-3">{week.date}</h3>
                      <div className="space-y-3">
                        {week.matches.map((match, idx) => (
                          <div
                            key={`completed-match-${idx}`}
                            className="flex flex-col sm:flex-row sm:items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto justify-between sm:justify-start">
                              <div className="w-20 sm:w-24 text-sm font-medium text-gray-500">{match.date}</div>
                              <div className="flex items-center">
                                <span className="font-medium">{match.teams[0]}</span>
                                <span className="mx-2 text-gray-400">vs</span>
                                <span className="font-medium">{match.teams[1]}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 sm:ml-auto w-full sm:w-auto justify-between sm:justify-start">
                              <span className="mr-4">{match.time}</span>
                              <span>{match.venue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upcomingWeeks.length === 0 && completedWeeks.length === 0 && ( // Fallback if no matches after filtering
              <p>No matches scheduled or completed after current date.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}