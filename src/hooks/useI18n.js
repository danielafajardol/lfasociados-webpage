// src/hooks/useI18n.js
import { useLang } from "../i18n/LanguageProvider";

function useI18n() {
  const { t, lang, toggle, setLang } = useLang();
  return { t, lang, toggle, setLang };
}

// Export BOTH ways so any import style works:
export { useI18n };
export default useI18n;
