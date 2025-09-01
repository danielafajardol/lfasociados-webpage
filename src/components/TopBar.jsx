// src/components/TopBar.jsx
import { FaLinkedin, FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useI18n } from "../hooks/useI18n";

export default function TopBar(){
  const { t, lang, toggle } = useI18n();
  const links = t.links?.social || {};

  const parts = ["En","Es"]; // display order remains "En | Es"
  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href={links.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
        <div className="topbar-right">
          <div className="lang-toggle" role="button" onClick={toggle} title="Toggle language">
            <span className={lang === "en" ? "active" : ""}>En</span>
            <span>|</span>
            <span className={lang === "es" ? "active" : ""}>Es</span>
          </div>
        </div>
      </div>
    </div>
  );
}
