import { useState, useEffect } from 'react';
import axios from 'axios';

const useProgressStats = (userId) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/progress/stats?userId=${userId}`);
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
                userId,
            });
            setStats(response.data);
        } catch (err) {
            setError(err.message || 'Failed to generate stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchStats();
        }
    }, [userId]);

    return { stats, loading, error, fetchStats, generateStats };
};

export default useProgressStats;
