import React from 'react';
import { useNavigate } from 'react-router-dom';

const achievements = [
    { id: 1, title: 'First Login', description: 'Logged in for the first time', badge: '🎉', label: 'Starter' },
    { id: 2, title: 'Profile Complete', description: 'Completed your profile', badge: '✅', label: 'Profile Pro' },
    { id: 3, title: '100 Points', description: 'Earned 100 points', badge: '🏆', label: 'Point Collector' },
    { id: 4, title: 'Quest Master', description: 'Completed 10 quests', badge: '🗺️', label: 'Adventurer' },
    { id: 5, title: 'Daily Streak', description: 'Logged in 7 days in a row', badge: '🔥', label: 'Consistent' },
    { id: 6, title: 'Friend Maker', description: 'Added your first friend', badge: '🤝', label: 'Socializer' },
    { id: 7, title: 'Customizer', description: 'Changed your avatar', badge: '🖼️', label: 'Personal Touch' },
    { id: 8, title: 'Feedback Giver', description: 'Submitted feedback', badge: '💬', label: 'Contributor' },
];

const Achievements = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Achievements Page</h1>
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-8 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                Go to Dashboard
            </button>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Achievements Overview</h2>
                <ul className="space-y-4">
                    {achievements.map((achievement) => (
                        <li
                            key={achievement.id}
                            className="rounded-lg bg-gray-50 flex flex-col md:flex-row gap-4 p-4"
                        >
                            {/* Left side: badge and info */}
                            <div className="flex items-center gap-6 flex-1 min-w-[180px]">
                                <span className="text-4xl min-w-[2.5rem] text-center">{achievement.badge}</span>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <strong className="text-lg">{achievement.title}</strong>
                                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold">
                                            {achievement.label}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 text-sm">{achievement.description}</div>
                                </div>
                            </div>
                            {/* Right side: card body */}
                            <div className="flex-1 min-w-[180px] flex items-center">
                                <div className="w-full mt-0 p-3 bg-white border border-indigo-100 rounded-lg shadow-sm">
                                    <div className="text-xs text-gray-500">
                                        Achievement ID: {achievement.id}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Unlocked: <span className="font-semibold">{achievement.id % 2 === 0 ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Achievements;