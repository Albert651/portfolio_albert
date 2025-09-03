import React, { useState, useEffect } from 'react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil');

    // ✅ On garde une seule version
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Fonction pour faire défiler vers une section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80; // Hauteur du header fixe
            const elementPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
            });

            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };

    // Détecter la section active pendant le scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['accueil', 'service', 'realisation', 'cv', 'competences', 'contact'];
            const headerHeight = 100;
            const scrollPosition = window.scrollY + headerHeight;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (sectionId) => activeSection === sectionId;

    return (
        <header className="fixed w-full bg-gradient-to-r from-black via-indigo-900 to-black shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo + Email */}
                    <div className="flex items-center space-x-3">
                        <img src="/Image/logoEmail.png" alt="Logo email" className="w-12 h-8" />
                        <a href="mailto:albertzaf12@gmail.com" className="text-white font-bold text-xl">
                            albertzaf12@gmail.com
                        </a>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection('accueil')}
                                    className={`text-lg px-4 py-2 rounded-md font-medium transition duration-300 ${isActive('accueil')
                                            ? 'text-white bg-transparent shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    Accueil
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('service')}
                                    className={`text-lg px-4 py-2 rounded-md font-medium transition duration-300 ${isActive('service')
                                            ? 'text-white bg-transparent shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    Service
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('realisation')}
                                    className={`text-lg px-4 py-2 rounded-md font-medium transition duration-300 ${isActive('realisation')
                                            ? 'text-white bg-transparent shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    Réalisation
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('cv')}
                                    className={`text-lg px-4 py-2 rounded-md font-medium transition duration-300 ${isActive('cv')
                                            ? 'text-white bg-transparent shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    CV
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('competences')}
                                    className={`text-lg px-4 py-2 rounded-md font-medium transition duration-300 ${isActive('competences')
                                            ? 'text-white bg-transparent shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    Compétences
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Bouton Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            aria-label="Ouvrir le menu mobile"
                            className="bg-indigo-800 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Bouton Contact Desktop */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="font-bold text-lg bg-white text-indigo-800 hover:bg-indigo-100 px-6 py-2 rounded-md transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Contactez-moi
                        </button>
                    </div>
                </div>

                {/* Menu Mobile avec animation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button
                            onClick={() => scrollToSection('accueil')}
                            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActive('accueil')
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                }`}
                        >
                            Accueil
                        </button>
                        <button
                            onClick={() => scrollToSection('service')}
                            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActive('service')
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                }`}
                        >
                            Service
                        </button>
                        <button
                            onClick={() => scrollToSection('realisation')}
                            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActive('realisation')
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                }`}
                        >
                            Réalisation
                        </button>
                        <button
                            onClick={() => scrollToSection('cv')}
                            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActive('cv')
                                    ? 'text-white bg-transparent'
                                    : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                }`}
                        >
                            CV
                        </button>
                        <button
                            onClick={() => scrollToSection('competences')}
                            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isActive('competences')
                                    ? 'text-white bg-indigo-600'
                                    : 'text-gray-300 hover:text-white hover:bg-indigo-700'
                                }`}
                        >
                            Compétences
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="mt-3 w-full bg-white text-indigo-800 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                        >
                            Contactez-moi
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
