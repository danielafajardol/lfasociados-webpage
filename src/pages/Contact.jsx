// src/pages/Contact.jsx
import { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { FaPhone, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Contact(){
  const { t } = useI18n();
  const C = t?.contact ?? {};
  const contact = t?.info?.contactDetails ?? {};
  const socials = t?.links?.social ?? {};

  // inline submit (Formspree) with success panel
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e){
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // 🔁 REPLACE with your Formspree endpoint
      const endpoint = "https://formspree.io/f/mwkgyknn";
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(()=>null);
        setErrorMsg(body?.errors?.[0]?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Network error.");
    }
  }

  return (
    <div className="container">
      {/* Use the same heading style as other pages */}
      <header className="consulting-head">
        <h1>{C.title || "Contáctenos"}</h1>
        {C.intro ? <p className="consulting-intro">{C.intro}</p> : null}
        <p className="page-indicator">
          {t?.langCode === "es" ? "Escríbenos y te responderemos pronto." : "Write to us and we’ll get back to you shortly."}
        </p>
      </header>

      {/* Balanced two-column layout, consistent with other pages */}
      <section className="contact-grid">
        {/* LEFT: Contact form in a navy surface panel */}
        <article className="contact-panel">
          {status === "success" ? (
            <div className="contact-success">
              <h3>{t?.langCode === "es" ? "¡Mensaje enviado!" : "Message sent!"}</h3>
              <p>
                {t?.langCode === "es"
                  ? "Gracias por escribirnos. Te contactaremos muy pronto."
                  : "Thanks for your message. We’ll be in touch shortly."}
              </p>
            </div>
          ) : null}

          {status === "error" ? (
            <div className="contact-error">
              <h3>{t?.langCode === "es" ? "No se pudo enviar" : "Couldn’t send"}</h3>
              <p>{errorMsg}</p>
            </div>
          ) : null}

          <form className="contact-form-surface" onSubmit={onSubmit}>
            {/* ensure the destination is your firm email */}
            <input type="hidden" name="_to" value="info@lfalegal.com" />
            {/* Optional: subject prefix so emails are easy to spot */}
            <input type="hidden" name="_subject" value="LFA Legal - Contact Form" />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{C.name || "Nombre completo"}</label>
                <input type="text" id="name" name="name" required placeholder={t?.langCode === "es" ? "Tu nombre" : "Your name"} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{C.email || "Correo"}</label>
                <input type="email" id="email" name="_replyto" required placeholder="you@email.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">{C.subject || "Asunto"}</label>
              <input type="text" id="subject" name="subject" placeholder={t?.langCode === "es" ? "Tema de tu consulta" : "Topic"} />
            </div>

            <div className="form-group">
              <label htmlFor="message">{C.message || "Mensaje"}</label>
              <textarea id="message" name="message" rows="6" required placeholder={t?.langCode === "es" ? "Escribe tu mensaje..." : "Write your message..."} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={status === "submitting"}>
                {status === "submitting" ? (t?.langCode === "es" ? "Enviando..." : "Sending...") : (C.send || "Enviar")}
              </button>
              {/* direct email fallback */}
              <a className="btn-secondary link-like" href="mailto:info@lfalegal.com">
                {t?.langCode === "es" ? "Enviar por correo" : "Email directly"}
              </a>
            </div>
          </form>
        </article>

        {/* RIGHT: Direct contact & social, same navy surface style */}
        <article className="contact-panel">
          <div className="tile-body">
            <h3 style={{marginTop:0}}>{t?.info?.directContactTitle || (t?.langCode === "es" ? "Contacto directo" : "Direct Contact")}</h3>
            <ul className="contact-list">
              {contact?.phone && (
                <li><FaPhone aria-hidden="true" /> <a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
              )}
              <li><FaEnvelope aria-hidden="true" /> <a href="mailto:info@lfalegal.com">info@lfalegal.com</a></li>
              {socials?.instagram && (
                <li><FaInstagram aria-hidden="true" /> <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
              )}
              {socials?.linkedin && (
                <li><FaLinkedin aria-hidden="true" /> <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              )}
            </ul>

          </div>
        </article>
      </section>
    </div>
  );
}
