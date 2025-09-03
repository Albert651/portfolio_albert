import React, { useState, useEffect } from 'react';

function SectionCompetence() {
    const [filtreNiveau, setFiltreNiveau] = useState("tous");
    const [animatedItems, setAnimatedItems] = useState([]);

    const competences = [
        { label: "Python", niveau: "debutant", domaine: "Backend", stars: 1 },
        { label: "Java", niveau: "debutant", domaine: "Backend", stars: 1 },
        { label: "Node.js", niveau: "intermediaire", domaine: "Backend", stars: 3 },
        { label: "React.js", niveau: "avance", domaine: "Frontend", stars: 4 },
        { label: "Vue.js", niveau: "intermediaire", domaine: "Frontend", stars: 3 },
        { label: "Tailwind CSS", niveau: "intermediaire", domaine: "Frontend", stars: 3 },
        { label: "Flutter", niveau: "intermediaire", domaine: "Mobile", stars: 3 },
        { label: "PostgreSQL", niveau: "avance", domaine: "Database", stars: 4 },
        { label: "UML", niveau: "intermediaire", domaine: "Modélisation", stars: 3 }
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
                {/* Titre */}
                <h1 className="text-5xl font-bold mb-8 animate-fadeIn">Compétences</h1>

                {/* Description */}
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
