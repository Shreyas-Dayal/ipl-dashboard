import { create } from 'zustand';

type NotificationPermissionStatus = 'granted' | 'denied' | 'default';

interface IplState {
  data: ScrapedDataResponse | null;
  loading: boolean;
  error: string | null;
  notificationPermission: NotificationPermissionStatus;

  // Actions
  fetchData: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  requestNotificationPermission: () => Promise<void>;
  setNotificationPermission: (status: NotificationPermissionStatus) => void;
}

export const useIplStore = create<IplState>((set, get) => ({
  data: null,
  loading: true,
  error: null,
  notificationPermission: (typeof Notification !== 'undefined' ? Notification.permission : 'default') as NotificationPermissionStatus,

  setLoading: (isLoading) => set({ loading: isLoading, error: null }),

  setNotificationPermission: (status) => set({ notificationPermission: status }),

  requestNotificationPermission: async () => {
    if (typeof Notification === 'undefined') {
        console.warn('Browser notifications not supported.');
        return;
    }
    if (get().notificationPermission !== 'default') {
        console.log('Permission already requested:', get().notificationPermission);
        return;
    }
    console.log('Requesting notification permission...');
    try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission status:', permission);
        set({ notificationPermission: permission });
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
  },

  fetchData: async () => {
     if (get().data === null) {
       set({ loading: true, error: null });
     } else {
        set({ error: null });
     }

    try {
      const res = await fetch("/api/ipl-data", { cache: "no-store" });
      console.log("Polling data from API via Zustand (Store)...");

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const fetchedData: ScrapedDataResponse = await res.json();
      console.log('Fetched data in Zustand Store:', fetchedData?.matchNotes?.length);


      set({
          data: fetchedData,
          loading: false,
          error: null,
       });

    } catch (fetchError) {
      console.error("Error fetching data in Zustand Store:", fetchError); 
      const errorMessage = fetchError instanceof Error ? fetchError.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
    }
  },
}));
