import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import AnimatedReveal from "../Components/AnimatedReveal";

function SectionRealisation() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Ajout d'images supplémentaires pour le carousel
    const projects = [
        {
            id: 1,
            title: "Gestion de vente produit",
            subtitle: "Page d'Accueil",
            image: "/Image/Vue1.png",
            // Ajout d'images pour le carousel
            additionalImages: [
                "/Image/Vue1.png",
                "/Image/Vue2.png",
                "/Image/Vue3.png",
            ],
            description: "Une application web de gestion des ventes qui permet de suivre les performances commerciales et les nouveaux clients. Le tableau de bord affiche les statistiques clés comme le total des ventes (12,540 €) et le nombre de nouveaux clients (432).",
            technologies: ["Vuejs", "Tailwind CSS", "Laravel11", "MySQL"],
            link: "#"
        },
        {
            id: 2,
            title: "Plateforme CRM, partie admin",
            subtitle: "Page de publication offre",
            image: "/Image/React5.png",
            // Ajout d'images pour le carousel
            additionalImages: [
                "/Image/React5.png",
                "/Image/React2.png",
                "/Image/React9.png",
            ],
            description: "Pour ce projet CRM, j’ai été en charge du développement de la partie administrateur. L’admin dispose d’une interface complète pour gérer les clients, les tâches, les prospections commerciales, les devis, les documents, ainsi que les interactions. Un module de rapports permet également d’analyser les statistiques des tâches et des campagnes de prospection",
            technologies: ["ReactJs", "Bootstrap5", "Laravel", "MySQL",],
            link: "https://relation-client.onrender.com/Accueil"
        },

        {
            id: 3,
            title: "Model acceuil fais en Vite+React",
            subtitle: "Page d'acceuil",
            image: "/Image/VReact.png",
            // Ajout d'images pour le carousel
            additionalImages: [
                "/Image/ViteReact2.png",
                "/Image/ViteReact3.png",
                "/Image/ViteReact4.png",
            ],
            description: "J’ai créé une maquette de page d’accueil pour aider une personne à démarrer un projet avec Vite et React.js. Ce projet m’a permis d’améliorer mes compétences en développement frontend",
            technologies: ["ReactJs", "Bootstrap5"],
            link: "https://model-aceuil-albert.onrender.com"
        },


        {
            id: 3,
            title: "Crud de gestion Materiel informatique",
            subtitle: "Page d'acceuil",
            image: "/Image/Node1.png",
            // Ajout d'images pour le carousel
            additionalImages: [
                "/Image/Node2.png",
                "/Image/Node3.png",
                "/Image/Node4.png",
            ],
            description: "Ce projet, réalisé dans le cadre de la fin de deuxième année d'études, est une application de gestion du matériel informatique. Il permet aux utilisateurs d’ajouter, modifier et supprimer différents types de matériel, notamment Matériel de base, Matériel LAN, Outils informatiques. L’application offre également la possibilité de gérer l’affectation de matériel aux différents dépôts(Dépôt A et Dépôt B).La durée de réalisation du projet: a été d'une semaine",
            technologies: ["Nodejs", "ReactJs", "Bootstrap4"],
            link: "https://gmat-ui.onrender.com/"
        },
    ];

    // Carousel component for the modal
    const ImageCarousel = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        // Auto-slide effect
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000); // Change slide every 3 seconds

            return () => clearInterval(interval);
        }, [images.length]);

        // Manual navigation
        const goToSlide = (index) => {
            setCurrentIndex(index);
        };

        return (
            <div className="relative w-full">
                {/* Carousel images */}
                <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Indicator dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    // Modal for project details
    const ProjectModal = ({ project, onClose }) => {
        if (!project) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-blue-400">{project.title}</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg mb-4" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">Description</h4>
                                <p className="text-gray-300">{project.description}</p>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel d'images */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold text-white mb-4">Galerie d'images</h4>
                                <ImageCarousel images={project.additionalImages || [project.image]} />
                            </div>

                            <div className="pt-6">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Voir le projet
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Project card component
    const ProjectCard = ({ project }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className="relative overflow-hidden rounded-lg group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full text-black-500 h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 w-full p-4 transform transition-all duration-500">
                    <h3 className="text-xl font-semibold mb-1 text-zinc-900 font-bold">{project.subtitle}</h3>
                    <p className="text-zinc-900 font-bold mb-4">{project.title}</p>

                    <button
                        onClick={() => setSelectedProject(project)}
                        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-500 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        Voir détails
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section className="py-16 bg-gradient-to-br from-black to-blue-900 text-white">
            <div className="container mx-auto px-4">
                <AnimatedReveal>
                    <h2 className="text-5xl font-bold text-blue-400 mb-4 text-center">Mes réalisations récentes</h2>
                </AnimatedReveal>
                <AnimatedReveal delay={0.2}>
                    <p className="text-xl text-center max-w-3xl mx-auto mb-12">
                        Vous pouvez consulter mes derniers projets démontrant mes compétences en développement d'applications web.
                    </p>
                </AnimatedReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedReveal key={project.id} delay={index * 0.2}>
                            <ProjectCard project={project} />
                        </AnimatedReveal>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
}

export default SectionRealisation;