import React from 'react';
import './TaskBoard.css'; // Optional: Add CSS for styling

const TaskBoard = ({ tasks }) => {
    const categories = [...new Set(tasks.map(task => task.category))];

    return (
        <div className="task-board-grid">
            {categories.map(category => (
                <div key={category} className="task-category">
                    <h2 className="category-title">{category}</h2>
                    <div className="tasks">
                        {tasks
                            .filter(task => task.category === category)
                            .map(task => (
                                <div key={task.id} className="task-card">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );  
};

export default TaskBoard;