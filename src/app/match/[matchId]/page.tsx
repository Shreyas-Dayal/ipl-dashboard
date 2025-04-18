// src/app/match/[matchId]/page.tsx
import { getMatchDetails } from '@/lib/fetchMatchDetails'; // Adjust path
import BattingScorecard from '@/app/components/BattingScorecard'; // Adjust path
import BowlingScorecard from '@/app/components/BowlingScorecard'; // Adjust path
import Link from 'next/link';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner'; // Adjust path
// Import types directly

// Define the Page Props interface, including searchParams
interface MatchDetailPageProps {
  params: {
    matchId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined }; // Optional searchParams
}

// Helper component for Fall of Wickets (keep as is)
const FallOfWicketsDisplay: React.FC<{ fow: FallOfWicketEntry[] }> = ({ fow }) => {
  if (!fow || fow.length === 0) return null;
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-1 text-gray-700">Fall of Wickets</h4>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {fow.sort((a, b) => a.FallWickets - b.FallWickets).map(wicket => (
          <span key={wicket.PlayerID + wicket.FallWickets}>
            <span className="font-medium">{wicket.Score}</span> ({wicket.PlayerName}, {wicket.FallOvers} ov)
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper component for Extras (keep as is)
const ExtrasDisplay: React.FC<{ extras: ExtrasInfo | undefined }> = ({ extras }) => {
  if (!extras) return null;
  const details = [
    extras.Byes && `B: ${extras.Byes}`,
    extras.LegByes && `LB: ${extras.LegByes}`,
    extras.Wides && `WD: ${extras.Wides}`,
    extras.NoBalls && `NB: ${extras.NoBalls}`,
    extras.Penalty && `PEN: ${extras.Penalty}`,
  ].filter(Boolean).join(', ');

  return (
    <div className="mt-2 text-xs text-gray-600">
      <span className="font-semibold">Extras:</span> {extras.TotalExtras} ({details})
    </div>
  );
}

// --- Content Component to wrap async logic for Suspense ---
async function MatchContent({ matchId }: { matchId: string }) {
  const matchData = await getMatchDetails(matchId);

  console.log(`Match Data for Match ID ${matchId}:`, matchData); // Debugging log

  if (!matchData || (!matchData.innings1 && !matchData.innings2)) {
    console.error(`No innings data found for matchId: ${matchId}`);
    // Render fallback within Suspense boundary instead of calling notFound here
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load match data or no innings found for Match ID: {matchId}.
      </div>
    );
  }

  const { innings1, innings2 } = matchData;
  const innings1Extras = innings1?.Extras?.[0];
  const innings2Extras = innings2?.Extras?.[0];

  return (
    <>
      {/* Header moved outside Suspense or fetched separately */}
      <header className="text-center border-b pb-4 mb-6 relative">
        <div className="absolute left-0 top-0 pt-1">
          <Link href="/schedule" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Schedule
          </Link>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 pt-2">
          {/* Use data fetched *before* suspense boundary if possible, or show generic title */}
           Match Details
           {/* Example if team names were available:
             (innings1Extras?.BattingTeamName || 'Team A') + ' vs ' + (innings1Extras?.BowlingTeamName || 'Team B')
           */}
        </h1>
         {/* Optional: Add placeholder/loading state for team names if fetched inside */}
         {innings1Extras && (
             <p className="text-sm text-gray-500 mt-1">
                 {innings1Extras.BattingTeamName} vs {innings1Extras.BowlingTeamName}
             </p>
         )}
      </header>

      {/* Innings 1 Section */}
      {innings1 ? (
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-3 text-indigo-700">
            {innings1Extras?.BattingTeamName || 'Innings 1'} Scorecard
            {innings1Extras?.Total && <span className="text-lg font-bold ml-4 text-gray-800">{innings1Extras.Total}</span>}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800">Batting</h3>
              <BattingScorecard battingCard={innings1.BattingCard} />
              <ExtrasDisplay extras={innings1Extras} />
              <FallOfWicketsDisplay fow={innings1.FallOfWickets} />
            </div>
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800">Bowling</h3>
              <BowlingScorecard bowlingCard={innings1.BowlingCard} />
            </div>
          </div>
        </div>
      ) : (
          <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
             Innings 1 data not available.
          </div>
      )}

      {/* Innings 2 Section */}
      {innings2 ? (
        <div className="bg-white rounded-lg shadow border p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-3 text-teal-700">
            {innings2Extras?.BattingTeamName || 'Innings 2'} Scorecard
            {innings2Extras?.Total && <span className="text-lg font-bold ml-4 text-gray-800">{innings2Extras.Total}</span>}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800">Batting</h3>
              <BattingScorecard battingCard={innings2.BattingCard} />
              <ExtrasDisplay extras={innings2Extras} />
              <FallOfWicketsDisplay fow={innings2.FallOfWickets} />
            </div>
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800">Bowling</h3>
              <BowlingScorecard bowlingCard={innings2.BowlingCard} />
            </div>
          </div>
        </div>
       ) : (
          // Only show this message if Innings 1 *did* exist
           innings1 && (
              <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
                 Innings 2 data not yet available for this match.
              </div>
           )
       )}
    </>
  );
}


// --- Main Page Component ---
export default function MatchDetailPage({ params }: MatchDetailPageProps) {
  const { matchId } = params;

  return (
    <section className="container mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-8">
       {/* Header cainimal data for header separately */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 font-medium">Loading Match Details...</p>
        </div>
      }>
        <MatchContent matchId={matchId} />
      </Suspense>
    </section>
  );
}
