import React from 'react';

interface BowlingScorecardProps {
  bowlingCard: BowlingCardEntry[];
}

// Helper to format economy rate
const formatEconomy = (economy: number | string | undefined): string => {
    if (typeof economy === 'number') {
        return economy.toFixed(2);
    }
    if (typeof economy === 'string') {
        const num = parseFloat(economy);
        return isNaN(num) ? '-' : num.toFixed(2);
    }
    return '-';
};

const BowlingScorecard: React.FC<BowlingScorecardProps> = ({ bowlingCard }) => {
  if (!bowlingCard || bowlingCard.length === 0) {
    return <p className="text-sm text-gray-500">Bowling data not available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 font-semibold text-left border-b">Bowler</th>
            <th className="p-2 font-semibold text-center border-b">O</th>
            <th className="p-2 font-semibold text-center border-b">M</th>
            <th className="p-2 font-semibold text-center border-b">R</th>
            <th className="p-2 font-semibold text-center border-b">W</th>
            <th className="p-2 font-semibold text-center border-b">Econ</th>
          </tr>
        </thead>
        <tbody>
          {bowlingCard.map((bowler) => (
            <tr key={bowler.PlayerID} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-medium">{bowler.PlayerName}</td>
              <td className="p-2 text-center">{bowler.Overs}</td>
              <td className="p-2 text-center">{bowler.Maidens}</td>
              <td className="p-2 text-center">{bowler.Runs}</td>
              <td className="p-2 text-center font-bold">{bowler.Wickets}</td>
              <td className="p-2 text-center">{formatEconomy(bowler.Economy)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BowlingScorecard;