export const MatchCard = ({ match, index }: { match: ScheduleMatch, index: number }) => {
  const matchNumber = index + 1; // Calculate match number based on index (can be adjusted if data provides it)
  const [dayStr, monthStr, yearStr] = match.date.split(" ");
  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNamesShort.indexOf(monthStr);
  const date = new Date(parseInt(yearStr), monthIndex, parseInt(dayStr));
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const monthOfYear = monthStr.toUpperCase();

  const isNightMatch = match.time.includes(":") && parseInt(match.time.split(":")[0]) >= 16; // Simple heuristic for night match

  return (
    <div className="relative flex pb-6 md:pb-8"> {/* Increased vertical space, responsive */}
      <div className="flex flex-col items-center pr-4 md:pr-6"> {/* Increased horizontal space, responsive */}
        <div className="rounded-full bg-orange-500 h-3 w-3"></div> {/* Slightly larger orange dot */}
        <div className="h-full border-r-2 border-dashed border-gray-300"></div>
      </div>
      <div className="mb-4 md:mb-6 w-full"> {/* Increased vertical space, responsive, full width for content */}
        <div className="flex items-center mb-3"> {/* Flex container for pulse effect and match number */}
          {match.matchStatus === "Live" && (
            <div className="mr-2 flex items-center">
              <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="ml-1 text-xs font-bold text-red-500">LIVE</span>
            </div>
          )}
          <div className="bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700 inline-block">
            MATCH {match.matchNumber || matchNumber}
          </div>
        </div>
        <div className="md:flex md:items-center"> {/* Flex container for horizontal layout on md screens */}
          <div className="md:w-48 lg:w-56 shrink-0"> {/* Fixed width for date/time section, prevent shrinking */}
            <div className="text-gray-800 font-semibold mb-2 md:mb-0"> {/* Date/Time */}
              <div>{monthOfYear}, {dayOfWeek} {dayStr}</div>
              <div className="flex items-center text-sm mt-1">
                <i className={`mr-1 ${isNightMatch ? 'far fa-moon' : 'far fa-sun'}`}></i>{match.time} IST
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 md:space-x-6 md:mx-4 lg:mx-8"> {/* Teams - centered, reduced horizontal space, added horizontal margin */}
            <div className="flex flex-col items-center">
              {match.team1Logo && <img src={match.team1Logo} alt={match.teams[0]} className="w-10 h-10 md:w-20 md:h-20 rounded-full mb-1" />} {/* Slightly smaller logos, reduced mb */}
              <span className="text-sm font-medium text-gray-700 text-center whitespace-normal break-words">{match.teams[0].replace(/ /g, '\n')}</span>
            </div>
            <div className="content-center mx-1 md:mx-2 text-gray-500 font-bold text-sm md:text-base">V/S</div> {/* Reduced vs spacing and font size */}
            <div className="flex flex-col items-center ml-4">
              {match.team2Logo && <img src={match.team2Logo} alt={match.teams[1]} className="w-10 h-10 md:w-20 md:h-20 rounded-full mb-1" />} {/* Slightly smaller logos, reduced mb */}
              <span className="text-sm font-medium text-gray-700 text-center whitespace-normal break-words">{match.teams[1].replace(/ /g, '\n')}</span>
            </div>
          </div>

          <div className="text-gray-600 ml-auto text-right md:text-left"> {/* Venue - right aligned on mobile, left on desktop, ml-auto pushes to right */}
            <div>{match.venue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};