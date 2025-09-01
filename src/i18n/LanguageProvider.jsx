// src/i18n/LanguageProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

const dictionaries = { en, es };
const LanguageContext = createContext({
  t: es, lang: "es", setLang: () => {}, toggle: () => {}
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "es");
  const t = useMemo(() => dictionaries[lang] || es, [lang]);

  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

  const toggle = () => setLang(prev => (prev === "es" ? "en" : "es"));
  const value = useMemo(() => ({ t, lang, setLang, toggle }), [t, lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// ✅ Named hook export that TopBar/NavBar expect
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// Optional default export (harmless; keeps both styles working)
export default LanguageProvider;
