import React, { useState, useEffect } from 'react';

function SectionCompetence () {
    const [animatedItems, setAnimatedItems] = useState([]);

    const competences = [
        "Backend : PHP, Laravel, Node.js",
        "Frontend : HTML5, CSS3, JavaScript, React.js, Vue.js, Angular, Bootstrap 5, Tailwind CSS",
        "Mobile : React Native, Flutter",
        "Bases de données : MySQL, SQL, PostgreSQL",
        "Modélisation & conception : UML, Merise"
    ];

    useEffect(() => {
        // Animation échelonnée des éléments
        competences.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => [...prev, index]);
            }, index * 200); // 200ms de délai entre chaque élément
        });
    }, []);

    return (
        <section className="bg-transparent shadow-lg to-blue-900 text-white py-20 px-6 md:px-12 mt-10">
            <div className="max-w-4xl mx-auto text-center">
                {/* Titre principal */}
                <h1 className="text-5xl font-bold text-white mb-8 animate-fadeIn">
                    Compétences
                </h1>

                {/* Description */}
                <p className="text-lg text-white mb-12 leading-relaxed max-w-3xl mx-auto opacity-90 animate-fadeIn">
                    Je maîtrise un large éventail de langages, frameworks et outils
                    pour le développement web et mobile, ainsi que pour la
                    modélisation de bases de données :
                </p>

                {/* Liste des compétences */}
                <div className="space-y-6">
                    {competences.map((competence, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-700 ease-out ${animatedItems.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full py-4 px-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-purple-500 cursor-pointer group">
                                <p className="text-white font-medium text-lg group-hover:text-opacity-100 text-opacity-95">
                                    {competence}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
};

export default SectionCompetence;