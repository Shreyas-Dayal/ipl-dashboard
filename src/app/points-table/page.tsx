// app/points-table/page.tsx
export const revalidate = 300 // ISR: Revalidate every 5 minutes


export default async function PointsTable() {
    const res = await fetch("http://localhost:3000/api/scrape")
    const data: ScrapedDataResponse = await res.json()
    const table: PointsTableEntry[] = data.pointsTable

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">📊 Points Table</h1>
            <table className="w-full border bg-white">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">#</th>
                        <th className="p-2">Team</th>
                        <th className="p-2 text-center">P</th>
                        <th className="p-2 text-center">W</th>
                        <th className="p-2 text-center">L</th>
                        <th className="p-2 text-center">Pts</th>
                        <th className="p-2 text-center">NRR</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((team) => (
                        <tr key={team.pos} className={team.pos <= 4 ? "bg-blue-50" : ""}>
                            <td className="p-2 text-center">{team.pos}</td>
                            <td className="p-2">{team.team}</td>
                            <td className="p-2 text-center">{team.p}</td>
                            <td className="p-2 text-center">{team.w}</td>
                            <td className="p-2 text-center">{team.l}</td>
                            <td className="p-2 text-center font-bold">{team.pts}</td>
                            <td className="p-2 text-center">{team.nrr}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}