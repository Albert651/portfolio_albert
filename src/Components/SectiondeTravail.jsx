import { useState } from 'react';

export default function MethodeDeTravail() {
    // États pour gérer les rotations des cartes
    const [conseilRotation, setConseilRotation] = useState(false);
    const [conceptionRotation, setConceptionRotation] = useState(false);
    const [developpementRotation, setDeveloppementRotation] = useState(false);

    return (
        <div className="shadow-lg min-h-screen p-8 flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#021A2C' }}>
            <h1 className="text-4xl font-bold mb-2 text-center">Méthode de travail</h1>
            <p className="text-lg mb-12 text-center max-w-3xl font-medium">
                Toujours à l'écoute des utilisateurs, capable de communiquer et
                de collaborer efficacement avec l'équipe de l'entreprise
            </p>

            <div className="flex flex-wrap justify-center gap-12 w-full max-w-6xl">
                {/* Première colonne */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-64 h-64 perspective-1000">
                        <div
                            className={`relative w-full h-full rounded-3xl shadow-lg cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${conseilRotation ? 'rotate-y-180' : ''}`}
                            onMouseEnter={() => setConseilRotation(true)}
                            onMouseLeave={() => setConseilRotation(false)}
                        >
                            {/* Face avant (1) */}
                            <div className="absolute w-full h-full bg-blue-890 rounded-3xl flex items-center justify-center backface-hidden">
                                <span className="font-bold text-2xl">Conseil</span>
                            </div>

                            {/* Face arrière (2) */}
                            <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 to-indigo-900 shadow-lg rounded-3xl flex items-center justify-center backface-hidden rotate-y-180 p-6">
                                <span className="font-bold text-lg text-center">Étude de besoins, étude de solution, architecture technique et fonctionnelle</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deuxième colonne */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-64 h-64 perspective-1000">
                        <div
                            className={`relative w-full h-full rounded-3xl shadow-lg cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${conceptionRotation ? 'rotate-y-180' : ''}`}
                            onMouseEnter={() => setConceptionRotation(true)}
                            onMouseLeave={() => setConceptionRotation(false)}
                        >
                            {/* Face avant (1) */}
                            <div className="absolute w-full h-full bg-blue-890 rounded-3xl flex items-center justify-center backface-hidden">
                                <span className="font-bold text-2xl">Conception</span>
                            </div>

                            {/* Face arrière (2) */}
                            <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 to-indigo-900 shadow-lg rounded-3xl flex items-center justify-center backface-hidden rotate-y-180 p-6">
                                <span className="font-bold text-lg text-center">Interface et contenu simplifié, configuration sur-mesure</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Troisième colonne */}
                <div className="flex flex-col items-center gap-6">
                    <div className="w-64 h-64 perspective-1000">
                        <div
                            className={`relative w-full h-full rounded-3xl shadow-lg cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${developpementRotation ? 'rotate-y-180' : ''}`}
                            onMouseEnter={() => setDeveloppementRotation(true)}
                            onMouseLeave={() => setDeveloppementRotation(false)}
                        >
                            {/* Face avant (1) */}
                            <div className="absolute w-full h-full bg-blue-890 rounded-3xl flex items-center justify-center backface-hidden">
                                <span className="font-bold text-2xl">Développement</span>
                            </div>

                            {/* Face arrière (2) */}
                            <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 to-indigo-900 shadow-lg rounded-3xl flex items-center justify-center backface-hidden rotate-y-180 p-6">
                                <span className="font-bold text-lg text-center">Évolution en fonction de vos besoins</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </div>
    );
}