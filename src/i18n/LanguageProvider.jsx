// src/i18n/LanguageProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import en from "../locales/enn2.json";
import es from "../locales/ess3.json";

const dictionaries = { en, es };
const fallback = es;                  // Authoring base
const isDev = import.meta.env.DEV;

function isNonEmpty(obj){ return obj && typeof obj === "object" && Object.keys(obj).length > 0; }
function smartMergeBlock(baseBlock, fbBlock){ return isNonEmpty(baseBlock) ? { ...(fbBlock||{}), ...baseBlock } : (fbBlock||{}); }

function mergeWithFallback(base, fb){
  const merged = {
    ...fb,
    ...base,
    navbar:         smartMergeBlock(base.navbar,         fb.navbar),
    hero:           smartMergeBlock(base.hero,           fb.hero),
    learn:          smartMergeBlock(base.learn,          fb.learn),
    services:       smartMergeBlock(base.services,       fb.services),
    info:           smartMergeBlock(base.info,           fb.info),
    contact:        smartMergeBlock(base.contact,        fb.contact),
    footer:         smartMergeBlock(base.footer,         fb.footer),
    links:          smartMergeBlock(base.links,          fb.links),
    meta:           smartMergeBlock(base.meta,           fb.meta),
    ui:             smartMergeBlock(base.ui,             fb.ui),
    consultingPage: smartMergeBlock(base.consultingPage, fb.consultingPage),
    propertyPage:   smartMergeBlock(base.propertyPage,   fb.propertyPage),
    structuringPage:smartMergeBlock(base.structuringPage,fb.structuringPage),
  };

  // Normalize hero keys for any old shape
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

  useEffect(() => { if (!isDev) localStorage.setItem("lang", lang); }, [lang]);
  useEffect(() => { document.documentElement.setAttribute("lang", lang); }, [lang]);

  const toggle = useCallback(() => setLang(prev => (prev === "es" ? "en" : "es")), []);
  const value  = useMemo(() => ({ t, lang, setLang, toggle }), [t, lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(){ const ctx = useContext(LanguageContext); if (!ctx) throw new Error("useLang must be used within LanguageProvider"); return ctx; }
export default LanguageProvider;
