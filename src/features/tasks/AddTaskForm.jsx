import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            alert('Task name is required');
            return;
        }
        onAddTask({ name: taskName, description: taskDescription });
        setTaskName('');
        setTaskDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                />
            </div>
            <div>
                <label htmlFor="taskDescription">Task Description:</label>
                <textarea
                    id="taskDescription"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Enter task description"
                ></textarea>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;