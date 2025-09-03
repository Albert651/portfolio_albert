import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, Eye, Download, User, FileText, Image, BarChart, LogOut, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function AdminPanel() {
    const [profileData, setProfileData] = useState({
        name: '',
        title: '',
        description: '',
        profileImage: '',
        cv: '',
        stats: { experiences: 0, projects: 0 }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [previewCV, setPreviewCV] = useState('');
    const [saveStatus, setSaveStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Mot de passe admin (en production, utilisez une méthode plus sécurisée)
    const ADMIN_PASSWORD = 'admin123';
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            loadProfileData();
        }
    }, [isAuthenticated]);

    const loadProfileData = () => {
        try {
            setLoading(true);
            const savedData = localStorage.getItem('portfolioProfileData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setProfileData(data.profile);
                setPreviewImage(data.profile.profileImage);
                setPreviewCV(data.profile.cv);
                setSaveStatus('✅ Données existantes chargées');
            } else {
                // Données par défaut si aucune donnée sauvegardée
                const defaultData = {
                    name: 'Albert Zafimamandimby',
                    title: 'Développeur Full Stack',
                    description: 'En tant que développeur web passionné par les technologies innovantes, je m\'engage à concevoir des solutions performantes, sécurisées et de haute qualité.<br />Rigoureux et orienté résultats, je cherche à allier efficacité et impact positif au sein de chaque projet.<br />Toujours en veille technologique, je m\'adapte rapidement aux nouveaux défis pour apporter des solutions optimales.',
                    profileImage: '/Image/Profil2.png',
                    cv: '/cv/AlbertZafCV.pdf',
                    stats: { experiences: 3, projects: 6 }
                };
                setProfileData(defaultData);
                setPreviewImage(defaultData.profileImage);
                setPreviewCV(defaultData.cv);
                setSaveStatus('📝 Données par défaut chargées');
            }
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            setSaveStatus('❌ Erreur lors du chargement');
            setTimeout(() => setSaveStatus(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPassword('');
        } else {
            setSaveStatus('❌ Mot de passe incorrect');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Vérifier la taille du fichier (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setSaveStatus('❌ Image trop volumineuse (max 5MB)');
                setTimeout(() => setSaveStatus(''), 3000);
                return;
            }

            // Vérifier le type de fichier
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                setSaveStatus('❌ Format d\'image non supporté (JPG, PNG, WebP, GIF uniquement)');
                setTimeout(() => setSaveStatus(''), 3000);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                setPreviewImage(imageDataUrl);
                setProfileData(prev => ({
                    ...prev,
                    profileImage: imageDataUrl
                }));
                setSaveStatus('✅ Image uploadée avec succès');
                setTimeout(() => setSaveStatus(''), 3000);
            };
            reader.onerror = () => {
                setSaveStatus('❌ Erreur lors de la lecture de l\'image');
                setTimeout(() => setSaveStatus(''), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCVUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Vérifier le type de fichier
            if (file.type !== 'application/pdf') {
                setSaveStatus('❌ Veuillez sélectionner un fichier PDF uniquement');
                setTimeout(() => setSaveStatus(''), 3000);
                return;
            }

            // Vérifier la taille du fichier (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setSaveStatus('❌ CV trop volumineux (max 10MB)');
                setTimeout(() => setSaveStatus(''), 3000);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const cvDataUrl = e.target.result;
                setPreviewCV(cvDataUrl);
                setProfileData(prev => ({
                    ...prev,
                    cv: cvDataUrl
                }));
                setSaveStatus('✅ CV uploadé avec succès');
                setTimeout(() => setSaveStatus(''), 3000);
            };
            reader.onerror = () => {
                setSaveStatus('❌ Erreur lors de la lecture du CV');
                setTimeout(() => setSaveStatus(''), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: field.includes('experiences') || field.includes('projects') ? parseInt(value) || 0 : value
                }
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const saveProfileData = () => {
        try {
            setLoading(true);
            const dataToSave = {
                profile: {
                    ...profileData,
                    lastUpdated: new Date().toISOString()
                }
            };

            // Sauvegarder dans localStorage
            localStorage.setItem('portfolioProfileData', JSON.stringify(dataToSave));

            // Créer un fichier JSON téléchargeable
            const dataStr = JSON.stringify(dataToSave, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'profileData.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            setSaveStatus('✅ Données sauvegardées et fichier JSON téléchargé!');
            setTimeout(() => setSaveStatus(''), 5000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            setSaveStatus('❌ Erreur lors de la sauvegarde: ' + error.message);
            setTimeout(() => setSaveStatus(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const resetToDefault = () => {
        if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
            localStorage.removeItem('portfolioProfileData');
            loadProfileData();
            setSaveStatus('🔄 Données réinitialisées aux valeurs par défaut');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        setProfileData({
            name: '',
            title: '',
            description: '',
            profileImage: '',
            cv: '',
            stats: { experiences: 0, projects: 0 }
        });
        setPreviewImage('');
        setPreviewCV('');
        setSaveStatus('');
    };

    // Page de connexion
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full backdrop-blur-lg bg-opacity-95"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-700 to-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Panneau Admin
                        </h2>
                        <p className="text-gray-600">Portfolio Management System</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Mot de passe administrateur
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-lg"
                                placeholder="Entrez le mot de passe"
                                required
                            />
                        </div>

                        {saveStatus && (
                            <div className={`p-3 rounded-lg text-sm text-center ${saveStatus.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' :
                                    'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}>
                                {saveStatus}
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={!password.trim()}
                            className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-800 hover:to-blue-700 transition duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                            🔓 Se connecter
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            💡 Mot de passe par défaut : <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Interface d'administration
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold flex items-center gap-3">
                                    <User className="w-10 h-10" />
                                    Administration Portfolio
                                </h1>
                                <p className="mt-2 opacity-90 text-lg">Gérez votre profil, CV et contenu en temps réel</p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition duration-200"
                            >
                                <LogOut className="w-5 h-5" />
                                Déconnexion
                            </button>
                        </div>
                    </div>

                    {loading && (
                        <div className="bg-blue-50 border-b border-blue-200 p-4">
                            <div className="flex items-center gap-2 text-blue-700">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
                                Traitement en cours...
                            </div>
                        </div>
                    )}

                    <div className="p-8 grid lg:grid-cols-2 gap-10">
                        {/* Section Informations Personnelles */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                                <FileText className="w-6 h-6 text-purple-600" />
                                Informations Profil
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        👤 Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="Votre nom complet"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        💼 Titre professionnel
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="Ex: Développeur Full Stack"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        📝 Description professionnelle
                                    </label>
                                    <textarea
                                        value={profileData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-none"
                                        placeholder="Décrivez votre profil professionnel..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        💡 Utilisez &lt;br /&gt; pour les retours à la ligne
                                    </p>
                                </div>

                                {/* Section Statistiques */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-purple-600" />
                                        Statistiques Portfolio
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🏢 Expériences
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="50"
                                                value={profileData.stats.experiences}
                                                onChange={(e) => handleInputChange('stats.experiences', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🚀 Projets
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={profileData.stats.projects}
                                                onChange={(e) => handleInputChange('stats.projects', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Upload Fichiers */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                                <Upload className="w-6 h-6 text-blue-600" />
                                Gestion des Fichiers
                            </h2>

                            {/* Upload Image de Profil */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <Image className="w-5 h-5 inline mr-2 text-blue-600" />
                                    Photo de Profil
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer hover:bg-gray-50"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    📁 Formats supportés : JPG, PNG, WebP, GIF (max 5MB)
                                </p>

                                {previewImage && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Aperçu :</p>
                                        <div className="relative inline-block">
                                            <img
                                                src={previewImage}
                                                alt="Aperçu profil"
                                                className="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-white"
                                            />
                                            <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500 ring-opacity-50"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload CV */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <FileText className="w-5 h-5 inline mr-2 text-red-600" />
                                    Curriculum Vitae (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleCVUpload}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 cursor-pointer hover:bg-gray-50"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    📄 Format PDF uniquement (max 10MB)
                                </p>

                                {previewCV && (
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-700 flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            ✅ CV uploadé et prêt à être utilisé
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Status et Actions */}
                            {saveStatus && (
                                <div className={`p-4 rounded-lg border ${saveStatus.includes('❌') ? 'bg-red-50 text-red-700 border-red-200' :
                                        saveStatus.includes('✅') ? 'bg-green-50 text-green-700 border-green-200' :
                                            saveStatus.includes('🔄') ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}>
                                    <p className="font-medium">{saveStatus}</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={saveProfileData}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 font-semibold text-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <Save className="w-5 h-5" />
                                    )}
                                    Sauvegarder & Exporter
                                </button>

                                <button
                                    onClick={resetToDefault}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 font-semibold"
                                >
                                    🔄 Réinitialiser
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-600">
                                💾 Les données sont sauvegardées localement et exportées automatiquement
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Système actif
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default AdminPanel;