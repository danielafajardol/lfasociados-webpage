// src/components/ContactForm.jsx
// If using EmailJS: uncomment lines and install emailjs-com
// import emailjs from "emailjs-com";
import { useState } from "react";

export default function ContactForm({ labels }){
  const [values, setValues] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState(null);

  const onChange = e => setValues(v => ({...v, [e.target.name]: e.target.value}));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // ---- EmailJS example (uncomment when ready) ----
      // await emailjs.send(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   {
      //     from_name: values.name,
      //     reply_to: values.email,
      //     subject: values.subject,
      //     message: values.message,
      //   },
      //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      // );
      // setStatus("ok");

      // Placeholder: fallback mailto if you don’t configure EmailJS:
      window.location.href = `mailto:info@yourfirm.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
      )}`;

    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit} style={{maxWidth:700}}>
      <div className="field">
        <label>{labels.name}</label>
        <input type="text" name="name" value={values.name} onChange={onChange} required />
      </div>
      <div className="field">
        <label>{labels.email}</label>
        <input type="email" name="email" value={values.email} onChange={onChange} required />
      </div>
      <div className="field">
        <label>{labels.subject}</label>
        <input type="text" name="subject" value={values.subject} onChange={onChange} required />
      </div>
      <div className="field">
        <label>{labels.message}</label>
        <textarea name="message" rows="6" value={values.message} onChange={onChange} required />
      </div>
      <button className="btn-primary" type="submit">{labels.send}</button>
      {status === "ok" && <p style={{color:"green", marginTop:'.6rem'}}>✓ Sent successfully</p>}
      {status === "error" && <p style={{color:"crimson", marginTop:'.6rem'}}>Something went wrong. Please try again.</p>}

      <style jsx>{`
        .field{ display:flex; flex-direction:column; gap:.4rem; margin-bottom:1rem; }
        input, textarea{
          padding:.7rem .8rem; border:1px solid var(--grey-200); border-radius:10px; font:inherit;
        }
        input:focus, textarea:focus{ outline:none; border-color: var(--accent); box-shadow:0 0 0 3px rgba(31,111,235,.12); }
      `}</style>
    </form>
  );
}
