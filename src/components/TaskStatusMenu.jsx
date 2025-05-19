// Task Status Menu Component "Not Done Yet"
// This component displays a task status menu with different statuses.
// It allows the user to select a status and displays the selected status with appropriate styling.

import React, { useState } from 'react';

const TaskListConditions = () => {
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const statuses = [
        { label: 'Pending', bgColor: 'bg-yellow-200', textColor: 'text-yellow-800', arrowColor: 'bg-yellow-800' },
        { label: 'Ongoing', bgColor: 'bg-blue-200', textColor: 'text-blue-800', arrowColor: 'bg-blue-800' },
        { label: 'Completed', bgColor: 'bg-green-200', textColor: 'text-green-800', arrowColor: 'bg-green-800' },
    ];

    const handleStatusChange = (status) => {
        setSelectedStatus(status.label);
    };

    return (
        <div className="relative">
            <div className="mb-2">
                <TaskStatus
                    status={selectedStatus}
                    bgColor={statuses.find(s => s.label === selectedStatus).bgColor}
                    textColor={statuses.find(s => s.label === selectedStatus).textColor}
                    arrowColor={statuses.find(s => s.label === selectedStatus).arrowColor}
                    textSize="text-sm"
                />
            </div>
            <div className="absolute bg-white border rounded shadow-md">
                {statuses.map((status) => (
                    <div
                        key={status.label}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleStatusChange(status)}
                    >
                        {status.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskListConditions;
