// TASK CARD COMPONENT "NOT DONE YET"
// This component is responsible for displaying individual task details.
// It takes a task object as a prop and displays its title, description, due date, and XP value.
// It also includes a function to calculate XP based on the task's properties.


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
