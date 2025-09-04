// src/i18n/LanguageProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import en from "../locales/en.json";
import es from "../locales/es2.json";

const dictionaries = { en, es };
const fallback = es;                  // fallback base (keep 'es' since you’re authoring in Spanish)
const isDev = import.meta.env.DEV;    // don’t persist during dev

function isNonEmpty(obj){
  return obj && typeof obj === "object" && Object.keys(obj).length > 0;
}
function smartMergeBlock(baseBlock, fbBlock){
  // If base has content, merge; if empty/missing, keep fallback
  return isNonEmpty(baseBlock) ? { ...(fbBlock || {}), ...baseBlock } : (fbBlock || {});
}

function mergeWithFallback(base, fb){
  const merged = {
    ...fb,
    ...base,

    // 🔐 Smart-merge all USED blocks (now includes consultingPage)
    navbar:         smartMergeBlock(base.navbar,         fb.navbar),
    hero:           smartMergeBlock(base.hero,           fb.hero),
    learn:          smartMergeBlock(base.learn,          fb.learn),
    services:       smartMergeBlock(base.services,       fb.services),
    info:           smartMergeBlock(base.info,           fb.info),
    contact:        smartMergeBlock(base.contact,        fb.contact),
    footer:         smartMergeBlock(base.footer,         fb.footer),
    links:          smartMergeBlock(base.links,          fb.links),
    meta:           smartMergeBlock(base.meta,           fb.meta),
    consultingPage: smartMergeBlock(base.consultingPage, fb.consultingPage), // ✅ added
  };

  // Normalize hero keys so old title/subtitle still work
  merged.hero = {
    ...merged.hero,
    slogan: merged.hero.slogan ?? merged.hero.title ?? "",
    intro:  merged.hero.intro  ?? merged.hero.subtitle ?? "",
  };

  return merged;
}

const LanguageContext = createContext({
  t: fallback, lang: "es", setLang: () => {}, toggle: () => {}
});

export function LanguageProvider({ children }) {
  const initialLang = isDev ? "es" : (localStorage.getItem("lang") || "es");
  const [lang, setLang] = useState(initialLang);

  const t = useMemo(() => {
    const chosen = dictionaries[lang] || fallback;
    return mergeWithFallback(chosen, fallback);
  }, [lang]);

  // only persist in prod
  useEffect(() => { if (!isDev) localStorage.setItem("lang", lang); }, [lang]);
  useEffect(() => { document.documentElement.setAttribute("lang", lang); }, [lang]);

  const toggle = useCallback(() => setLang(prev => (prev === "es" ? "en" : "es")), []);
  const value = useMemo(() => ({ t, lang, setLang, toggle }), [t, lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(){
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export default LanguageProvider;

