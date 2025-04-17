// components/UpcomingMatchesCarousel.tsx
import React from 'react';
import Link from 'next/link';

interface UpcomingMatchesCarouselProps {
    upcomingMatches: ScheduleMatch[]; // Use ScheduleMatch type for upcomingMatches prop
}

const UpcomingMatchesCarousel: React.FC<UpcomingMatchesCarouselProps> = ({ upcomingMatches }) => {
    console.log('upcomingMatches',upcomingMatches)
    return (
        <section>
            <div className="flex items-center justify-between mb-4 mt-8">
                <h2 className="text-xl font-bold">Upcoming Matches</h2>
                <Link href="/schedule" className="text-blue-600 hover:underline text-sm font-medium">View Full Schedule</Link>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4">
                {upcomingMatches.map((match, index) => (
                    <div key={index} className="min-w-[280px] flex-shrink-0 bg-white rounded-lg shadow border">
                        {match.matchStatus === 'Live' && (
                            <div className="mr-2 flex items-center mt-4 ml-4 mb-[-8px]">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="ml-1 text-xs font-bold text-red-500">LIVE</span>
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>{match.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>{match.time} IST</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-start justify-center">
                                        {/* <span className="text-gray-500 text-sm font-bold">{match.teams[0].substring(0, 3).toUpperCase()}</span> */}
                                        <img 
                                            src={match.team1Logo} // Replace with the actual logo URL
                                            alt={match.teams[0]}
                                            className="w-12 h-12 object-contain mb-1"
                                        />
                                    </div>
                                    <span className="text-sm font-medium mt-1">{match.teams[0]}</span>
                                </div>
                                <div className="text-lg font-bold">VS</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-start justify-center">
                                        {/* <span className="text-gray-500 text-sm font-bold">{match.teams[1].substring(0, 3).toUpperCase()}</span> */}
                                        <img 
                                            src={match.team2Logo} // Replace with the actual logo URL
                                            alt={match.teams[1]}
                                            className="w-12 h-12 object-contain mb-1"
                                        />
                                    </div>
                                    <span className="text-sm font-medium mt-1">{match.teams[1]}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                                <span>{match.venue}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingMatchesCarousel;