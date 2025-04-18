
async function fetchAndParseInningsData(url: string): Promise<InningsData | null> {
    try {
        // Fetch with appropriate caching for potentially static data (adjust if needed)
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate hourly
        if (!response.ok) {
            // Don't throw error if 404, just return null (e.g., Innings 2 might not exist yet/at all)
            if (response.status === 404) {
                console.warn(`Innings data not found (404): ${url}`);
                return null;
            }
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();

        // Extract JSON from the onScoring({...}) wrapper
        const startIndex = text.indexOf('({');
        const endIndex = text.lastIndexOf('})');

        if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
            console.error(`Could not find valid JSON boundaries in response from ${url}`);
            return null; 
        }

        const jsonString = text.substring(startIndex + 1, endIndex + 1);

        const parsedData: MatchInningsApiResponse = JSON.parse(jsonString);

        if (parsedData.Innings1) return parsedData.Innings1;
        if (parsedData.Innings2) return parsedData.Innings2;

        return null; 

    } catch (error) {
        console.error(`Error fetching or parsing innings data from ${url}:`, error);
        return null;
    }
}

export async function getMatchDetails(matchId: string): Promise<MatchDetailData> {
    if (!matchId || typeof matchId !== 'string' || !/^\d+$/.test(matchId)) {
        console.error(`Invalid matchId provided: ${matchId}`);
        return { matchId, innings1: null, innings2: null };
    }

    const innings1Url = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings1.js`;
    const innings2Url = `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings2.js`;

    console.log(`Fetching match details for Match ID: ${matchId}`);
    console.log(`Innings 1 URL: ${innings1Url}`);
    console.log(`Innings 2 URL: ${innings2Url}`);

    // Fetch both innings concurrently
    const [innings1Data, innings2Data] = await Promise.all([
        fetchAndParseInningsData(innings1Url),
        fetchAndParseInningsData(innings2Url)
    ]);


    return {
        matchId,
        innings1: innings1Data,
        innings2: innings2Data,
    };
}