import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const useProgressStats = () => {
    const { user } = useContext(UserContext); // Access user data from UserContext
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/progress/stats?userId=${user.id}`); // Use user ID in API call
            setStats(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    const generateStats = async (filters) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/progress/stats/generate', {
                ...filters,
                userId: user.id, // Include user ID in the request payload
            });
            setStats(response.data);
        } catch (err) {
            setError(err.message || 'Failed to generate stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchStats();
        }
    }, [user]);

    return { stats, loading, error, fetchStats, generateStats };
};

export default useProgressStats;