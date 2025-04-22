import React from 'react';

const TaskList = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return <p>No tasks available.</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;