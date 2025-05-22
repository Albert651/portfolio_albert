import React from 'react';
import AnimatedReveal from './AnimatedReveal';
function SectionCV() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Section Expériences */}
                    <div className="space-y-8">
                        
                        <h1 className="text-4xl font-bold text-white mb-12 text-center lg:text-left">
                            Expériences
                        </h1>
                        
                    <div className="space-y-6">
                        <AnimatedReveal>
                            {/* Expérience 1 */}
                            <div className="group cursor-pointer">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-blue-500 hover:to-purple-500">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold mb-2 opacity-90">
                                            2023-2025
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            DESIGN-PROG-IT
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Développeur Full-Stack
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </AnimatedReveal>
                            <AnimatedReveal>
                            {/* Expérience 2 */}
                            <div className="group cursor-pointer">
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-indigo-500 hover:to-blue-500">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold mb-2 opacity-90">
                                            2022-2023
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            PRINCEPT I-WEB
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Développeur web Backend
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </AnimatedReveal>
                            <AnimatedReveal>
                            {/* Expérience 3 */}
                            <div className="group cursor-pointer">
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-500 hover:to-indigo-500">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold mb-2 opacity-90">
                                            Aout-Novembre2021
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            PRINCEPT I-WEB
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Stage en Développement web
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </AnimatedReveal>
                        </div>
                    </div>

                    {/* Section Formation */}
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-white mb-12 text-center lg:text-left">
                            Formation
                        </h1>

                        <div className="space-y-6">
                            <AnimatedReveal>
                            {/* Formation 1 */}
                            <div className="group cursor-pointer">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-gray-700 hover:to-gray-800 border border-gray-700">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold mb-2 opacity-90">
                                            2023
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            LICENCE EN INFORMATIQUE
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Université de Fianarantsoa | École
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Nationale d'informatique
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </AnimatedReveal>
                            <AnimatedReveal>
                            {/* Formation 2 */}
                            <div className="group cursor-pointer">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-gray-700 hover:to-gray-800 border border-gray-700">
                                    <div className="text-white">
                                        <div className="text-lg font-semibold mb-2 opacity-90">
                                            2020
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            BACCALAUREAT
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Lycée privé CPE Toliara
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </AnimatedReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionCV;