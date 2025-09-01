import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();

  return (
    <nav>
      <ul>
        <li>{t("navbar.home")}</li>
        <li>{t("navbar.about")}</li>
        <li>{t("navbar.contact")}</li>
      </ul>

      {/* Language Switcher */}
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("es")}>ES</button>
    </nav>
  );
}

export default Navbar;
