// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import LinkedInEmbed from "../components/LinkedInEmbed";

export default function Home(){
  const { t } = useI18n();

  console.log("t object:", t);
  
  const L = t.learn;
  const S = t.services;
  const I = t.info;

  return (
    <div>
      {/* HERO */}
      <section className="home-hero">
        <div>
          <span className="kicker">{t?.navbar?.about || "Nuestra Firma"}</span>
          <h1>{t?.hero?.slogan}</h1>
          <p>{t?.hero?.intro}</p>
          <div className="actions">
            <Link to="/about" className="btn-primary">{t?.hero?.learnMore}</Link>
            <Link to="/contact" className="btn-secondary">{t?.info?.contactButton}</Link>
          </div>
        </div>
        <div className="hero-panel" aria-hidden="true" />
      </section>

      {/* LEARN */}
      <section className="section">
        <div className="section-head">
          <h2>{L.title}</h2>
          <p>{/* Optional one-line explainer from locales later */}</p>
        </div>

        <div className="grid-2">
          <div className="surface">
            <h3 style={{marginTop:0}}>{L.linkedinTitle}</h3>
            <div className="linkedin-embed">
              {t?.links?.linkedinPostUrl
                ? <LinkedInEmbed postUrl={t.links.linkedinPostUrl} />
                : <div style={{padding:"1rem", border:"1px dashed #e5e7eb", borderRadius:12}}>
                    Add a public LinkedIn post URL to <code>links.linkedinPostUrl</code>.
                  </div>}
            </div>
          </div>

          <div className="surface">
            <h3 style={{marginTop:0}}>{L.campaignsTitle}</h3>
            <p><strong>{L.campaignName}</strong></p>
            <p style={{marginTop:'.2rem'}}>{L.campaignVideoCaption}</p>
            <div className="video-embed" style={{marginTop:'.6rem'}}>
              {t?.links?.campaignVideoUrl?.startsWith("http")
                ? <iframe
                    src={t.links.campaignVideoUrl}
                    title="Campaign video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                : <div style={{padding:"1rem", border:"1px dashed #e5e7eb", borderRadius:12}}>
                    Add a YouTube embed URL to <code>links.campaignVideoUrl</code>.
                  </div>}
            </div>
            <p style={{marginTop:'.6rem'}}>
              <a className="btn-link" href={t?.links?.instagramUrl || "#"} target="_blank" rel="noreferrer">
                {L.campaignLearnMore}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="section-head">
          <h2>{S.title}</h2>
          <p>{/* Optional subtitle via locales */}</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <h3>{S.consulting}</h3>
            <p style={{color:"var(--muted)"}}>{/* teaser text later from locales */}</p>
            <Link className="btn-link" to="/consulting">→</Link>
          </div>
          <div className="service-card">
            <h3>{S.property}</h3>
            <p style={{color:"var(--muted)"}}></p>
            <Link className="btn-link" to="/property">→</Link>
          </div>
          <div className="service-card">
            <h3>{S.structuring}</h3>
            <p style={{color:"var(--muted)"}}></p>
            <Link className="btn-link" to="/structuring">→</Link>
          </div>
        </div>
      </section>

      {/* INFO & CONTACT */}
      <section className="section">
        <div className="section-head">
          <h2>{I.title}</h2>
          <p>{/* Optional subtitle */}</p>
        </div>

        <div className="info-grid">
          <div className="surface partnerships">
            <h3 style={{marginTop:0}}>{I.partnershipsTitle}</h3>
            <ul>
              {(I?.regions || []).map((r)=> <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="surface">
            <h3 style={{marginTop:0}}>{I.inquiriesTitle}</h3>
            <p style={{color:"var(--muted)"}}>{/* short line about response times, etc. */}</p>
            <Link to="/contact" className="btn-primary">{I.contactButton}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
