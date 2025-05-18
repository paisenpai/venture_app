import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import useLevelSystem from '../features/leveling/useLevelSystem';
import useReminders from '../features/notifications/useReminders';
import { UserContext } from '../contexts/UserContext';
import { formatDate } from '../utils/dateHelpers';
import { calculateXPFromTask } from '../utils/xpCalculator';

const Quests = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { level, addXP } = useLevelSystem();
    const { setReminder } = useReminders();

    const quests = [
        { id: 1, name: 'Quest 1', tasks: ['Task 1.1', 'Task 1.2', 'Task 1.3'] },
        { id: 2, name: 'Quest 2', tasks: ['Task 2.1', 'Task 2.2'] },
        { id: 3, name: 'Quest 3', tasks: ['Task 3.1', 'Task 3.2', 'Task 3.3', 'Task 3.4'] },
    ];

    const handleNavigate = (questId) => {
        navigate(`/quests/${questId}`);
    };

    const handleCompleteTask = (task) => {
        const xpGained = calculateXPFromTask(task);
        addXP(xpGained);
        setReminder(`You gained ${xpGained} XP for completing "${task}"!`);
    };

    return (
        <div>
            <h1>Quests</h1>
            <p>Welcome, {user?.name || 'Adventurer'}! You are currently at level {level}.</p>
            <ul>
                {quests.map((quest) => (
                    <li key={quest.id}>
                        <div onClick={() => handleNavigate(quest.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            {quest.name}
                        </div>
                        <ul>
                            {quest.tasks.map((task, index) => (
                                <li key={index}>
                                    <TaskCard
                                        taskName={task}
                                        onComplete={() => handleCompleteTask(task)}
                                        formattedDate={formatDate(new Date())}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quests;