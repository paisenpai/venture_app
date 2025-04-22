import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import useProgressStats from '../features/reports/useProgressStats';
import { UserContext } from '../contexts/UserContext';

const Progress = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Using UserContext
    const { tasks } = useProgressStats(); // Using useProgressStats to fetch tasks

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Progress Page</h1>
            <p>Welcome, {user?.name || 'Guest'}! Track your progress here.</p>

            <div>
                <h2>Your Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} style={{ marginBottom: '10px' }}>
                            <strong>{task.name}</strong>
                            <ProgressBar progress={task.progress} /> {/* Using ProgressBar */}
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
