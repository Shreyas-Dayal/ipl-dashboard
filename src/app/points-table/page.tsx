"use client";

import { useIplStore } from '@/store/iplStore';
import Image from 'next/image';

const PointsTable = () => {
  // Get data, loading, and error state from the Zustand
  const scrapedData = useIplStore((state) => state.data);
  const loading = useIplStore((state) => state.loading);
  const error = useIplStore((state) => state.error);

  const pointsTableData = scrapedData?.pointsTable || [];

  if (loading) {
    return <p>Loading points table data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">📊 Points Table</h1>
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        {pointsTableData.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No points table data available at the moment.</div>
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
                  <th className="p-3 font-semibold text-center">T</th> 
                  <th className="p-3 font-semibold text-center">NR</th>
                  <th className="p-3 font-semibold text-center hidden sm:table-cell">For</th>
                  <th className="p-3 font-semibold text-center hidden sm:table-cell">Against</th>
                  <th className="p-3 font-semibold text-center">Pts</th>
                  <th className="p-3 font-semibold text-center">NRR</th>
                  <th className="p-3 font-semibold text-center">Form</th>
                </tr>
              </thead>
              <tbody>
                {pointsTableData.map((team, index) => (
                  <tr key={team.TeamID} className={`border-b border-gray-200 ${index <= 3 ? "bg-blue-50" : ""}`}>
                    <td className="p-3 text-center font-medium">{team.OrderNo || index + 1}</td> {/* Use OrderNo from data if available */}
                    <td className="p-3 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 relative overflow-hidden">
                        {team.TeamLogo && (
                          <Image
                            src={team.TeamLogo}
                            alt={`${team.TeamName} logo`}
                            fill
                            sizes="(max-width: 768px) 24px, 24px"
                            className="object-contain"
                            priority={index < 4}
                          />
                        )}
                      </div>
                      <span className="font-medium">{team.TeamName}</span>
                    </td>
                    <td className="p-3 text-center">{team.Matches}</td>
                    <td className="p-3 text-center">{team.Wins}</td>
                    <td className="p-3 text-center">{team.Loss}</td>
                    <td className="p-3 text-center">{team.Tied}</td>
                    <td className="p-3 text-center">{team.NoResult}</td>
                    <td className="p-3 text-center hidden sm:table-cell">{team.ForTeams?.split('/')[0] || '-'}</td>
                    <td className="p-3 text-center hidden sm:table-cell">{team.AgainstTeam?.split('/')[0] || '-'}</td>
                    <td className="p-3 text-center font-bold">{team.Points}</td>
                    <td className="p-3 text-center">{team.NetRunRate}</td>
                    <td className="p-3">
                      <div className="flex justify-center space-x-1 flex-wrap gap-y-1"> 
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
                            textColorClass = 'text-gray-800'; 
                          } else {
                            return null; 
                          }
                          return (
                            <span
                              key={`${team.TeamID}-form-${resultIndex}`} 
                              title={`Match ${resultIndex + 1}: ${result}`} 
                              className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColorClass} ${textColorClass} font-bold text-xs`}
                            >
                              {result.substring(0, 1)} 
                            </span>
                          );
                        })}
                      </div>
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