import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section className="section">
      <h2>Contáctenos</h2>
      <ContactForm labels={{
        name: "Nombre",
        email: "Correo",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar"
      }} />
    </section>
  );
}
