// app/page.tsx
// This page uses Server-Side Rendering (SSR) to always show the freshest live match info.
export const dynamic = "force-dynamic" // Force SSR

export default async function Home() {
    const res = await fetch("http://localhost:3000/api/scrape", { cache: "no-store" })
    const data = await res.json()
    const match = data.featuredMatch

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">🏏 Live Match</h1>
            <div className="bg-white p-4 rounded shadow">
                <p className="text-sm text-red-600 font-bold">LIVE • {match.time}</p>
                <h2 className="text-lg font-bold mb-2">
                    {match.team1} vs {match.team2}
                </h2>
                <div className="space-y-1">
                    <p>{match.team1}: {match.score1} ({match.overs1} overs)</p>
                    <p>{match.team2}: {match.score2} ({match.overs2} overs)</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">{match.venue}</p>
            </div>
        </section>
    )
}