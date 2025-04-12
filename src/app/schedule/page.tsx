// app/schedule/page.tsx
export const revalidate = 3600 // SSG: Revalidate every 1 hour

export default async function Schedule() {
    const res = await fetch("http://localhost:3000/api/scrape")
    const data: ScrapedDataResponse = await res.json()
    const weeks: ScheduleWeek[] = data.schedule

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">📅 Match Schedule</h1>
            {weeks.map((week, i) => (
                <div key={i} className="mb-6">
                    <h2 className="font-semibold mb-2">{week.date}</h2>
                    {week.matches.map((match, idx) => (
                        <div key={idx} className="border p-3 bg-white rounded mb-2">
                            <p className="font-medium">
                                {match.teams[0]} vs {match.teams[1]}
                            </p>
                            <p className="text-sm text-gray-600">
                                {match.date} | {match.time} | {match.venue}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}