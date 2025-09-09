// src/pages/About.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../hooks/useI18n";

export default function About(){
  const { t } = useI18n();
  const A = t?.aboutPage ?? {};
  const blocks = Array.isArray(A?.blocks) ? A.blocks : [];
  const stats  = Array.isArray(A?.stats)  ? A.stats  : [];
  const team   = A?.team ?? {};

  // ===== interactive main blocks =====
  const [openBlocks, setOpenBlocks] = useState(() => new Set());
  const blocksRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!blocksRef.current) return;
      if (!blocksRef.current.contains(e.target)) setOpenBlocks(new Set());
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  const toggleBlock = (key) => {
    setOpenBlocks(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };
  const onKeyToggleBlock = (e, key) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleBlock(key); }
  };

  // ===== partners + allies click-outside close =====
  const [openPartners, setOpenPartners] = useState(() => new Set());
  const [openAllies, setOpenAllies]     = useState(() => new Set());
  const partnersRef = useRef(null);
  const alliesRef   = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (partnersRef.current && !partnersRef.current.contains(e.target)) {
        setOpenPartners(new Set());
      }
      if (alliesRef.current && !alliesRef.current.contains(e.target)) {
        setOpenAllies(new Set());
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  const cols = useMemo(() => computeIdealColumns(blocks.length || 3), [blocks.length]);

  // intro with bold highlights
  const highlightedIntro = useMemo(() => {
    const text = A?.intro || "";
    const phrases = [
      "Consultoría Legal Corporativa",
      "Propiedad Industrial",
      "Litigios",
      "Estructuración de Patrimonios y Proyectos Inmobiliarios",
      "Corporate Legal Consulting", 
      "Industrial Property", 
      "Litigation", 
      "Wealth & Real Estate Project Structuring"
    ];
    let html = text;
    phrases.forEach(p => {
      const re = new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      html = html.replace(re, `<strong>${p}</strong>`);
    });
    return { __html: html };
  }, [A?.intro]);

  return (
    <div className="container">
      {/* Intro */}
      <header className="consulting-head">
        <h1>{A?.title || t?.navbar?.about || "Nuestra Firma"}</h1>
        {A?.intro ? <p className="about-intro" dangerouslySetInnerHTML={highlightedIntro} /> : null}
        <p className="page-indicator">{A?.indicator || t?.ui?.hoverHint}</p>
      </header>

      {/* Three blocks */}
      <section className="consulting-grid" ref={blocksRef} style={{ ['--cols']: cols }}>
        {blocks.map(({ key, title, bullets }) => {
          const open = openBlocks.has(key);
          return (
            <article
              key={key}
              className={`consult-card${open ? " is-open" : ""}`}
              tabIndex={0}
              aria-expanded={open}
              aria-label={title}
              onClick={() => toggleBlock(key)}
              onKeyDown={(e) => onKeyToggleBlock(e, key)}
            >
              <h3 className="consult-title">{title}</h3>
              <div className="consult-details">
                <ul>{(bullets||[]).map((b,i)=><li key={i}>{b}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>{t?.langCode === "es" ? "Algunas Cifras" : "Key Figures"}</h2>
          </div>
          <div className="stat-tiles">
            {stats.map(({ key, value, suffix, label }) => (
              <div key={key} className="stat-tile">
                <div className="stat-value">
                  {value}{suffix ? <span className="stat-suffix">{suffix}</span> : null}
                </div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Our Team */}
      <section className="section">
        <div className="section-head">
          <h2>{t?.langCode === "es" ? "Nuestro Equipo" : "Our Team"}</h2>
        </div>

        {/* Partners */}
        <div className="section-head" style={{borderBottom:"none", paddingBottom:0, marginTop:".5rem"}}>
          <h3 className="subhead">{team?.partnersTitle || (t?.langCode === "es" ? "Socios" : "Partners")}</h3>
        </div>
        <div className="team-grid" ref={partnersRef}>
          {(team?.partners || []).map((p, idx) => {
            const open = openPartners.has(idx);
            return (
              <article
                key={idx}
                className={`team-card interactive${open ? " is-open" : ""}`}
                tabIndex={0}
                aria-expanded={open}
                onClick={() => {
                  setOpenPartners(prev => {
                    const next = new Set(prev);
                    next.has(idx) ? next.delete(idx) : next.add(idx);
                    return next;
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenPartners(prev => {
                      const next = new Set(prev);
                      next.has(idx) ? next.delete(idx) : next.add(idx);
                      return next;
                    });
                  }
                }}
              >
                <div className="team-photo-wrap">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="team-name">{p.name}</div>

                {/* BULLET LIST for partners */}
                <div className="partner-details">
                <ul>{(p.details || []).map((d,i)=><li key={i}>{d}</li>)}</ul>
                <div className="more-link">
                    <a 
                    href={p.linkedin || "#"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-link"
                    >
                    {t?.langCode === "es" ? "LinkedIn" : "LinkedIn"}
                    </a>
                </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* Allies */}
        <div className="section-head" style={{borderBottom:"none", paddingBottom:0, marginTop:"1.5rem"}}>
          <h3 className="subhead">{team?.alliesTitle || (t?.langCode === "es" ? "Aliados" : "Allies")}</h3>
        </div>
        <div className="ally-grid" ref={alliesRef}>
          {(team?.allies || []).map((ally, idx) => {
            const open = openAllies.has(idx);
            return (
              <article
                key={idx}
                className={`ally-card${open ? " is-open" : ""}`}
                tabIndex={0}
                aria-expanded={open}
                onClick={() => {
                  setOpenAllies(prev => {
                    const next = new Set(prev);
                    next.has(idx) ? next.delete(idx) : next.add(idx);
                    return next;
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenAllies(prev => {
                      const next = new Set(prev);
                      next.has(idx) ? next.delete(idx) : next.add(idx);
                      return next;
                    });
                  }
                }}
              >
                <div className="ally-photo-wrap">
                  <img src={ally.image} alt={ally.name} />
                </div>
                <div className="ally-header">
                  <div className="ally-name">{ally.name}</div>
                  <div className="ally-focus">{ally.focus}</div>
                </div>
                <div className="ally-details">
                    <ul>{(ally.details||[]).map((d,i)=><li key={i}>{d}</li>)}</ul>
                    <div className="more-link">
                        <a 
                        href={ally.linkedin || "#"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-link"
                        >
                        {t?.langCode === "es" ? "LinkedIn" : "LinkedIn"}
                        </a>
                    </div>
                    </div>

              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* Helpers */
function computeIdealColumns(n){
  if (!n || n <= 1) return 1;
  let bestCols = Math.ceil(Math.sqrt(n));
  let bestRows = Math.ceil(n / bestCols);
  let minDiff  = Math.abs(bestCols - bestRows);
  for (let c = 1; c * c <= n; c++){
    if (n % c === 0){
      const r = n / c;
      const diff = Math.abs(r - c);
      if (diff < minDiff || (diff === minDiff && Math.max(c,r) > bestCols)){
        bestCols = Math.max(c, r);
        bestRows = Math.min(c, r);
        minDiff  = diff;
      }
    }
  }
  return bestCols;
}
