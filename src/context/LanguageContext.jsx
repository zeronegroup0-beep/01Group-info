// ============================================================
//  src/context/LanguageContext.jsx
//  Provides language state (ar/en) and a t() helper
//  to all components via React Context.
// ============================================================
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  // t(key) — returns the translated string for the current language
  const t = useCallback(
    (key) => translations[lang]?.[key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Convenience hook
export const useLang = () => useContext(LanguageContext);
