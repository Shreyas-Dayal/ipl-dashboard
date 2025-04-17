"use client";

import { useEffect, useRef } from 'react';
import { useIplStore } from '@/store/iplStore'; // Adjust path
import { toast } from 'react-toastify';

const createNoteId = (note: MatchNote): string => {
    return `${note?.MatchID}-${note?.OverNo}-${note?.BallNo}-${note?.TeamID}-${note?.Description?.slice(0, 30)}`;
}

export function MatchNoteNotifier() {
  const matchNotes = useIplStore((state) => state.data?.matchNotes);
  const permission = useIplStore((state) => state.notificationPermission);
  const isLoading = useIplStore((state) => state.loading);

  const previousNoteIdsRef = useRef<Set<string>>(new Set());
  const initialLoadComplete = useRef<boolean>(false);

  useEffect(() => {
    if (!isLoading && !initialLoadComplete.current) {
      console.log("MatchNoteNotifier: Initial load finished. Setting baseline notes.");
      initialLoadComplete.current = true; // Mark initial load as done
      const initialNotes = matchNotes || [];
      previousNoteIdsRef.current = new Set<string>(initialNotes.map(createNoteId));
      return;
    }

    // Don't run notification logic if initial load isn't finished ---
    if (!initialLoadComplete.current || !matchNotes) {
       console.log("MatchNoteNotifier: Skipping notification check (initial load not complete or no notes).");
       return;
    }

    // Process subsequent updates 
    console.log("MatchNoteNotifier: Checking for new notes on update...");
    const currentNotes = matchNotes; // We know notes exist here
    const currentNoteIds = new Set<string>(currentNotes.map(createNoteId));
    const previousNoteIds = previousNoteIdsRef.current;
    const newNotes: MatchNote[] = [];

    currentNotes.forEach(note => {
      const noteId = createNoteId(note);
      // Only consider it "new" if it wasn't in the set from the previous check
      if (!previousNoteIds.has(noteId)) {
        newNotes.push(note);
      }
    });

    //  Trigger notifications only if new notes exist on an UPDATE 
    if (newNotes.length > 0) {
      console.log(`MatchNoteNotifier: Found ${newNotes.length} new notes on update.`);
      const isTabHidden = typeof document !== 'undefined' && document.hidden;

      newNotes.forEach((note, index) => {
        const noteId = createNoteId(note);
        if (!note.TeamCode || !note.OverNo || !note.BallNo || !note.Description) {
            console.warn("MatchNoteNotifier: Skipping notification for incomplete note:", note);
            return;
        }
        const message = `${note.TeamCode} (${note.OverNo}.${note.BallNo}): ${note.Description}`;
        const title = `IPL Update: ${note.TeamCode}`;

        // Show react-toastify notification
        setTimeout(() => {
          console.log(`MatchNoteNotifier: Sending toast for ${noteId} (update)`);
          toast.info(message, { toastId: noteId });
        }, index * 200);

        // Show browser notification
        if (permission === 'granted' && isTabHidden) {
           console.log(`MatchNoteNotifier: Sending browser notification for ${noteId} (update)`);
           try {
              new Notification(title, {
                  body: message,
                  icon: '/IPL.png', 
                  tag: noteId, 
              });
           } catch (err) {
              console.error("MatchNoteNotifier: Error creating browser notification:", err);
           }
        }
      });
    } else {
       console.log("MatchNoteNotifier: No new notes found on update.");
    }

    previousNoteIdsRef.current = currentNoteIds;

  }, [matchNotes, permission, isLoading]); 

  return null;
}