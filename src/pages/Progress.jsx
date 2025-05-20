import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import useProgressStats from '../features/Progress/useProgressStats'; // <-- Corrected path

const Progress = () => {
    const navigate = useNavigate();
    const { stats, loading, error } = useProgressStats(); // <-- Use stats, loading, error

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Progress Page</h1>
            <p>Welcome! Track your progress here.</p>

            <div>
                <h2>Your Tasks</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {stats?.tasks?.map((task) => (
                        <li key={task.id} style={{ marginBottom: '10px' }}>
                            <strong>{task.name}</strong>
                            <ProgressBar progress={task.progress} />
                            <p>{task.progress}% completed</p>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={() => handleNavigation('/dashboard')}>Go to Dashboard</button>
            <button onClick={() => handleNavigation('/settings')}>Go to Settings</button>
        </div>
    );
};

export default Progress;
