import React, { useState, useEffect } from 'react';
import {
  FaPython, FaJava, FaWordpress, FaMagento, FaPhp, FaLaravel, FaReact,
  FaAngular, FaProjectDiagram, FaVuejs, FaHtml5, FaBootstrap
} from 'react-icons/fa';
import {
  SiFlutter, SiNextdotjs, SiMongodb, SiSymfony, SiTailwindcss
} from 'react-icons/si';

function SectionCompetence() {
  const [filtreNiveau, setFiltreNiveau] = useState("tous");
  const [animatedItems, setAnimatedItems] = useState([]);

  const competences = [
    // Débutant
    { label: "Python", niveau: "debutant", domaine: "Backend", stars: 1, icon: <FaPython /> },
    { label: "WordPress", niveau: "debutant", domaine: "CMS", stars: 1, icon: <FaWordpress /> },
    { label: "Magento", niveau: "debutant", domaine: "CMS", stars: 1, icon: <FaMagento /> },
    
    // Intermédiaire
    { label: "Flutter", niveau: "intermediaire", domaine: "Mobile", stars: 3, icon: <SiFlutter /> },
    { label: "Java", niveau: "debutant", domaine: "Backend", stars: 1, icon: <FaJava /> },
    { label: "Angular", niveau: "intermediaire", domaine: "Frontend", stars: 3, icon: <FaAngular /> },
    { label: "Next.js", niveau: "intermediaire", domaine: "Frontend", stars: 3, icon: <SiNextdotjs /> },
    { label: "React Native", niveau: "intermediaire", domaine: "Mobile", stars: 3, icon: <FaReact /> },
    { label: "UML", niveau: "intermediaire", domaine: "Modélisation", stars: 3, icon: <FaProjectDiagram /> },
    { label: "MongoDB", niveau: "intermediaire", domaine: "Database", stars: 3, icon: <SiMongodb /> },

    // Avancé
    { label: "PHP", niveau: "avance", domaine: "Backend", stars: 5, icon: <FaPhp /> },
    { label: "Laravel", niveau: "avance", domaine: "Backend", stars: 5, icon: <FaLaravel /> },
    { label: "Symfony", niveau: "avance", domaine: "Backend", stars: 5, icon: <SiSymfony /> },
    { label: "ReactJS", niveau: "avance", domaine: "Frontend", stars: 5, icon: <FaReact /> },
    { label: "VueJS", niveau: "avance", domaine: "Frontend", stars: 5, icon: <FaVuejs /> },
    { label: "HTML & CSS", niveau: "avance", domaine: "Frontend", stars: 5, icon: <FaHtml5 /> },
    { label: "Tailwind CSS", niveau: "avance", domaine: "Frontend", stars: 5, icon: <SiTailwindcss /> },
    { label: "Bootstrap", niveau: "avance", domaine: "Frontend", stars: 5, icon: <FaBootstrap /> }
  ];

  useEffect(() => {
    competences.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedItems(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <section className="bg-transparent text-white py-20 px-6 md:px-12 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8 animate-fadeIn">Compétences</h1>
        <p className="text-lg mb-12 leading-relaxed max-w-3xl mx-auto opacity-90 animate-fadeIn">
          Explorez mes compétences selon leur niveau de maîtrise :
        </p>

        {/* Filtres */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {["tous", "debutant", "intermediaire", "avance"].map(niveau => (
            <button
              key={niveau}
              onClick={() => setFiltreNiveau(niveau)}
              className={`px-4 py-2 rounded-full font-semibold transition ${filtreNiveau === niveau
                ? "bg-purple-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
            >
              {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
            </button>
          ))}
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {competences
            .filter(c => filtreNiveau === "tous" || c.niveau === filtreNiveau)
            .map((competence, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg transform transition duration-500 hover:scale-105 ${animatedItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 text-white flex justify-center items-center">
                  {competence.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{competence.label}</h3>
                <div className="text-yellow-400 text-lg">
                  {"★".repeat(competence.stars)}{"☆".repeat(5 - competence.stars)}
                </div>
                <p className="text-white text-sm mt-2 opacity-80 capitalize">{competence.niveau}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default SectionCompetence;
