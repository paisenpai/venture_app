import React from "react";

const QuestCalendarView = ({ quests }) => {
    return (
        <div className="grid grid-cols-7 gap-4">
            {quests.map((quest) => (
                <div
                    key={quest.id}
                    className="p-4 border rounded shadow bg-indigo-100"
                >
                    <h3 className="text-lg font-bold">{quest.name}</h3>
                    <p className="text-gray-600">{quest.dueDate}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestCalendarView;