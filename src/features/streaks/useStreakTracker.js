import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { calculateStreak } from '../../utils/streakUtils';

const useStreakTracker = (key = 'streak') => {
    const { user } = useContext(UserContext); // Access user data from UserContext
    const [streak, setStreak] = useState(() => {
        const savedStreak = JSON.parse(localStorage.getItem(`${user?.id}_${key}`));
        return savedStreak || { count: 0, lastDate: null };
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem(`${user.id}_${key}`, JSON.stringify(streak));
        }
    }, [streak, key, user]);

    const updateStreak = () => {
        const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
        if (streak.lastDate === today) {
            return; // Already updated today
        }

        const newStreak = calculateStreak(streak, today);
        setStreak(newStreak);
    };

    const resetStreak = () => {
        setStreak({ count: 0, lastDate: null });
    };

    return { streak, updateStreak, resetStreak };
};

export default useStreakTracker;
