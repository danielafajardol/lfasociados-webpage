// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageProvider";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Consulting from "./pages/Consulting";
import Property from "./pages/Property";
import Structuring from "./pages/Structuring";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <TopBar />
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/property" element={<Property />} />
            <Route path="/structuring" element={<Structuring />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>
            {`© ${new Date().getFullYear()} Londoño Fajardo & Asociados. ${
              // Fallback footer from ES if you keep it there
              "Todos los derechos reservados."
            }`}
          </p>
        </footer>
      </BrowserRouter>
    </LanguageProvider>
  );
}
