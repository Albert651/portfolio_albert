import React from 'react';
import './App.css';
import Header from './Components/Header';
import SectionPresentation from './Components/SectionPresentation';
import SectiondeTravail from './Components/SectiondeTravail';
import SectionRealisation from './Components/SectionRealisation';
import SectionCV from './Components/SectionCv';
import SectionCompetence from './Components/SectionCompetence';
import SectionContact from './Components/SectionContact';

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
    </div>
  );
}

export default App;