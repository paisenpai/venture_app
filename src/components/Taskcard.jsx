import React from 'react';
import { formatDate } from '../utils/dateHelpers';
import { calculateXPFromTask } from '../utils/xpCalculator';

const TaskCard = ({ task }) => {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {formatDate(task.dueDate)}</p>
            <p>XP: {calculateXPFromTask(task)}</p>
        </div>
    );
};

export default TaskCard;
