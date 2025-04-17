import { MatchCard } from "./matchCard";

export default async function Schedule() {
  const res = await fetch("http://localhost:3000/api/ipl-data")
  const data: ScrapedDataResponse = await res.json()
  const allScheduleWeeks: ScheduleWeek[] = data.schedule;

  console.log("Fetched schedule data:", allScheduleWeeks)
  // Get current date (without time)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingWeeks: ScheduleWeek[] = [];
  const completedWeeks: ScheduleWeek[] = [];

  allScheduleWeeks.forEach(week => {
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
    <section className="container mx-auto py-12 px-6 md:px-8 lg:px-12 space-y-10"> {/* Increased py and px for container, larger space-y */}
      <header className="text-center mb-8 md:mb-12"> {/* Increased mb for header, responsive */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">IPL Match Schedule</h1> {/* Larger title for desktop, more mb */}
        <p className="text-gray-600 text-lg md:text-xl">Get ready for the excitement! Here&apos;s the schedule for upcoming and completed matches.</p> {/* Larger subtitle for desktop */}
      </header>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {allScheduleWeeks.length === 0 ? (
          <div className="p-10 text-center"> {/* Increased padding for no data message */}
            <p className="text-gray-500 text-lg">No schedule data available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {upcomingWeeks.length > 0 && (
              <div className="py-8 px-6 md:px-8"> {/* Increased py and px for section, responsive */}
                <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-6"><i className="far fa-calendar-alt mr-2"></i> Upcoming Matches</h2> {/* Larger heading, more mb */}
                <div className="space-y-8"> {/* Increased space-y for weeks */}
                  {upcomingWeeks.map((week, weekIndex) => (
                    <div key={`upcoming-week-${weekIndex}`} className="mb-6"> {/* Increased mb for week block */}
                      <h3 className="font-medium text-gray-700 mb-3 px-3 py-1.5 bg-gray-100 rounded-md inline-block text-base md:text-lg"><i className="far fa-calendar-week mr-2"></i> {week.date}</h3> {/* Larger week date, more padding */}
                      <div className="space-y-8 mt-6"> {/* Increased space-y for matches, more mt */}
                        {week.matches.map((match, matchIndex) => (
                          <MatchCard key={`upcoming-match-${matchIndex}`} match={match} index={matchIndex} /> // Pass index here
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {completedWeeks.length > 0 && (
              <div className="py-8 px-6 md:px-8"> {/* Increased py and px for section, responsive */}
                <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-6"><i className="fas fa-history mr-2"></i> Completed Matches</h2> {/* Larger heading, more mb */}
                <div className="space-y-8"> {/* Increased space-y for weeks */}
                  {completedWeeks.map((week, weekIndex) => (
                    <div key={`completed-week-${weekIndex}`} className="mb-6"> {/* Increased mb for week block */}
                      <h3 className="font-medium text-gray-700 mb-3 px-3 py-1.5 bg-gray-100 rounded-md inline-block text-base md:text-lg"><i className="far fa-calendar-week mr-2"></i> {week.date}</h3> {/* Larger week date, more padding */}
                      <div className="space-y-8 mt-6"> {/* Increased space-y for matches, more mt */}
                        {week.matches.map((match, matchIndex) => (
                          <MatchCard key={`completed-match-${matchIndex}`} match={match} index={matchIndex} /> // Pass index here
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upcomingWeeks.length === 0 && completedWeeks.length === 0 && allScheduleWeeks.length > 0 && ( // Fallback if no matches after filtering but data is present
              <div className="py-10 px-6 text-center"> {/* Increased py and px for no matches message */}
                <p className="text-gray-500 text-lg">No matches scheduled or completed after the current date.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="text-center text-gray-500 text-sm mt-10"> {/* Increased mt for footer */}
        <p>© {new Date().getFullYear()} IPL Schedule. Data fetched and presented for informational purposes.</p>
      </footer>
    </section>
  )
}
