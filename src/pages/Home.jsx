// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import LinkedInEmbed from "../components/LinkedInEmbed";
import HeroCarousel from "../components/HeroCarousel";

export default function Home(){
  const { t } = useI18n();

  const L = t.learn ?? {};
  const S = t.services ?? {};
  const I = t.info ?? {};

  // 👇 Use public URLs so no bundler import is required
  const slides = [
    { src: "/images/logo.png", alt: "Logo" },
    { src: "/images/im1.jpg", alt: "Image 1" },
    { src: "/images/im2.jpg", alt: "Image 2" },
    { src: "/images/im3.jpg", alt: "Image 3" },
  ];

  console.log("hero slides:", slides.map(s => s.src)); // sanity log

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

        {/* RIGHT PANEL: Auto-sliding images */}
        <div className="hero-panel" aria-hidden="false">
          <HeroCarousel images={slides} intervalMs={5000} height={360} />
        </div>
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
                : <div style={{
                    padding:"1rem",
                    border:"1px dashed rgba(255,255,255,.35)",
                    borderRadius:12,
                    color:"#e5e7eb"
                  }}>
                    Add a public LinkedIn post URL to <code>links.linkedinPostUrl</code>.
                  </div>}
            </div>
          </div>

          <div className="surface">
            <h3 style={{marginTop:0}}>{L.campaignsTitle}</h3>
            <p><strong style={{color:"#fff"}}>{L.campaignName}</strong></p>
            <p style={{marginTop:'.2rem', color:"#e5e7eb"}}>{L.campaignVideoCaption}</p>
            <div className="video-embed" style={{marginTop:'.6rem'}}>
              {t?.links?.campaignVideoUrl?.startsWith?.("http")
                ? <iframe
                    src={t.links.campaignVideoUrl}
                    title="Campaign video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                : <div style={{
                    padding:"1rem",
                    border:"1px dashed rgba(255,255,255,.35)",
                    borderRadius:12,
                    color:"#e5e7eb"
                  }}>
                    Add a YouTube embed URL to <code>links.campaignVideoUrl</code>.
                  </div>}
            </div>
            <p style={{marginTop:'.6rem'}}>
              <a className="btn-link" href={t?.links?.instagramUrl || "#"} target="_blank" rel="noreferrer" style={{color:"#fff", textDecoration:"underline"}}>
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
          <Link to="/consulting" className="service-card link-card" aria-label={S.consulting}>
            <h3>{S.consulting}</h3>
            <p></p>
          </Link>
          <Link to="/property" className="service-card link-card" aria-label={S.property}>
            <h3>{S.property}</h3>
            <p></p>
          </Link>
          <Link to="/structuring" className="service-card link-card" aria-label={S.structuring}>
            <h3>{S.structuring}</h3>
            <p></p>
          </Link>
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
            <p></p>
            <Link to="/contact" className="btn-primary">{I.contactButton}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
