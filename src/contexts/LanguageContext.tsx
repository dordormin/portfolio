import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const browserLang = navigator.language.toLowerCase();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Check if user is in French-speaking regions (Quebec/France) or has French as browser language
        if (
          browserLang.startsWith('fr') || 
          timeZone === 'America/Montreal' || 
          timeZone === 'Europe/Paris'
        ) {
          return 'fr';
        }
      } catch (e) {
        // Fallback silently
      }
    }
    return 'en';
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
