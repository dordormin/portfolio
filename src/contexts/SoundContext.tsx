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
    if (saved !== null) {
      const muted = saved === 'true';
      setIsMuted(muted);
      toneEngine.setMute(muted);
    }
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
