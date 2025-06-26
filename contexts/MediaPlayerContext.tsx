import React, { createContext, useContext } from 'react';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';

const MediaPlayerContext = createContext<ReturnType<typeof useMediaPlayer> | null>(null);

export const MediaPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMediaPlayer();
  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
    </MediaPlayerContext.Provider>
  );
};

export function useMediaPlayerContext() {
  const ctx = useContext(MediaPlayerContext);
  if (!ctx) throw new Error('useMediaPlayerContext must be used within MediaPlayerProvider');
  return ctx;
}
