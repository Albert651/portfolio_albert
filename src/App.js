import React from 'react';
<<<<<<< HEAD
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
>>>>>>> master
import './App.css';
import Header from './Components/Header';
import SectionPresentation from './Components/SectionPresentation';
import SectiondeTravail from './Components/SectiondeTravail';
import SectionRealisation from './Components/SectionRealisation';
import SectionCV from './Components/SectionCv';
import SectionCompetence from './Components/SectionCompetence';
import SectionContact from './Components/SectionContact';
<<<<<<< HEAD

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Chaque section doit avoir un ID correspondant aux boutons du header */}
      <section id="accueil">
        <SectionPresentation />
      </section>

      <section id="service">
        <SectiondeTravail />
      </section>

      <section id="realisation">
        <SectionRealisation />
      </section>

      <section id="cv">
        <SectionCV />
      </section>

      <section id="competences">
        <SectionCompetence />
      </section>

      <section id="contact">
        <SectionContact />
      </section>
=======
import AdminPanel from './Components/AdminPanel';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Affiche le header uniquement si on n'est pas sur /admin */}
      {location.pathname !== '/admin' && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="accueil">
                <SectionPresentation />
              </section>

              <section id="service">
                <SectiondeTravail />
              </section>

              <section id="realisation">
                <SectionRealisation />
              </section>

              <section id="cv">
                <SectionCV />
              </section>

              <section id="competences">
                <SectionCompetence />
              </section>

              <section id="contact">
                <SectionContact />
              </section>
            </>
          }
        />
        {/* ⚠️ cette ligne était en double, donc je l'ai supprimée */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
>>>>>>> master
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
>>>>>>> master
