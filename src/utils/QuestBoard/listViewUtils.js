import { deadlineColors } from "../../theme/colors";

/**
 * Sort quest items by status, priority, and due date
 * @param {Array} items - Array of quest items to sort
 * @returns {Array} - Sorted array
 */
export const sortQuestItems = (items = []) => {
  const statusPriority = {
    ongoing: 1,
    available: 2,
    completed: 3,
  };

  return [...items].sort((a, b) => {
    // First sort by status
    const statusDiff =
      statusPriority[a.status || "available"] -
      statusPriority[b.status || "available"];

    if (statusDiff !== 0) return statusDiff;

    // Then by priority (higher number = higher priority)
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;

    // Then by due date (closer date first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    // Items with due dates come before those without
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;

    return 0;
  });
};

/**
 * Format date in MM/DD/YY format
 * @param {string} dateStr - ISO format date string
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, formatStr = "MMM d, yyyy") => {
  if (!date) return "No due date";

  const d = new Date(date);

  switch (formatStr) {
    case "MMM d, yyyy": {
      const month = d.toLocaleString("default", { month: "short" });
      return `${month} ${d.getDate()}, ${d.getFullYear()}`;
    }
    case "yyyy-MM-dd":
      return d.toISOString().split("T")[0];
    default:
      return d.toLocaleDateString();
  }
};

/**
 * Get styling for days left indicator
 * @param {number} daysLeft - Number of days left
 * @returns {object} - Style object with background and text color
 */
export const getDaysLeftStyle = (daysLeft) => {
  if (daysLeft === null) return deadlineColors.none;
  if (daysLeft < 0) return deadlineColors.overdue;
  if (daysLeft <= 2) return deadlineColors.urgent;
  if (daysLeft <= 7) return deadlineColors.soon;
  return deadlineColors.comfortable;
};

/**
 * Group subtasks by parent ID
 * @param {Array} subtasks - Array of subtask objects
 * @returns {Object} - Object with parent IDs as keys and arrays of subtasks as values
 */
export const groupSubtasksByParent = (subtasks = []) => {
  return subtasks.reduce((grouped, subtask) => {
    const parentId = subtask.parentId;
    if (!parentId) return grouped;

    if (!grouped[parentId]) {
      grouped[parentId] = [];
    }

    grouped[parentId].push(subtask);
    return grouped;
  }, {});
};

/**
 * Format a date string into a readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatListDate = (date) => {
  if (!date) return "No date";

  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.getTime() === today.getTime()) {
    return "Today";
  } else if (d.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    return formatDate(date);
  }
};

/**
 * Get status display name
 * @param {string} status - Status code
 * @returns {string} - Display name
 */
export const getStatusDisplayName = (status) => {
  switch (status) {
    case "available":
      return "Available";
    case "ongoing":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return "Unknown";
  }
};
