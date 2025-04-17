// import Image from "next/image"

export default async function PointsTable() {
  const res = await fetch("http://localhost:3000/api/ipl-data")
  const data: ScrapedDataResponse = await res.json()
  const table: PointsTableEntry[] = data.pointsTable

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">📊 Points Table</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {table.length === 0 ? (
          <div className="p-4">No points table data available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 font-semibold text-left">#</th>
                  <th className="p-3 font-semibold text-left">Team</th>
                  <th className="p-3 font-semibold text-center">P</th>
                  <th className="p-3 font-semibold text-center">W</th>
                  <th className="p-3 font-semibold text-center">L</th>
                  <th className="p-3 font-semibold text-center">T</th> {/* Tied */}
                  <th className="p-3 font-semibold text-center">NR</th>{/* No Result */}
                  <th className="p-3 font-semibold text-center">For</th>{/* Runs Scored For */}
                  <th className="p-3 font-semibold text-center">Against</th>{/* Runs Scored Against */}
                  <th className="p-3 font-semibold text-center">Pts</th>
                  <th className="p-3 font-semibold text-center">NRR</th>
                  <th className="p-3 font-semibold text-center">Form</th>{/* Performance/Form */}
                </tr>
              </thead>
              <tbody>
                {table.map((team, index) => ( // Using index for position as 'OrderNo' might be string
                  <tr key={team.TeamID} className={`border-b ${index <= 3 ? "bg-blue-50" : ""}`}> {/* Highlight top 4 using index */}
                    <td className="p-3 text-center font-medium">{index + 1}</td> {/* Position from index */}
                    <td className="p-3 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                        {/* Team Logo */}
                        <img src={team.TeamLogo} alt={team.TeamName} className="w-6 h-6 rounded-full"/>
                        {/* <Image src={team.TeamLogo} alt={team.TeamName} width={24} height={24} className="rounded-full"/>  */}
                        {/* Team Logo */}
                      </div>
                      {team.TeamName}
                    </td>
                    <td className="p-3 text-center">{team.Matches}</td>     {/* Matches Played */}
                    <td className="p-3 text-center">{team.Wins}</td>        {/* Wins */}
                    <td className="p-3 text-center">{team.Loss}</td>        {/* Losses */}
                    <td className="p-3 text-center">{team.Tied}</td>        {/* Tied Matches */}
                    <td className="p-3 text-center">{team.NoResult}</td>    {/* No Result Matches */}
                    <td className="p-3 text-center">{team.ForTeams?.split('/')[0] || '-'}</td>     {/* Runs Scored For */}
                    <td className="p-3 text-center">{team.AgainstTeam?.split('/')[0] || '-'}</td> {/* Runs Scored Against */}
                    <td className="p-3 text-center font-bold">{team.Points}</td>{/* Points */}
                    <td className="p-3 text-center">{team.NetRunRate}</td>    {/* NRR */}
                    <td className="p-3 text-center flex justify-center space-x-1">{/* Performance/Form - Badges */}
                      {team.Performance?.split(',').map((result, resultIndex) => {
                        let bgColorClass = '';
                        let textColorClass = 'text-white';
                        if (result === 'W') {
                          bgColorClass = 'bg-green-500';
                        } else if (result === 'L') {
                          bgColorClass = 'bg-red-500';
                        } else if (result === 'NR') {
                          bgColorClass = 'bg-gray-400';
                        } else if (result === 'T') {
                          bgColorClass = 'bg-yellow-500';
                          textColorClass = 'text-gray-700';
                        } else {
                          return null; // Skip unknown results
                        }
                        return (
                          <span key={resultIndex} className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColorClass} ${textColorClass} font-bold text-xs`}>
                            {result}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}