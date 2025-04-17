// app/points-table/page.tsx
"use client"; 

import { useEffect, useState } from "react";

interface PointsTableEntry {
  TeamID: string;
  TeamLogo: string;
  TeamName: string;
  Matches: number;
  Wins: number;
  Loss: number;
  Tied: number;
  NoResult: number;
  Points: number;
  NetRunRate: string;
  Performance: string;
  ForTeams: string;
  AgainstTeam: string;
}

const PointsTable = () => {
  const [pointsTableData, setPointsTableData] = useState<PointsTableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ipl-data");
        const data = await res.json();
        setPointsTableData(data.pointsTable || []); // Set the data
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        setError("Failed to fetch data: " + (error instanceof Error ? error.message : String(error)));
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  if (loading) {
    return <p>Loading points table data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">📊 Points Table</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {pointsTableData.length === 0 ? (
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
                {pointsTableData.map((team, index) => (
                  <tr key={team.TeamID} className={`border-b ${index <= 3 ? "bg-blue-50" : ""}`}>
                    <td className="p-3 text-center font-medium">{index + 1}</td>
                    <td className="p-3 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                        <img src={team.TeamLogo} alt={team.TeamName} className="w-6 h-6 rounded-full" />
                      </div>
                      {team.TeamName}
                    </td>
                    <td className="p-3 text-center">{team.Matches}</td>
                    <td className="p-3 text-center">{team.Wins}</td>
                    <td className="p-3 text-center">{team.Loss}</td>
                    <td className="p-3 text-center">{team.Tied}</td>
                    <td className="p-3 text-center">{team.NoResult}</td>
                    <td className="p-3 text-center">{team.ForTeams?.split('/')[0] || '-'}</td>
                    <td className="p-3 text-center">{team.AgainstTeam?.split('/')[0] || '-'}</td>
                    <td className="p-3 text-center font-bold">{team.Points}</td>
                    <td className="p-3 text-center">{team.NetRunRate}</td>
                    <td className="p-3 text-center flex justify-center space-x-1">
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
                          return null;
                        }
                        return (
                          <span
                            key={resultIndex}
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColorClass} ${textColorClass} font-bold text-xs`}
                          >
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
  );
};

export default PointsTable;
