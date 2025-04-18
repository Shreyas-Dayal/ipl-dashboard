// src/app/components/BattingScorecard.tsx
import React from 'react';

interface BattingScorecardProps {
  battingCard: BattingCardEntry[];
}

const BattingScorecard: React.FC<BattingScorecardProps> = ({ battingCard }) => {
  if (!battingCard || battingCard.length === 0) {
    return <p className="text-sm text-gray-500">Batting data not available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 font-semibold text-left border-b">Batter</th>
            <th className="p-2 font-semibold text-left border-b">Dismissal</th>
            <th className="p-2 font-semibold text-center border-b">R</th>
            <th className="p-2 font-semibold text-center border-b">B</th>
            <th className="p-2 font-semibold text-center border-b">4s</th>
            <th className="p-2 font-semibold text-center border-b">6s</th>
            <th className="p-2 font-semibold text-center border-b">SR</th>
          </tr>
        </thead>
        <tbody>
          {battingCard.map((batter) => (
            <tr key={batter.PlayerID} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-medium">{batter.PlayerName}</td>
              <td className="p-2 text-xs text-gray-600">{batter.OutDesc || 'not out'}</td>
              <td className="p-2 text-center font-bold">{batter.Runs}</td>
              <td className="p-2 text-center">{batter.Balls}</td>
              <td className="p-2 text-center">{batter.Fours}</td>
              <td className="p-2 text-center">{batter.Sixes}</td>
              <td className="p-2 text-center">{batter.StrikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BattingScorecard;