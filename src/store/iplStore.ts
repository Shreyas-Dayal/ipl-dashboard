import { create } from 'zustand';

interface IplState {
  data: ScrapedDataResponse | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  setLoading: (isLoading: boolean) => void; 
}

export const useIplStore = create<IplState>((set, get) => ({
  data: null,
  loading: true, 
  error: null,

  setLoading: (isLoading) => set({ loading: isLoading, error: null }), // Clear error when starting load

  fetchData: async () => {
    if (get().data === null) {
       set({ loading: true, error: null });
    } else {
        set({ error: null });
    }

    try {
      const res = await fetch("/api/ipl-data", { cache: "no-store" });
      console.log("Polling data from API via Zustand...");
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const fetchedData: ScrapedDataResponse = await res.json();
      console.log('Fetched data in Zustand:', fetchedData);
      set({ data: fetchedData, loading: false, error: null });

    } catch (fetchError) {
      console.error("Error fetching data in Zustand:", fetchError);
      const errorMessage = fetchError instanceof Error ? fetchError.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
    }
  },
}));

let isInitialized = false;
let intervalId: NodeJS.Timeout | null = null;

export const initializeIplDataFetching = () => {
  if (isInitialized) return; // Prevent multiple initializations

  console.log('Initializing IPL Data Fetching and Polling...');
  isInitialized = true;

  const store = useIplStore.getState();

  store.fetchData();

  if (intervalId) clearInterval(intervalId);

  // Set up polling interval
  intervalId = setInterval(() => {
    console.log('Polling interval triggered...');
    useIplStore.getState().fetchData(); // Call fetch action periodically
  }, 30000); // 30 seconds

};

export const cleanupPolling = () => {
    if (intervalId) {
        console.log('Cleaning up polling interval...');
        clearInterval(intervalId);
        intervalId = null;
        isInitialized = false;
    }
}