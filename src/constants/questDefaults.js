/**
 * Default values for new quests
 */
export const defaultQuestValues = {
  name: "",
  category: "Other",
  goal: "",
  xp: 50,
  priority: 1,
  status: "available",
  progress: 0,
};

/**
 * Priority level options for quests
 */
export const priorityLevels = [1, 2, 3, 4];

/**
 * Status options for quests
 */
export const statusOptions = [
  { value: "available", label: "Available" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

export default {
  defaultQuestValues,
  priorityLevels,
  statusOptions,
};
