// src/i18n/LanguageProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import en from "../locales/en.json";
import es from "../locales/es2.json";


const isDev = import.meta.env.DEV; // true when running `npm run dev`


const dictionaries = { en, es };
const fallback = es; // set 'en' if you prefer English as the base

function mergeWithFallback(base, fb) {
  return {
    ...fb,
    ...base,
    navbar:   { ...(fb.navbar   || {}), ...(base.navbar   || {}) },
    hero:     { ...(fb.hero     || {}), ...(base.hero     || {}) },
    learn:    { ...(fb.learn    || {}), ...(base.learn    || {}) },
    services: { ...(fb.services || {}), ...(base.services || {}) },
    info:     { ...(fb.info     || {}), ...(base.info     || {}) },
    contact:  { ...(fb.contact  || {}), ...(base.contact  || {}) },
    footer:   { ...(fb.footer   || {}), ...(base.footer   || {}) },
    links:    { ...(fb.links    || {}), ...(base.links    || {}) },
  };
}

const LanguageContext = createContext({
  t: fallback, lang: "es", setLang: () => {}, toggle: () => {}
});

export function LanguageProvider({ children }) {
    // In dev, don't read from localStorage
    const initialLang = isDev ? "es" : (localStorage.getItem("lang") || "es");
    const [lang, setLang] = useState(initialLang);
  
    const t = useMemo(() => {
      const chosen = dictionaries[lang] || fallback;
      return mergeWithFallback(chosen, fallback);
    }, [lang]);
  
    // Only persist in prod
    useEffect(() => {
      if (!isDev) {
        localStorage.setItem("lang", lang);
      }
    }, [lang]);
  
    useEffect(() => {
      document.documentElement.setAttribute("lang", lang);
    }, [lang]);
  
    const toggle = useCallback(() => setLang(prev => (prev === "es" ? "en" : "es")), []);
  
    const value = useMemo(() => ({ t, lang, setLang, toggle }), [t, lang, toggle]);
  
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
  }
  

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export default LanguageProvider;
