// src/components/TopBar.jsx
import { FaLinkedin, FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useI18n } from "../hooks/useI18n";

export default function TopBar(){
  const { t, lang, setLang } = useI18n();       // ⬅️ use setLang, not toggle
  const links = t.links?.social || {};

  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href={links.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>

        {/* Explicit language buttons so we never land in an in-between state */}
        <div className="topbar-right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              En
            </button>
            <span>|</span>
            <button
              type="button"
              className={lang === "es" ? "active" : ""}
              aria-pressed={lang === "es"}
              onClick={() => setLang("es")}
            >
              Es
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
