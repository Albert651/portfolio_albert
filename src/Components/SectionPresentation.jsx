import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Eye } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedReveal from "../Components/AnimatedReveal";

function SectionPresentation() {
    const [showCVModal, setShowCVModal] = useState(false);
    const [cvError, setCvError] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Albert Zafimamandimby',
        title: 'Développeur Full Stack',
        description: 'En tant que développeur web passionné par les technologies innovantes, je m\'engage à concevoir des solutions performantes, sécurisées et de haute qualité.<br />Rigoureux et orienté résultats, je cherche à allier efficacité et impact positif au sein de chaque projet.<br />Toujours en veille technologique, je m\'adapte rapidement aux nouveaux défis pour apporter des solutions optimales.',
        profileImage: '/Image/Profil2.png',
        cv: '/cv/AlbertZafCV.pdf',
        stats: { experiences: 3, projects: 6 }
    });

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = () => {
        try {
            // Essayer de charger depuis localStorage (données admin)
            const savedData = localStorage.getItem('portfolioProfileData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setProfileData(data.profile);
                return;
            }

            // Fallback: essayer de charger depuis un fichier JSON public
            fetch(process.env.PUBLIC_URL + '/data/profileData.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fichier JSON non trouvé');
                    }
                    return response.json();
                })
                .then(data => {
                    setProfileData(data.profile);
                })
                .catch(error => {
                    console.log('Utilisation des données par défaut:', error);
                    // Les données par défaut sont déjà dans le state initial
                });
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    const handleCVClick = (e) => {
        e.preventDefault();
        setShowCVModal(true);
        setCvError(false);
    };

    const handleDownload = () => {
        try {
            if (profileData.cv.startsWith('data:')) {
                // CV en base64 (uploadé via admin)
                const link = document.createElement('a');
                link.href = profileData.cv;
                link.download = `${profileData.name.replace(/\s+/g, '')}_CV.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // CV classique (fichier)
                fetch(profileData.cv)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('CV non trouvé');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${profileData.name.replace(/\s+/g, '')}_CV.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(error => {
                        console.error('Erreur de téléchargement:', error);
                        // Fallback
                        const link = document.createElement('a');
                        link.href = profileData.cv;
                        link.download = `${profileData.name.replace(/\s+/g, '')}_CV.pdf`;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleIframeLoad = () => {
        setCvError(false);
    };

    const handleIframeError = () => {
        setCvError(true);
        console.error('Impossible de charger le CV depuis:', profileData.cv);
    };

    const closeCVModal = () => {
        setShowCVModal(false);
    };

    // Fonction pour convertir les <br /> en retours à la ligne pour le rendu
    const renderDescription = (description) => {
        return description.split('<br />').map((line, index) => (
            <span key={index}>
                {line}
                {index < description.split('<br />').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <>
            <section className="bg-transparent shadow-lg to-blue-900 text-white py-20 px-6 md:px-12 mt-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <AnimatedReveal>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                {profileData.name.split(' ').map((name, index) => (
                                    <span key={index}>
                                        {name}
                                        {index === 0 && <br />}
                                        {index > 0 && index < profileData.name.split(' ').length - 1 && ' '}
                                    </span>
                                ))}
                            </h1>
                        </AnimatedReveal>
                        <AnimatedReveal>
                            <h2 className="text-2xl font-semibold text-white">{profileData.title}</h2>
                            <p className="text-lg leading-relaxed font-medium">
                                {renderDescription(profileData.description)}
                            </p>
                        </AnimatedReveal>
                        <AnimatedReveal delay={0.2}>
                            <button
                                onClick={handleCVClick}
                                className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-800 hover:to-blue-600 shadow-lg transition duration-300 transform hover:scale-105"
                            >
                                <Eye className="w-5 h-5" />
                                Voir et Télécharger CV
                            </button>

                        </AnimatedReveal>
                    </div>

                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.img
                            src={profileData.profileImage}
                            alt={profileData.name}
                            className="rounded-[30px] shadow-lg w-full max-w-md mx-auto"
                            whileHover={{
                                scale: 1.05,
                                rotate: 1,
                                transition: { duration: 0.3 },
                            }}
                            onError={(e) => {
                                // Fallback vers l'image par défaut en cas d'erreur
                                e.target.src = '/Image/Profil2.png';
                            }}
                        />
                    </motion.div>
                </div>

                {/* Section des stats */}
                <div className="mt-16 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-20 text-center">
                    <div>
                        <AnimatedCounter to={profileData.stats.experiences} />
                        <p className="text-2xl md:text-3xl font-semibold">Expériences<br />Professionnelles</p>
                    </div>
                    <div>
                        <AnimatedCounter to={profileData.stats.projects} />
                        <p className="text-2xl md:text-3xl font-semibold">Projets<br />complétés</p>
                    </div>
                </div>
            </section>

            {/* Modal d'aperçu du CV */}
            {showCVModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeCVModal}
                >
                    <motion.div
                        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header du modal */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-700 to-blue-500">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Aperçu du CV - {profileData.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger
                                </button>
                                <button
                                    onClick={closeCVModal}
                                    className="text-white hover:text-gray-300 transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Contenu du CV */}
                        <div className="h-[calc(90vh-80px)] overflow-auto">
                            {!cvError ? (
                                <iframe
                                    src={profileData.cv}
                                    className="w-full h-full"
                                    title={`CV ${profileData.name}`}
                                    style={{ minHeight: '600px' }}
                                    onLoad={handleIframeLoad}
                                    onError={handleIframeError}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-600">
                                    <div className="text-center p-8">
                                        <div className="text-6xl mb-4">📄</div>
                                        <h3 className="text-xl font-semibold mb-2">Aperçu non disponible</h3>
                                        <p className="mb-4">Le CV ne peut pas être affiché dans le navigateur.</p>
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-800 hover:to-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 mx-auto"
                                        >
                                            <Download className="w-5 h-5" />
                                            Télécharger le CV
                                        </button>
                                        <p className="text-sm mt-4 text-gray-500">
                                            Chemin testé: {profileData.cv}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer avec actions */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Cliquez sur "Télécharger" pour sauvegarder le CV sur votre appareil
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-800 hover:to-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger CV
                                </button>
                                <button
                                    onClick={closeCVModal}
                                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

export default SectionPresentation;
