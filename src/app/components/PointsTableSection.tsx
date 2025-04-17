// components/PointsTableSection.tsx
import React from 'react';
import Link from 'next/link';

interface PointsTableSectionProps {
    pointsTableData: PointsTableEntry[]; // Use PointsTableEntry type for pointsTableData prop
}

const PointsTableSection: React.FC<PointsTableSectionProps> = ({ pointsTableData }) => {
    const displayedPointsTable = pointsTableData.slice(0, 5); // Limit to top 5 teams

    return (
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
                                            <img src={team.TeamLogo} alt={team.TeamName} className="w-5 h-5 rounded-full" />
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
    );
};

export default PointsTableSection;