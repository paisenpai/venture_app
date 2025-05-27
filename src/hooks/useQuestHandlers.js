// Improve equality checks and status change function

import { useState } from "react";

const useQuestHandlers = (initialQuests = []) => {
  const [quests, setQuests] = useState(initialQuests);

  // Generate a new unique ID for quests or subtasks
  const generateId = (items) => {
    const maxId =
      items.length > 0
        ? Math.max(...items.map((item) => parseInt(item.id)))
        : 0;
    return maxId + 1;
  };

  // Add a new quest
  const handleAddQuest = (newQuest) => {
    const questWithId = {
      ...newQuest,
      id: generateId(quests),
      subtasks: newQuest.subtasks || [],
    };
    setQuests([...quests, questWithId]);
    return questWithId;
  };

  // Edit an existing quest
  const handleEditQuest = (questId, updatedQuest) => {
    setQuests(
      quests.map((quest) =>
        quest.id === questId ? { ...quest, ...updatedQuest } : quest
      )
    );
  };

  // Delete a quest
  const handleDeleteQuest = (questId) => {
    setQuests(quests.filter((quest) => quest.id !== questId));
  };

  // Change a quest's status
  const handleChangeStatus = (questId, newStatus) => {
    setQuests(
      quests.map((quest) =>
        quest.id === questId ? { ...quest, status: newStatus } : quest
      )
    );
  };

  // Add a subtask to a quest
  const handleAddSubtask = (questId, newSubtask) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          const subtasks = quest.subtasks || [];
          const subtaskWithId = {
            ...newSubtask,
            id: generateId(subtasks),
          };
          return {
            ...quest,
            subtasks: [...subtasks, subtaskWithId],
          };
        }
        return quest;
      })
    );
  };

  // Edit a subtask
  const handleEditSubtask = (questId, subtaskId, updatedSubtask) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            subtasks: (quest.subtasks || []).map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, ...updatedSubtask }
                : subtask
            ),
          };
        }
        return quest;
      })
    );
  };

  // Delete a subtask
  const handleDeleteSubtask = (questId, subtaskId) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            subtasks: (quest.subtasks || []).filter(
              (subtask) => subtask.id !== subtaskId
            ),
          };
        }
        return quest;
      })
    );
  };

  // Change a subtask's status
  const handleChangeSubtaskStatus = (questId, subtaskId, newStatus) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId) {
          return {
            ...quest,
            subtasks: (quest.subtasks || []).map((subtask) =>
              subtask.id === subtaskId
                ? {
                    ...subtask,
                    status: newStatus,
                    progress:
                      newStatus === "completed" ? 100 : subtask.progress,
                  }
                : subtask
            ),
          };
        }
        return quest;
      })
    );
    // Update main quest progress after updating subtask
    updateQuestProgress(questId);
  };

  // Update quest progress based on subtasks
  const updateQuestProgress = (questId) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId && quest.subtasks?.length > 0) {
          const totalSubtasks = quest.subtasks.length;
          const completedSubtasks = quest.subtasks.filter(
            (subtask) => subtask.progress === 100
          ).length;

          const progress = Math.round(
            (completedSubtasks / totalSubtasks) * 100
          );

          return {
            ...quest,
            progress,
          };
        }
        return quest;
      })
    );
  };

  return {
    quests,
    handleAddQuest,
    handleEditQuest,
    handleDeleteQuest,
    handleChangeStatus,
    handleAddSubtask,
    handleEditSubtask,
    handleDeleteSubtask,
    handleChangeSubtaskStatus,
    updateQuestProgress,
  };
};

export default useQuestHandlers;
