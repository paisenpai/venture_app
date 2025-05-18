import React from 'react';
import { useNavigate } from 'react-router-dom';

const Achievements = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const achievements = [
        { id: 1, title: 'First Login', description: 'Logged in for the first time', badge: '🎉' },
        { id: 2, title: 'Profile Complete', description: 'Completed your profile', badge: '✅' },
        { id: 3, title: '100 Points', description: 'Earned 100 points', badge: '🏆' },
    ];

    return (
        <div>
            <h1>Achievements Page</h1>
            <button onClick={goToDashboard}>Go to Dashboard</button>
            <div style={{ marginTop: '20px' }}>
                <h2>Achievements Overview</h2>
                <ul>
                    {achievements.map((achievement) => (
                        <li key={achievement.id} style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '24px', marginRight: '10px' }}>{achievement.badge}</span>
                            <strong>{achievement.title}</strong>: {achievement.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Achievements;