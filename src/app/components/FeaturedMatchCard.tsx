"use client"; // Add this line at the top of the file

import Link from 'next/link';
// components/FeaturedMatchCard.tsx
import React, { useState } from 'react';

interface FeaturedMatchCardProps {
    match: ScheduleMatchRaw | null; // Use ScheduleMatchRaw type for match prop
    matchNotes: MatchNote[]; // Use MatchNote type for matchNotes prop
}

const MatchStatusBadge: React.FC<{ matchStatus: ScheduleMatchRaw['MatchStatus'], matchTime: ScheduleMatchRaw['MatchTime'] }> = ({ matchStatus, matchTime }) => {
    let badgeContent, badgeClassName;

    if (matchStatus === 'Post') {
        badgeContent = 'Completed';
        badgeClassName = 'bg-green-500';
    } else if (matchStatus === 'Live') {
        badgeContent = 'LIVE';
        badgeClassName = 'bg-gradient-to-r from-blue-500 to-blue-600';
    } else {
        badgeContent = matchStatus?.toUpperCase() || 'UPCOMING';
        badgeClassName = 'bg-gray-200 text-gray-700';
        // badgeClassName = 'bg-gradient-to-r from-blue-500 to-blue-600';
    }

    return (
        <div className={`${badgeClassName} p-2 text-white text-sm font-medium flex items-center justify-start`}>
            <div className="flex-1">
                {badgeContent === 'LIVE' ? (
                    <div className="mr-2 flex items-center">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="ml-1 text-xs font-bold text-red-500">LIVE</span>
                    </div>
                ) : (
                    badgeContent
                )}
            </div>
            <span>{matchTime} IST</span>
        </div>
    );
};


const FeaturedMatchCard: React.FC<FeaturedMatchCardProps> = ({ match, matchNotes }) => {
    const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse
    const [isPreMatchCommentaryOpen, setIsPreMatchCommentaryOpen] = useState(false);
    const [isPostMatchCommentaryOpen, setIsPostMatchCommentaryOpen] = useState(false);

    console.log('FeaturedMatchCard match:', match); // Debugging log

    if (!match) {
        return <p>No featured match data available.</p>;
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const togglePreMatchCommentary = () => {
        setIsPreMatchCommentaryOpen(!isPreMatchCommentaryOpen);
    };

    const togglePostMatchCommentary = () => {
        setIsPostMatchCommentaryOpen(!isPostMatchCommentaryOpen);
    };

    const preMatchContent = match.PreMatchCommentary;
    const postMatchContent = match.PostMatchCommentary;

    return (
        <section className="mb-4"> {/* Added margin bottom for spacing */}
            <h2 className="text-xl font-bold mb-4">Featured Match</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden border">
                <MatchStatusBadge matchStatus={match.MatchStatus} matchTime={match.MatchTime} />

                <div className="p-4 md:p-6">
                    <Link href={`/match/${match.MatchID}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center justify-self-end">
                        Match Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-center flex-grow">{match.MatchName}</h3>
                    </div>
                    <p className="text-center text-sm text-gray-500 mb-2">{match.MatchType}</p>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-1 flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mb-2">
                                {match.MatchHomeTeamLogo ? (
                                    <img src={match.MatchHomeTeamLogo} alt={match.FirstBattingTeamName} className="w-full h-full rounded-full object-contain" />
                                ) : (
                                    <span className="text-gray-500 text-xl font-bold">{match.FirstBattingTeamCode?.substring(0, 3).toUpperCase()}</span>
                                )}
                            </div>
                            <h3 className="font-bold">{match.FirstBattingTeamName}</h3>
                            <p className="text-2xl font-bold mt-2">{match["1Summary"] || "-"}</p>
                            <p className="text-sm text-gray-500">({match["1FallOvers"] || "-"} overs)</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-sm font-medium text-gray-500 mb-2">Match Details</div>
                            <div className="text-xl font-bold">VS</div>
                            <div className="flex items-center mt-4 text-sm text-gray-600">
                                <span>{match.GroundName}</span>
                            </div>
                            <div className="text-sm text-gray-600">{match.MatchDateNew}, {match.MatchTime} IST</div>
                        </div>

                        <div className="flex flex-1 flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center mb-2">
                                {match.MatchAwayTeamLogo ? (
                                    <img src={match.MatchAwayTeamLogo} alt={match.SecondBattingTeamName} className="w-full h-full rounded-full object-contain" />
                                ) : (
                                    <span className="text-gray-500 text-xl font-bold">{match.SecondBattingTeamCode?.substring(0, 3).toUpperCase()}</span>
                                )}
                            </div>
                            <h3 className="font-bold">{match.SecondBattingTeamName}</h3>
                            <p className="text-2xl font-bold mt-2">{match["2Summary"] || "-"}</p>
                            <p className="text-sm text-gray-500">({match["2FallOvers"] || "-"} overs)</p>
                        </div>
                    </div>

                    {/* Live Match Details - Current Players */}
                    {match.MatchStatus === 'Live' && (
                        <div className="mt-12 px-4 md:px-6">
                            <h4 className="font-semibold text-gray-700 mb-2 text-center">Live Action</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Row 1 */}
                                <div className="flex flex-col items-center">
                                    <h5 className="text-sm font-medium text-gray-600 mb-1 text-center">Striker</h5>
                                    <div className="flex items-center justify-center">
                                        {match.StrikerImage && <img src={match.StrikerImage} alt={match.CurrentStrikerName} className="w-8 h-8 rounded-full mr-2" />}
                                        <div className="text-center">
                                            <p className="font-medium">{match.CurrentStrikerName || "-"}</p>
                                            <p className="text-sm text-gray-500">{match.StrikerRuns}({match.StrikerBalls})</p>
                                            <p className="text-sm text-gray-500">SR: {match.StrikerSR}</p>
                                            <p className="text-sm text-gray-500">4s: {match.StrikerFours}, 6s: {match.StrikerSixes}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h5 className="text-sm font-medium text-gray-600 mb-1 text-center">Current Bowler</h5>
                                    <div className="flex items-center justify-center">
                                        {match.BowlerImage && <img src={match.BowlerImage} alt={match.CurrentBowlerName} className="w-8 h-8 rounded-full mr-2" />}
                                        <div className="text-center">
                                            <p className="font-medium">{match.CurrentBowlerName || "-"}</p>
                                            <p className="text-sm text-gray-500">{match.BowlerOvers}-{match.BowlerRuns}-{match.BowlerWickets}</p>
                                            <p className="text-sm text-gray-500">Economy: {match.BowlerEconomy}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex flex-col items-center">
                                    <h5 className="text-sm font-medium text-gray-600 mb-1 text-center">Non-Striker</h5>
                                    <div className="flex items-center justify-center">
                                        {match.NonStrikerImage && <img src={match.NonStrikerImage} alt={match.CurrentNonStrikerName} className="w-8 h-8 rounded-full mr-2" />}
                                        <div className="text-center">
                                            <p className="font-medium">{match.CurrentNonStrikerName || "-"}</p>
                                            <p className="text-sm text-gray-500">{match.NonStrikerRuns}({match.NonStrikerBalls})</p>
                                            <p className="text-sm text-gray-500">SR: {match.NonStrikerSR}</p>
                                            <p className="text-sm text-gray-500">4s: {match.NonStrikerFours}, 6s: {match.NonStrikerSixes}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h5 className="text-sm font-medium text-gray-600 mb-1 text-center">Current Run Rate</h5>
                                    <p className="font-medium text-sm text-blue-700 text-center">{match["1RunRate"] || "-"}</p>
                                </div>
                            </div>
                        </div>
                    )}


                    {match.MatchStatus === 'Post' && (
                        <div className="mt-6 text-center">
                            <p className="text-sm font-medium text-green-600">
                                {match.Commentss}
                                {match.MOM ? <>, Player of the Match: {match.MOM}</> : null}
                            </p>
                            {match.PostMatchCommentary && (
                                <div className="mt-2 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: match.PostMatchCommentary?.substring(0, 200) + '...' }} />
                            )}
                        </div>
                    )}
                    {match.MatchStatus !== 'Post' && match.MatchStatus !== 'In Progress' && (
                        <div className="mt-6 text-center">
                            <p className="text-sm font-medium text-gray-600">Match {match.MatchStatus || 'scheduled'}</p>
                            {match.PreMatchCommentary && (
                                <div className="mt-2 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: match.PreMatchCommentary?.substring(0, 200) + '...' }} />
                            )}
                        </div>
                    )}
                    {match.MatchStatus === 'Live' && match.MatchBreakComments && (
                        <div className="mt-6 text-center">
                            <p className="text-sm font-medium text-blue-700">{match.MatchBreakComments}</p>
                        </div>
                    )}
                </div>
                {/* Expanded Section */}
                {isExpanded && (
                    <div className="border-t p-4 md:p-6 bg-gray-50">
                        <h4 className="font-bold text-gray-700 mb-3 text-xl">More Match Details</h4>

                        {/* Add Match Notes - Improved UI */}
                        {matchNotes && matchNotes.length > 0 && (
                            <div className="mb-4">
                                <h5 className="font-semibold mb-3 text-gray-700">Key Match Moments</h5>
                                <ul className="divide-y divide-gray-200">
                                    {matchNotes.map((note, index) => (
                                        <li key={index} className="py-2">
                                            <div className="grid grid-cols-[40px_1fr] gap-2 items-start">
                                                <div className="flex flex-col items-center justify-center text-sm text-gray-500">
                                                    <div className="font-bold">{note.OverNo}. {note.BallNo}</div>
                                                    {/* <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">{note.BallNo}</div> */}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-700">
                                                        {note.Description} <span className="text-blue-500 font-semibold">({note.TeamCode})</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}


                        <div className="mb-4">
                            <h5 className="font-semibold mb-2 text-gray-700">Match Information</h5>
                            <table className="w-full text-sm text-gray-600">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Ground Name</th>
                                        <td className="py-2">{match.GroundName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Date</th>
                                        <td className="py-2">{match.MatchDateNew}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Time</th>
                                        <td className="py-2">{match.MatchTime} IST</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Match Type</th>
                                        <td className="py-2">{match.MatchType}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Overs</th>
                                        <td className="py-2">{match.MATCH_NO_OF_OVERS}</td>
                                    </tr>
                                    {match.TossTeam && (
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Toss</th>
                                            <td className="py-2">{match.TossTeam} {match.TossText}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {(match.RevisedOver || match.RevisedTarget) &&
                            <div className="mb-4">
                                <h5 className="font-medium mb-2 text-gray-700">Revised Match Details</h5>
                                <table className="w-full text-sm text-gray-600">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Revised Overs</th>
                                            <td className="py-2">{match.RevisedOver || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Revised Target</th>
                                            <td className="py-2">{match.RevisedTarget || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }

                        <div className="mb-4">
                            <h5 className="font-semibold mb-2 text-gray-700">Projected Scores</h5>
                            <table className="w-full text-sm text-gray-600">
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">Projected Score</th>
                                        <td className="py-2">{match.ProjectedScore}</td>
                                    </tr>
                                    <tr hidden={match["2ndProjectedScore"] == '0' }>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">2nd Projected Score</th>
                                        <td className="py-2">{match["2ndProjectedScore"] || "N/A"}</td>
                                    </tr>
                                    <tr hidden={match["3rdProjectedScore"] == '0'}>
                                        <th scope="row" className="py-2 font-medium text-left pr-4">3rd Projected Score</th>
                                        <td className="py-2">{match["3rdProjectedScore"] || "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="mb-4">
                            <h5 className="font-semibold mb-2 text-gray-700">Umpires</h5>
                            <table className="w-full text-sm text-gray-600">
                                <tbody className="divide-y divide-gray-200">
                                    {match.GroundUmpire1 && (
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Ground Umpire 1</th>
                                            <td className="py-2">{match.GroundUmpire1}</td>
                                        </tr>
                                    )}
                                    {match.GroundUmpire2 && (
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Ground Umpire 2</th>
                                            <td className="py-2">{match.GroundUmpire2}</td>
                                        </tr>
                                    )}
                                    {match.ThirdUmpire && (
                                        <tr>
                                            <th scope="row" className="py-2 font-medium text-left pr-4">Third Umpire</th>
                                            <td className="py-2">{match.ThirdUmpire}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <div className="mb-4">
                            <h5 className="font-medium mb-2 text-gray-700">Commentary</h5>

                            {/* Pre-Match Commentary Accordion */}
                            {preMatchContent && (
                                <div className="mb-3 border rounded">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-3 font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-t focus:outline-none"
                                        onClick={togglePreMatchCommentary}
                                    >
                                        <span>Pre-Match Commentary & Conditions</span>
                                        <svg className={`w-3 h-3 shrink-0 ${isPreMatchCommentaryOpen ? '' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 7">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5 5 5-5" />
                                        </svg>
                                    </button>
                                    {isPreMatchCommentaryOpen && (
                                        <div className="p-3 border-t border-gray-200">
                                            <div className="text-gray-700 text-sm font-normal" dangerouslySetInnerHTML={{ __html: preMatchContent }} />
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* Post-Match Commentary Accordion */}
                            {postMatchContent && (
                                <div className="mb-3 border rounded">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-3 font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-t focus:outline-none"
                                        onClick={togglePostMatchCommentary}
                                    >
                                        <span>Post-Match Commentary</span>
                                        <svg className={`w-3 h-3 shrink-0 ${isPostMatchCommentaryOpen ? '' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 7">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5 5 5-5" />
                                        </svg>
                                    </button>
                                    {isPostMatchCommentaryOpen && (
                                        <div className="p-3 border-t border-gray-200">
                                            <div className="text-gray-700 text-sm font-normal" dangerouslySetInnerHTML={{ __html: postMatchContent }} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {match.MatchBreakComments && <div className="mt-2 mb-3">
                                <h6 className="font-medium text-gray-700">Match Break Comments:</h6>
                                <p className="text-blue-700 font-normal">{match.MatchBreakComments}</p>
                            </div>}
                        </div>

                        {/* Add more details here as needed from ScheduleMatchRaw */}
                    </div>
                )}
                <div className="p-4 md:p-6 bg-gray-100 border-t text-center">
                    <button
                        onClick={toggleExpand}
                        className="text-blue-500 hover:underline text-sm font-medium focus:outline-none"
                    >
                        {isExpanded ? "Collapse Details" : "Show More Details"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedMatchCard;
