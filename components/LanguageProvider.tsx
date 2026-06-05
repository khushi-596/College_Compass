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
    // Set cookie on mount
    document.cookie = `googtrans=/en/${initialLanguage}; path=/`;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const sync = () => {
      const translateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (translateCombo) {
        if (translateCombo.value !== language) {
          translateCombo.value = language;
          translateCombo.dispatchEvent(new Event('change'));
        }
        return true;
      }
      return false;
    };
    
    if (!sync()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (sync() || attempts > 20) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [language, isMounted]);

  const setLanguage = (lang: LanguageKey) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.cookie = `googtrans=/en/${lang}; path=/`;
    window.location.reload();
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

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
