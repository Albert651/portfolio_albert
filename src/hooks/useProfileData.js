import { useState, useEffect } from 'react';

// Données par défaut
const defaultProfileData = {
    name: 'Albert Zafimamandimby',
    title: 'Développeur Full Stack',
    description: 'En tant que développeur web passionné par les technologies innovantes, je m\'engage à concevoir des solutions performantes, sécurisées et de haute qualité.<br />Rigoureux et orienté résultats, je cherche à allier efficacité et impact positif au sein de chaque projet.<br />Toujours en veille technologique, je m\'adapte rapidement aux nouveaux défis pour apporter des solutions optimales.',
    profileImage: '/Image/Profil2.png',
    cv: '/cv/AlbertZafCV.pdf',
    stats: { experiences: 3, projects: 6 },
    lastUpdated: null
};

/**
 * Hook personnalisé pour gérer les données du profil
 * Priorité : localStorage (admin) > fichier JSON > données par défaut
 */
export const useProfileData = () => {
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Essayer localStorage (données admin)
            const savedData = localStorage.getItem('portfolioProfileData');
            if (savedData) {
                const data = JSON.parse(savedData);
                setProfileData(data.profile);
                console.log('✅ Données chargées depuis localStorage (admin)');
                return;
            }

            // 2. Essayer le fichier JSON public
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/data/profileData.json');
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data.profile);
                    console.log('✅ Données chargées depuis profileData.json');
                    return;
                }
            } catch (jsonError) {
                console.log('⚠️ Fichier JSON non trouvé, utilisation des données par défaut');
            }

            // 3. Utiliser les données par défaut
            setProfileData(defaultProfileData);
            console.log('✅ Données par défaut utilisées');

        } catch (err) {
            console.error('❌ Erreur lors du chargement des données:', err);
            setError(err.message);
            setProfileData(defaultProfileData);
        } finally {
            setLoading(false);
        }
    };

    const saveProfileData = (newData) => {
        try {
            const dataToSave = {
                profile: {
                    ...newData,
                    lastUpdated: new Date().toISOString()
                }
            };

            localStorage.setItem('portfolioProfileData', JSON.stringify(dataToSave));
            setProfileData(dataToSave.profile);

            console.log('✅ Données sauvegardées dans localStorage');
            return true;
        } catch (err) {
            console.error('❌ Erreur lors de la sauvegarde:', err);
            setError(err.message);
            return false;
        }
    };

    const exportProfileData = () => {
        try {
            const dataToExport = {
                profile: {
                    ...profileData,
                    lastUpdated: new Date().toISOString()
                }
            };

            const dataStr = JSON.stringify(dataToExport, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'profileData.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            console.log('✅ Données exportées vers profileData.json');
            return true;
        } catch (err) {
            console.error('❌ Erreur lors de l\'export:', err);
            setError(err.message);
            return false;
        }
    };

    const clearProfileData = () => {
        try {
            localStorage.removeItem('portfolioProfileData');
            setProfileData(defaultProfileData);
            console.log('✅ Données admin effacées, retour aux données par défaut');
            return true;
        } catch (err) {
            console.error('❌ Erreur lors de la suppression:', err);
            setError(err.message);
            return false;
        }
    };

    const hasAdminData = () => {
        return localStorage.getItem('portfolioProfileData') !== null;
    };

    useEffect(() => {
        loadProfileData();
    }, []);

    return {
        profileData,
        loading,
        error,
        loadProfileData,
        saveProfileData,
        exportProfileData,
        clearProfileData,
        hasAdminData: hasAdminData()
    };
};

export default useProfileData;