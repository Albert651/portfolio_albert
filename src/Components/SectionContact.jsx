import React, { useState } from 'react';
import { Phone, Mail, MapPin, ChevronDown, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

function SectionContact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        service: '',
        message: ''
    });

    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const services = [
        'Développement Web',
        'Développement Mobile',
        'Autre'
    ];

    // Vos liens sociaux - Remplacez par vos vraies URLs
    const socialLinks = {
        linkedin: "https://www.linkedin.com/in/zaf-albert-3941162b5/", // Remplacez par votre URL LinkedIn
        whatsapp: "https://wa.me/261343346435", // Votre numéro WhatsApp au format international
        github: "https://github.com/Albert" // Remplacez par votre username GitHub
    };

    const handleSocialClick = (platform) => {
        window.open(socialLinks[platform], '_blank');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const { nom, prenom, email, telephone, service, message } = formData;

        if (!nom.trim() || !prenom.trim() || !email.trim() || !telephone.trim() || !service || !message.trim()) {
            alert('Veuillez remplir tous les champs obligatoires');
            return false;
        }

        // Validation basique de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide');
            return false;
        }

        return true;
    };

    // Configuration EmailJS - Remplacez par vos vraies valeurs
    const EMAILJS_CONFIG = {
        serviceID: 'service_gmail123',    // Ex: service_gmail123
        templateID: 'template_abc123',  // ⚠️ NOUVEAU Template ID créé
        publicKey: 'YTEBipvP5PXTjD6Gd'     // Ex: pk_123abc456def
    }

    // Initialiser EmailJS avec votre clé publique
    React.useEffect(() => {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }, []);

    // Méthode 1: Utilisation d'EmailJS (recommandée)
    const sendEmailWithEmailJS = async () => {
        try {
            const templateParams = {
                from_name: `${formData.prenom} ${formData.nom}`,
                from_email: formData.email,
                phone: formData.telephone,
                service: formData.service,
                message: formData.message,
                to_email: 'albertzaf12@gmail.com', // Ajout explicite (optionnel)
                reply_to: formData.email
            };

            console.log('Envoi en cours avec les paramètres:', templateParams);

            const result = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                templateParams
            );

            console.log('Email envoyé avec succès:', result);
            return true;
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            console.error('Détails de l\'erreur:', error.text || error.message);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const success = await sendEmailWithEmailJS();

            if (success) {
                setSubmitStatus('success');
                // Réinitialiser le formulaire
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    telephone: '',
                    service: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Masquer le message après 5 secondes
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <section className="bg-gradient-to-br from-gray-900 shadow-lg to-blue-900 text-white py-20 px-6 md:px-12 mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Section gauche - Formulaire */}
                    <div className="space-y-6">
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <h1 className="text-4xl font-bold text-white">
                                    Unissons nos forces
                                </h1>
                                {/* Indicateur de disponibilité avec animation */}
                            </div>
                            <p className="text-lg text-white leading-relaxed">
                                Je mets à profit mon expérience et je réalise mon travail avec passion afin que l'entreprise et mes collaborateurs puissent avoir confiance en moi.
                                Ainsi, je suis capable de collaborer,
                                d'apporter mon aide et de résoudre vos problèmes si vos besoins correspondent à mes compétences.🙏
                            </p>
                        </div>

                        {/* Messages de statut */}
                        {submitStatus === 'success' && (
                            <div className="bg-green-600 text-white p-4 rounded-lg flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5" />
                                <span>Message envoyé avec succès ! Nous vous répondrons bientôt.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="bg-red-600 text-white p-4 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5" />
                                <span>Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nom et Prénom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="nom"
                                        placeholder="Votre nom *"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="prenom"
                                        placeholder="Votre prénom *"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Email et Téléphone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        placeholder="Numéro téléphone *"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Service Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsServiceOpen(!isServiceOpen)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 flex items-center justify-between"
                                >
                                    <span className={formData.service ? 'text-white' : 'text-gray-400'}>
                                        {formData.service || 'Choisir un service *'}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isServiceOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isServiceOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                        {services.map((service, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, service });
                                                    setIsServiceOpen(false);
                                                }}
                                                className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Message *"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                                />
                            </div>

                            {/* Bouton Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Envoyer Le Message</span>
                                    </>
                                )}
                            </button>

                            <p className="text-sm text-gray-300">
                                * Champs obligatoires
                            </p>
                        </form>
                    </div>

                    {/* Section droite - Informations de contact */}
                    <div className="space-y-8 lg:pl-8">
                        {/* Section de disponibilité en haut */}
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75"></div>
                                    <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-50"></div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">Disponible maintenant</h3>
                                    <p className="text-green-400 text-sm">Réponse rapide garantie</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mt-3">
                                Je suis actuellement disponible pour de nouveaux projets et collaborations.
                            </p>
                        </div>

                        {/* Téléphone */}
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-600 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                                <p className="text-gray-300 text-lg">+261 34 33 464 35</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-600 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Email</h3>
                                <p className="text-gray-300 text-lg">albertzaf12@gmail.com</p>
                            </div>
                        </div>

                        {/* Adresse */}
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-600 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">67Ha</h3>
                                <p className="text-gray-300 text-lg">
                                    Antananarivo,
                                    Madagascar
                                </p>
                            </div>
                        </div>

                        {/* Réseaux Sociaux */}
                        <div className="mt-8 pt-8 border-t border-gray-600">
                            <h3 className="text-white font-semibold mb-6 text-xl">Suivez-moi</h3>
                            <div className="flex space-x-4">
                                {/* LinkedIn */}
                                <button
                                    onClick={() => handleSocialClick('linkedin')}
                                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                                    title="Visitez mon profil LinkedIn"
                                >
                                    <FaLinkedin className="w-6 h-6 text-white group-hover:text-blue-200" />
                                </button>

                                {/* WhatsApp */}
                                <button
                                    onClick={() => handleSocialClick('whatsapp')}
                                    className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                                    title="Contactez-moi sur WhatsApp"
                                >
                                    <FaWhatsapp className="w-6 h-6 text-white group-hover:text-green-200" />
                                </button>

                                {/* GitHub */}
                                <button
                                    onClick={() => handleSocialClick('github')}
                                    className="bg-gray-700 hover:bg-gray-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                                    title="Visitez mon profil GitHub"
                                >
                                    <FaGithub className="w-6 h-6 text-white group-hover:text-gray-300" />
                                </button>
                            </div>

                            {/* Indicateur de temps de réponse */}
                            <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm font-medium">Temps de réponse moyen: 2-4 heures</span>
                                </div>
                            </div>

                            {/* Texte d'encouragement */}
                            <p className="text-gray-300 text-sm mt-4">
                                N'hésitez pas à me contacter sur ces plateformes !
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionContact;
