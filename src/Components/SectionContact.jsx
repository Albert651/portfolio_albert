import React, { useState } from 'react';
import { Phone, Mail, MapPin, ChevronDown, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
        'Backend Development',
        'Frontend Development',
        'Autre'
    ];

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

    // Méthode 2: Utilisation d'une API backend
    const sendEmailWithBackend = async () => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'albertzaf12@gmail.com',
                    from: formData.email,
                    replyTo: formData.email,
                    subject: `Nouveau contact de ${formData.prenom} ${formData.nom} - ${formData.service}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #7C3AED;">Nouveau message de contact</h2>
                            
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="color: #333; margin-top: 0;">Informations du contact :</h3>
                                <p><strong>Nom :</strong> ${formData.nom}</p>
                                <p><strong>Prénom :</strong> ${formData.prenom}</p>
                                <p><strong>Email :</strong> ${formData.email}</p>
                                <p><strong>Téléphone :</strong> ${formData.telephone}</p>
                                <p><strong>Service demandé :</strong> ${formData.service}</p>
                            </div>
                            
                            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #7C3AED;">
                                <h3 style="color: #333; margin-top: 0;">Message :</h3>
                                <p style="line-height: 1.6;">${formData.message}</p>
                            </div>
                            
                            <div style="margin-top: 30px; padding: 15px; background-color: #e8f4ff; border-radius: 6px;">
                                <p style="margin: 0; color: #0066cc; font-size: 14px;">
                                    <strong>Note :</strong> Vous pouvez répondre directement à cet email. 
                                    La réponse sera envoyée à ${formData.email}
                                </p>
                            </div>
                        </div>
                    `
                })
            });

            if (response.ok) {
                return true;
            } else {
                console.error('Erreur lors de l\'envoi:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
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
            // Choisissez l'une des deux méthodes
            const success = await sendEmailWithEmailJS(); // ou sendEmailWithBackend()

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
        <section className="bg-gradient-to-br shadow-lg to-blue-900 text-white py-20 px-6 md:px-12 mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Section gauche - Formulaire */}
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                Unissons nos forces
                            </h1>
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
                        {/* Téléphone */}
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-600 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                                <p className="text-gray-300 text-lg">034 33 464 35</p>
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
                                    Antananarivo,<br />
                                    Madagascar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionContact;