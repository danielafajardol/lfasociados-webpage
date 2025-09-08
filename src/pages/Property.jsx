// src/pages/Property.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../hooks/useI18n";

export default function Property(){
  const { t } = useI18n();
  const P = t?.propertyPage ?? {};
  const bullets = Array.isArray(P?.bullets) ? P.bullets : [];

  // Group bullets by first word
  const groups = useMemo(() => groupByFirstWord(bullets), [bullets]);

  const [openKeys, setOpenKeys] = useState(() => new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!gridRef.current) return;
      if (!gridRef.current.contains(e.target)) setOpenKeys(new Set());
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const toggle = (key) => {
    setOpenKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };
  const onKeyToggle = (e, key) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(key); }
  };

  return (
    <div className="container">
      <header className="consulting-head">
        <h1>{P?.title || t?.services?.property || "Propiedad Industrial"}</h1>
        <p className="consulting-intro">{P?.intro || ""}</p>
        <p className="page-indicator">{t?.ui?.hoverHint}</p>
      </header>

      <section className="consulting-grid" ref={gridRef}>
        {groups.map(({ key, title, items }) => {
          const open = openKeys.has(key);
          return (
            <article
              key={key}
              className={`consult-card${open ? " is-open" : ""}`}
              tabIndex={0}
              aria-expanded={open}
              aria-label={title}
              onClick={() => toggle(key)}
              onKeyDown={(e) => onKeyToggle(e, key)}
            >
              <h3 className="consult-title">{title}</h3>
              <div className="consult-details">
                <ul>{items.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

/* Helpers */
function groupByFirstWord(lines){
  const order = [];
  const map = new Map();
  for (const raw of lines){
    if (typeof raw !== "string") continue;
    const first = firstWord(raw);
    const key = first.toLowerCase();
    if (!map.has(key)){
      map.set(key, []);
      order.push(key);
    }
    map.get(key).push(raw);
  }
  return order.map(k => ({ key: k, title: capitalize(k), items: map.get(k) }));
}
function firstWord(s){
  const m = s.trim().match(/^([\p{L}\p{N}]+)/u); // letters/digits until a space
  return m ? m[1] : s.trim().split(/\s+/)[0] || "";
}
function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

