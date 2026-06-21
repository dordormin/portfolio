import React, { createContext, useContext, useState, useEffect } from 'react';
import { toneEngine } from '@/utils/ToneEngine';

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_muted');
    const initialMuted = saved !== null ? saved === 'true' : true;
    setIsMuted(initialMuted);

    // AudioContext can only start after a user gesture.
    const handleFirstInteraction = () => {
      if (!initialMuted) {
        toneEngine.setMute(false);
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_muted', String(next));
      toneEngine.setMute(next);
      // Play a click sound when turning it on
      if (!next) {
        setTimeout(() => toneEngine.playClick(), 100);
      }
      return next;
    });
  };

  const playHover = () => toneEngine.playHover();
  const playClick = () => toneEngine.playClick();

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}
