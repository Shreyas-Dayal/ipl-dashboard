import { notFound } from 'next/navigation';
import { getMatchDetails } from '@/lib/fetchMatchDetails'; 
import BattingScorecard from '@/app/components/BattingScorecard';
import BowlingScorecard from '@/app/components/BowlingScorecard';
import Link from 'next/link';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface MatchDetailPageProps {
    params: Promise<{ // <-- Params is now a Promise
        matchId: string;
    }>;
}


// Helper component for Fall of Wickets
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

// Helper component for Extras
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

// Use the defined interface for props
export default async function MatchDetailPage({ params }: MatchDetailPageProps) {

  const { matchId } = await params;

  const matchData = await getMatchDetails(matchId);

  console.log(`Match Data for Match ID ${matchId}:`, matchData);

  if (!matchData || (!matchData.innings1 && !matchData.innings2)) {
    console.error(`No innings data found for matchId: ${matchId}`);
    notFound();
  }

  const { innings1, innings2 } = matchData;
  const innings1Extras = innings1?.Extras?.[0];
  const innings2Extras = innings2?.Extras?.[0];

  return (
    <Suspense fallback={<LoadingSpinner />}>
        <section className="container mx-auto py-8 px-4 md:px-6 lg:px-8 space-y-8">
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
            {innings1Extras?.BattingTeamName || 'Team A'}
            <span className="mx-2 text-gray-500">V/S</span>
            {innings1Extras?.BowlingTeamName || 'Team B'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Match ID: {matchId}
            </p>
        </header>

        {/* Innings 1 Section */}
        {innings1 && (
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
        )}

        {/* Innings 2 Section */}
        {innings2 && (
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
        )}

        {/* Message if only one innings exists */}
        {innings1 && !innings2 && (
            <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
            Only Innings 1 data is available for this match.
            </div>
        )}
        </section>
    </Suspense>
  );
}