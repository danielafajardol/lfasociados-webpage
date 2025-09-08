// src/pages/Consulting.jsx
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../hooks/useI18n";

export default function Consulting() {
  const { t } = useI18n();
  const P = t?.consultingPage ?? {};
  const items = Array.isArray(P?.items) ? P.items : [];

  const [openKeys, setOpenKeys] = useState(() => new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!gridRef.current) return;
      if (!gridRef.current.contains(e.target)) setOpenKeys(new Set());
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  const toggleCard = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };
  const onKeyToggle = (e, key) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(key); }
  };

  const getBullets = (entry) => Array.isArray(entry?.bullets)
    ? entry.bullets
    : (typeof entry?.details === "string" ? entry.details.split(";").map(s=>s.trim()).filter(Boolean) : []);

  return (
    <div className="container">
      <header className="consulting-head">
        <h1>{P?.title || t?.services?.consulting || "Consultoría Legal"}</h1>
        <p className="consulting-intro">{P?.intro || ""}</p>
        <p className="page-indicator">{P?.indicator || t?.ui?.hoverHint}</p>
      </header>

      <section className="consulting-grid" ref={gridRef}>
        {items.map(({ key, title, bullets }) => {
          const open = openKeys.has(key);
          const list = getBullets({ bullets });
          return (
            <article
              key={key}
              className={`consult-card${open ? " is-open" : ""}`}
              tabIndex={0}
              aria-expanded={open}
              aria-label={title}
              onClick={() => toggleCard(key)}
              onKeyDown={(e) => onKeyToggle(e, key)}
            >
              <h3 className="consult-title">{title}</h3>
              <div className="consult-details">
                <ul>{list.map((b,i)=><li key={i}>{b}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
