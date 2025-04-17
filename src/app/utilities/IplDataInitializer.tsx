"use client";

import { useEffect, useRef } from 'react';
import { useIplStore } from '@/store/iplStore'; 

let intervalId: NodeJS.Timeout | null = null;

export function IplDataInitializer() {
  const initialized = useRef(false);
  const fetchData = useIplStore((state) => state.fetchData);

  useEffect(() => {
    // Prevent running twice in React StrictMode or HMR
    if (initialized.current) return;
    initialized.current = true;

    console.log('IplDataInitializer: Component mounted, starting fetch and poll.');

    fetchData();

    // Clear previous interval just in case
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
       console.log('Polling interval triggered by Initializer...');
       fetchData();
    }, 30000); // 30 seconds

    // Cleanup function on component unmount
    return () => {
      console.log('IplDataInitializer: Component unmounting, clearing interval.');
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      initialized.current = false; // Allow re-initialization if component remounts somehow
    };
  }, [fetchData]); 

  return null; 
}