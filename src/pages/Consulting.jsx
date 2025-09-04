// src/pages/Consulting.jsx
import { useI18n } from "../hooks/useI18n";

export default function Consulting(){
  const { t } = useI18n();
  const P = t?.consultingPage ?? {};
  const items = P?.items ?? [];

  console.log("consultingPage:", P, "items:", (P.items || []).length);


  return (
    <div className="container">
      <header className="consulting-head">
        <h1>{P?.title || t?.services?.consulting || "Consultoría Legal"}</h1>
        <p className="consulting-intro">{P?.intro || ""}</p>
      </header>

      <section className="consulting-grid">
        {items.map(({ key, title, details }) => (
          <article key={key} className="consult-card" tabIndex={0} aria-label={title}>
            <h3 className="consult-title">{title}</h3>
            <div className="consult-details">
              <p>{details}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
