import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
    return (
        <div className="task-item">
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                />
                <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            </div>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskItem;