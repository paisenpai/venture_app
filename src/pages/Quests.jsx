import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import QuestBoard from '../components/QuestBoard';
import useLevelSystem from '../features/leveling/useLevelSystem';
import useReminders from '../features/notifications/useReminders';
import { UserContext } from '../contexts/UserContext';

const quests = [
    {
        id: 1,
        name: 'Quest 1',
        category: 'Adventure',
        goal: 'Complete all tasks',
        dueDate: '2025-05-31',
        xp: 100,
        daysLeft: 5,
        level: 1,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 60,
    },
    {
        id: 2,
        name: 'Quest 2',
        category: 'Puzzle', 
        goal: 'Solve the riddles',
        dueDate: '2025-06-05',
        xp: 80,
        daysLeft: 10,
        level: 2,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 30,
    },
    {
        id: 3,
        name: 'Quest 3',
        category: 'Battle',
        goal: 'Win the duel',
        dueDate: '2025-06-10',
        xp: 120,
        daysLeft: 15,
        level: 3,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 90,
    },
];

const Quests = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { level, addXP } = useLevelSystem();
    const { setReminder } = useReminders();

    // Handle clicking a quest card
    const handleNavigate = (questId) => {
        navigate(`/quests/${questId}`);
    };

    // Handle completing a quest (for demo, just adds XP)
    const handleCompleteQuest = (quest) => {
        addXP(quest.xp);
        setReminder(`You gained ${quest.xp} XP for completing "${quest.name}"!`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 p-10">
                <h1 className="text-3xl font-bold mb-2">Quests</h1>
                <p className="mb-8 text-lg">
                    Welcome, {user?.name || 'Adventurer'}! You are currently at level {level}.
                </p>
                <div className="flex flex-wrap gap-8">
                    {quests.map((quest) => (
                        <div
                            key={quest.id}
                            className="cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleNavigate(quest.id)}
                        >
                            <QuestBoard
                                type="default"
                                level={quest.level}
                                daysLeft={quest.daysLeft}
                                taskName={quest.name}
                                category={quest.category}
                                goal={quest.goal}
                                dueDate={quest.dueDate}
                                xp={quest.xp}
                                avatarUrl={quest.avatarUrl}
                                progress={quest.progress}
                            />
                            <button
                                className="mt-3 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleCompleteQuest(quest);
                                }}
                            >
                                Complete Quest
                            </button>
                        </div>
                    ))}
                    {/* Add Quest Card */}
                    <div>
                        <QuestBoard type="add" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quests;