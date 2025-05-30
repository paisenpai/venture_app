import { useMemo } from "react";
import { filterQuestsByStatus } from "../utils/QuestBoard/questFilters";

/**
 * Custom hook to prepare quest data for different views (board, list, calendar)
 * Ensures consistent data structure across all views
 */
const useQuestViews = (quests = []) => {
  // Extract all subtasks for easier management
  const allSubtasks = useMemo(
    () =>
      quests
        .filter((quest) => quest.subtasks?.length > 0)
        .flatMap((quest) =>
          quest.subtasks.map((subtask) => ({
            ...subtask,
            parentId: quest.id,
            parentName: quest.name,
            // Ensure consistent styling by adding these properties if missing
            category: subtask.category || "Subtask",
            goal: subtask.goal || "",
            daysLeft: subtask.daysLeft ?? 0,
            priority: subtask.priority || 1,
            type: "subtask",
            xp: subtask.xp || Math.floor(quest.xp / 4), // Default XP for subtasks
          }))
        ),
    [quests]
  );

  // Filter quests by status
  const availableQuests = useMemo(
    () => filterQuestsByStatus(quests, "available"),
    [quests]
  );
  const ongoingQuests = useMemo(
    () => filterQuestsByStatus(quests, "ongoing"),
    [quests]
  );
  const completedQuests = useMemo(
    () => filterQuestsByStatus(quests, "completed"),
    [quests]
  );

  // Filter subtasks by status
  const availableSubtasks = useMemo(
    () =>
      allSubtasks.filter(
        (subtask) => subtask.status === "available" || !subtask.status
      ),
    [allSubtasks]
  );
  const ongoingSubtasks = useMemo(
    () => allSubtasks.filter((subtask) => subtask.status === "ongoing"),
    [allSubtasks]
  );
  const completedSubtasks = useMemo(
    () => allSubtasks.filter((subtask) => subtask.status === "completed"),
    [allSubtasks]
  );

  return {
    quests,
    allSubtasks,
    availableQuests,
    ongoingQuests,
    completedQuests,
    availableSubtasks,
    ongoingSubtasks,
    completedSubtasks,
  };
};

export default useQuestViews;
