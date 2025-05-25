import { useState } from "react";

const useQuestHandlers = (initialQuests) => {
    const [quests, setQuests] = useState(initialQuests);

    const handleAddQuest = (newQuest) => {
        setQuests((prev) => [
            ...prev,
            {
                ...newQuest,
                id: prev.length + 1,
                subtasks: [],
                progress: 0,
                level: 1,
                status: "available",
            },
        ]);
    };

    const handleEditQuest = (id, updatedQuest) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === id
                    ? { ...quest, ...updatedQuest, subtasks: updatedQuest.subtasks || [] }
                    : quest
            )
        );
    };

    const handleDeleteQuest = (id) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== id));
    };

    const handleChangeStatus = (id, status) => {
        setQuests((prev) =>
            prev.map((quest) => (quest.id === id ? { ...quest, status } : quest))
        );
    };

    const handleAddSubtask = (questId, newSubtask) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: [
                              ...quest.subtasks,
                              { ...newSubtask, id: quest.subtasks.length + 1 },
                          ],
                      }
                    : quest
            )
        );
    };

    const handleEditSubtask = (questId, subtaskId, updatedSubtask) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: quest.subtasks.map((subtask) =>
                              subtask.id === subtaskId ? { ...subtask, ...updatedSubtask } : subtask
                          ),
                      }
                    : quest
            )
        );
    };

    const handleDeleteSubtask = (questId, subtaskId) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: quest.subtasks.filter((subtask) => subtask.id !== subtaskId),
                      }
                    : quest
            )
        );
    };

    return {
        quests,
        setQuests,
        handleAddQuest,
        handleEditQuest,
        handleDeleteQuest,
        handleChangeStatus,
        handleAddSubtask,
        handleEditSubtask,
        handleDeleteSubtask,
    };
};

export default useQuestHandlers;