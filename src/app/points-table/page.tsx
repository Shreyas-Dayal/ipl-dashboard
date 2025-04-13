// import Image from "next/image"

// app/points-table/page.tsx
export const revalidate = 300 // 5 minutes

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
                  <th className="p-3 font-semibold text-center">Pts</th>
                  <th className="p-3 font-semibold text-center">NRR</th>
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
                    <td className="p-3 text-center">{team.Matches}</td> {/* Matches Played */}
                    <td className="p-3 text-center">{team.Wins}</td>       {/* Wins */}
                    <td className="p-3 text-center">{team.Loss}</td>       {/* Losses */}
                    <td className="p-3 text-center font-bold">{team.Points}</td>   {/* Points */}
                    <td className="p-3 text-center">{team.NetRunRate}</td>   {/* NRR */}
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