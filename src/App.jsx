// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useI18n } from "./hooks/useI18n";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Consulting from "./pages/Consulting";
import Property from "./pages/Property";
import Structuring from "./pages/Structuring";
import Contact from "./pages/Contact";
import "./App.css";

// Child shell that sits *inside* the LanguageProvider
function AppShell() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  // Safely read footer text from locales and replace {{year}}
  const rightsTemplate =
    t?.footer?.rights ??
    `© {{year}} Londoño Fajardo & Asociados. Todos los derechos reservados.`;
  const rightsText = rightsTemplate.replace(/\{\{\s*year\s*\}\}/g, year);

  return (
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
        <p>{rightsText}</p>
      </footer>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}


// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
// import { LanguageProvider } from "./i18n/LanguageProvider";
// import TopBar from "./components/TopBar";
// import NavBar from "./components/NavBar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Consulting from "./pages/Consulting";
// import Property from "./pages/Property";
// import Structuring from "./pages/Structuring";
// import Contact from "./pages/Contact";
// import "./App.css";

// export default function App() {
//   return (
//     <LanguageProvider>
//       <BrowserRouter>
//         <TopBar />
//         <NavBar />
//         <main className="container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/consulting" element={<Consulting />} />
//             <Route path="/property" element={<Property />} />
//             <Route path="/structuring" element={<Structuring />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//         <footer className="footer">
//           <p>
//             {`© ${new Date().getFullYear()} Londoño Fajardo & Asociados. ${
//               // Fallback footer from ES if you keep it there
//               "Todos los derechos reservados."
//             }`}
//           </p>
//         </footer>
//       </BrowserRouter>
//     </LanguageProvider>
//   );
// }

// export default function App() {
//   console.log("render: App");
//   return (
//     <div style={{
//       padding: "40px",
//       background: "#e0ffe0",
//       border: "2px solid #0a0",
//       fontSize: "20px"
//     }}>
//       It works ✅ — If you can see this, Vite + React are fine.
//     </div>
//   );
// }

// export default function App() {
//   return <div style={{padding: 40}}>It works ✅</div>;
// }

