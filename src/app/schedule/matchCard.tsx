import Link from 'next/link';
import Image from 'next/image';

export const MatchCard = ({ match, index }: { match: ScheduleMatch, index: number }) => {

  if (!match || typeof match.matchId === 'undefined' || match.matchId === null) {
     console.warn("MatchCard received match without a valid matchId:", match);
     // Render a 
  }

  const matchNumber = match.matchNumber || (index + 1);

  let dayOfWeek = 'N/A';
  let monthOfYear = 'N/A';
  let dayStr = 'N/A';
  let isNightMatch = false;

  // Defensive date parsing
  if (typeof match.date === 'string' && match.date.split(" ").length === 3) {
      const parts = match.date.split(" ");
      dayStr = parts[0];
      const monthStr = parts[1];
      const yearStr = parts[2];
      const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIndex = monthNamesShort.indexOf(monthStr);

      if (monthIndex !== -1 && !isNaN(parseInt(yearStr)) && !isNaN(parseInt(dayStr))) {
         try {
            const date = new Date(parseInt(yearStr), monthIndex, parseInt(dayStr));
            if (!isNaN(date.getTime())) {
                 dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                 monthOfYear = monthStr.toUpperCase();
            }
         } catch (e) {
            console.error("Error parsing date in MatchCard:", match.date, e);
         }
      }
  } else {
      console.warn("Invalid date format received in MatchCard:", match.date);
  }


  if (typeof match.time === 'string' && match.time.includes(":")) {
      const hourPart = match.time.split(":")[0];
      const hour = parseInt(hourPart);
      if (!isNaN(hour)) {
          isNightMatch = hour >= 16;
      }
  }

  // Determine if the link should be active
  const canLink = match.matchId !== undefined && match.matchId !== null && match.matchStatus !== "UpComing";
  // && match.matchStatus !== "Live" 

  const cardContent = (
    <div className="relative flex pb-6 md:pb-8"> 
      <div className="flex flex-col items-center pr-4 md:pr-6 shrink-0"> 
        <div className={`rounded-full h-3 w-3 ${match.matchStatus === "Live" ? "bg-red-500" : "bg-orange-500"}`}></div> {/* Red dot for live */}
        <div className="h-full border-r-2 border-dashed border-gray-300"></div>
      </div>
      <div className="mb-4 md:mb-6 w-full">
        <div className="flex items-center mb-3 flex-wrap gap-2"> 
          {match.matchStatus === "Live" && (
            <div className="mr-2 flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="ml-1 text-xs font-bold text-red-500">LIVE</span>
            </div>
          )}
          <div className="bg-gray-100 px-3 py-1 rounded-md text-xs sm:text-sm font-medium text-gray-700 inline-block">
            MATCH {matchNumber}
          </div>
           {/* Display Match Status if not Live */}
           {match.matchStatus && match.matchStatus !== "Live" && (
               <div className="bg-gray-200 px-2 py-0.5 rounded text-xs font-medium text-gray-600 inline-block">
                   {match.matchStatus}
               </div>
           )}
        </div>
        <div className="md:flex md:items-center md:gap-4">
          <div className="md:w-40 lg:w-48 shrink-0 mb-3 md:mb-0">
            <div className="text-gray-800 font-semibold"> 
              <div>{monthOfYear}, {dayOfWeek} {dayStr}</div>
              <div className="flex items-center text-sm mt-1 text-gray-600">
                <i className={`mr-1 ${isNightMatch ? 'far fa-moon' : 'far fa-sun'}`}></i>{match.time} IST
              </div>
            </div>
          </div>

          <div className="flex grow items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 my-2 md:my-0"> 
            {/* Team 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full mb-1 relative overflow-hidden bg-gray-100 border">
                {match.team1Logo ? (
                  <Image
                    src={match.team1Logo}
                    alt={match.teams[0] || 'Team 1'}
                    layout="fill"
                    objectFit="contain" 
                  />
                ) : (
                  <span className="flex items-center justify-center h-full text-xs font-bold text-gray-500">
                      {match.team1Code || match.teams[0]?.substring(0,3) || 'T1'}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">
                {match.teams[0]?.replace(/ /g, '\n') || 'Team 1'}
              </span>
            </div>

            <div className="text-gray-500 font-bold text-sm md:text-base px-1">V/S</div>

            {/* Team 2 */}
            <div className="flex flex-col items-center text-center">
               <div className="w-10 h-10 md:w-14 md:h-14 rounded-full mb-1 relative overflow-hidden bg-gray-100 border">
                 {match.team2Logo ? (
                    <Image
                        src={match.team2Logo}
                        alt={match.teams[1] || 'Team 2'}
                        layout="fill"
                        objectFit="contain"
                    />
                 ) : (
                   <span className="flex items-center justify-center h-full text-xs font-bold text-gray-500">
                       {match.team2Code || match.teams[1]?.substring(0,3) || 'T2'}
                   </span>
                 )}
               </div>
               <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">
                  {match.teams[1]?.replace(/ /g, '\n') || 'Team 2'}
               </span>
            </div>
          </div>

          <div className="text-gray-600 text-xs sm:text-sm mt-2 md:mt-0 md:ml-auto text-center md:text-right shrink-0"> 
            <div>{match.venue || 'Venue TBC'}</div>
             {/* Add the hint for clicking only if linking is possible */}
             {canLink && (
                <div className="text-blue-600 mt-1 font-medium hidden md:block">View Details →</div>
             )}
          </div>
        </div>
         {/* Click hint for mobile */}
          {canLink && (
             <div className="text-right text-xs text-blue-600 mt-2 pr-2 md:hidden">View Details →</div>
          )}
      </div>
    </div>
  );


  // Conditionally wrap with Link if matchId is valid
  if (canLink) {
      return (
        <Link href={`/match/${match.matchId}`} className="p-4 block hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-lg transition duration-150" title={`View details for match ${matchNumber}`}>
           {cardContent}
        </Link>
      );
  } else {
      return cardContent;
  }

};