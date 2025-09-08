// // src/pages/Home.jsx
// import { Link } from "react-router-dom";
// import { useI18n } from "../hooks/useI18n";
// import LinkedInEmbed from "../components/LinkedInEmbed";
// import HeroCarousel from "../components/HeroCarousel";

// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import SocialEmbed from "../components/LinkedInEmbed";
import HeroCarousel from "../components/HeroCarousel";
import { FaPhone, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home(){
  const { t } = useI18n();

  const L = t.learn ?? {};
  const S = t.services ?? {};
  const I = t.info ?? {};
  const contact = I?.contactDetails ?? {};
  const socials = t?.links?.social ?? {};

  const slides = [
    { src: "/images/logo.png", alt: "Logo" },
    { src: "/images/im1.jpg", alt: "Image 1" },
    { src: "/images/im2.jpg", alt: "Image 2" },
    { src: "/images/im3.jpg", alt: "Image 3" },
    
  ];

  const serviceCards = [
    { key: "consulting", title: S.consulting, to: "/consulting" },
    { key: "property",   title: S.property,   to: "/property" },
    { key: "structuring",title: S.structuring,to: "/structuring" },
  ];

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
        <div className="hero-panel" aria-hidden="false">
          <HeroCarousel images={slides} intervalMs={5000} height={360} />
        </div>
      </section>

      {/* LEARN */}
      <section className="section">
        <div className="section-head">
          <h2>{L.title}</h2>
          <p>{/* optional subcopy */}</p>
        </div>

        <div className="grid-2">
          <div className="surface">
            <h3 style={{marginTop:0}}>{L.linkedinTitle}</h3>
            <div className="linkedin-embed">
              <SocialEmbed url={t?.links?.linkedinPostUrl} height={480} />
            </div>
          </div>

          <div className="surface">
            <h3 style={{marginTop:0}}>{L.campaignsTitle}</h3>
            <p><strong style={{color:"#fff"}}>{L.campaignName}</strong></p>
            <p style={{marginTop:'.2rem', color:"#e5e7eb"}}>{L.campaignVideoCaption}</p>
            <div className="video-embed" style={{marginTop:'.6rem'}}>
              <SocialEmbed url={t?.links?.campaignVideoUrl} height={480} />
            </div>
            <p style={{marginTop:'.6rem'}}>
              <a className="btn-link" href={t?.links?.instagramUrl || "#"} target="_blank" rel="noreferrer" style={{color:"#fff", textDecoration:"underline"}}>
                {L.campaignLearnMore}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES — big centered titles; hover reveals Learn more */}
      <section className="section">
        <div className="section-head">
          <h2>{S.title}</h2>
          <p>{/* optional subtitle via locales */}</p>
        </div>

        <div className="services-tiles">
          {serviceCards.map(({ key, title, to }) => (
            <div className="service-tile" key={key}>
              <h3 className="service-tile-title">{title}</h3>
              <div className="service-overlay">
                <Link to={to} className="btn-primary">{t?.learnMoreBtn || "Learn more"}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFORMATION & CONTACT — 3 wider tiles */}
      <section className="section">
        <div className="section-head">
          <h2>{I.title}</h2>
          <p>{/* optional subtitle */}</p>
        </div>

        <div className="info-tiles">
          {/* Tile 1: Partnerships */}
          <div className="info-tile">
            <div className="tile-body">
              <h3 style={{marginTop:0}}>{I.partnershipsTitle}</h3>
              <ul className="flush-list">
                {(I?.regions || []).map((r)=> <li key={r}>{r}</li>)}
              </ul>
            </div>
          </div>

          {/* Tile 2: Inquiries / Booking CTA with spaced button */}
          <div className="info-tile">
            <div className="tile-body">
              <h3 style={{marginTop:0}}>{I.inquiriesTitle}</h3>
              <p className="booking-cta">{I.bookingCta}</p>
              <div className="cta-spacer" />
              <Link to="/contact" className="btn-primary">{I.contactButton}</Link>
            </div>
          </div>

          {/* Tile 3: Direct contact details */}
          <div className="info-tile">
            <div className="tile-body">
              <h3 style={{marginTop:0}}>{I.directContactTitle}</h3>
              <ul className="contact-list">
                {contact?.phone && (
                  <li>
                    <FaPhone aria-hidden="true" /> <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </li>
                )}
                {contact?.email && (
                  <li>
                    <FaEnvelope aria-hidden="true" /> <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                )}
                {socials?.instagram && (
                  <li>
                    <FaInstagram aria-hidden="true" /> <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
                  </li>
                )}
                {socials?.linkedin && (
                  <li>
                    <FaLinkedin aria-hidden="true" /> <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
