'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageKey, translations, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageKey>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Get language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as LanguageKey | null;
    const browserLanguage = navigator.language.split('-')[0].toLowerCase();
    
    let initialLanguage: LanguageKey = 'en';
    if (savedLanguage && savedLanguage in translations) {
      initialLanguage = savedLanguage;
    } else if (browserLanguage === 'hi') {
      initialLanguage = 'hi';
    } else if (browserLanguage === 'es') {
      initialLanguage = 'es';
    }

    setLanguageState(initialLanguage);
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: LanguageKey) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
