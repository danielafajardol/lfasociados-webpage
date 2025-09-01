// src/pages/Structuring.jsx
import { useI18n } from "../hooks/useI18n";
export default function Structuring(){
  const { t } = useI18n();
  return (
    <section className="section">
      <h2>{t.navbar.structuring}</h2>
      <p></p>
    </section>
  );
}
