// src/components/NavBar.jsx
import { NavLink, Link } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import logo from "../assets/logo.png";

export default function NavBar(){
  const { t } = useI18n();
  const nav = t.navbar;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="brand" aria-label="Home">
          <img src={logo} alt="Londoño Fajardo & Asociados" />
          <span className="title">Londoño Fajardo & Asociados</span>
        </Link>
        <div className="navlinks">
          <NavLink to="/">{({isActive})=> <span className={isActive ? "active":""}>{nav.home}</span>}</NavLink>
          <NavLink to="/about">{({isActive})=> <span className={isActive ? "active":""}>{nav.about}</span>}</NavLink>
          <NavLink to="/consulting">{({isActive})=> <span className={isActive ? "active":""}>{nav.consulting}</span>}</NavLink>
          <NavLink to="/property">{({isActive})=> <span className={isActive ? "active":""}>{nav.property}</span>}</NavLink>
          <NavLink to="/structuring">{({isActive})=> <span className={isActive ? "active":""}>{nav.structuring}</span>}</NavLink>
          <NavLink to="/contact">{({isActive})=> <span className={isActive ? "active":""}>{nav.contact}</span>}</NavLink>
        </div>
      </div>
    </nav>
  );
}
