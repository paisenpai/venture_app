import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { badgeRules } from '../../utils/badgeUtils';

const useAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('/api/achievements', {
                    params: { userId: user?.id }
                });
                setAchievements(response.data);
            } catch (err) {
                setError(axios.isAxiosError(err) 
                    ? err.response?.data?.message || err.message 
                    : 'Failed to fetch achievements');
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchAchievements();
        }
    }, [user?.id]);

    const checkForNewAchievements = async () => {
        if (!user) return;
        
        try {
            setError(null);
            // Check which achievements should be unlocked based on badge rules
            const shouldUnlockResults = await Promise.all(
                badgeRules.map(rule => rule.check(user))
            );
            
            const potentialAchievements = badgeRules
                .map((rule, index) => shouldUnlockResults[index] ? rule.achievementId : null)
                .filter(Boolean);

            // Unlock achievements that meet the criteria
            await Promise.all(
                potentialAchievements.map(async (achievementId) => {
                    if (achievementId && !achievements.find(a => a.id === achievementId && a.unlocked)) {
                        await unlockAchievement(achievementId);
                    }
                })
            );
        } catch (err) {
            setError(axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'Failed to check for new achievements');
        }
    };

    const addAchievement = async (newAchievement) => {
        try {
            setError(null);
            const response = await axios.post('/api/achievements', {
                ...newAchievement,
                unlocked: false,
                userId: user?.id
            });
            setAchievements((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError(axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'Failed to add achievement');
            throw err;
        }
    };

    const deleteAchievement = async (id) => {
        try {
            setError(null);
            await axios.delete(`/api/achievements/${id}`, {
                params: { userId: user?.id }
            });
            setAchievements((prev) => prev.filter((achievement) => achievement.id !== id));
        } catch (err) {
            setError(axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'Failed to delete achievement');
            throw err;
        }
    };

    const unlockAchievement = async (id) => {
        try {
            setError(null);
            const response = await axios.patch(`/api/achievements/${id}/unlock`, { 
                userId: user?.id 
            });
            setAchievements((prev) =>
                prev.map((achievement) =>
                    achievement.id === id ? { ...achievement, ...response.data } : achievement
                )
            );
            return response.data;
        } catch (err) {
            setError(axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'Failed to unlock achievement');
            throw err;
        }
    };

    return {
        achievements,
        loading,
        error,
        addAchievement,
        deleteAchievement,
        unlockAchievement,
        checkForNewAchievements,
    };
};

export default useAchievements;