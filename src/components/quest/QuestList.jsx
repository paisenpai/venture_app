import React from "react";

const QuestListView = ({ quests, onNavigate }) => {
    return (
        <div className="flex flex-col gap-4">
            {quests.map((quest) => (
                <div
                    key={quest.id}
                    className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => onNavigate(quest.id)}
                >
                    <h3 className="text-xl font-bold">{quest.name}</h3>
                    <p className="text-gray-600">{quest.category}</p>
                    <p className="text-gray-500">Due: {quest.dueDate}</p>
                    <p className="text-gray-500">XP: {quest.xp}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestListView;