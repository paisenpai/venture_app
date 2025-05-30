import { deadlineColors } from "../../theme/colors";

/**
 * Formats a date string to MM/DD/YY format
 * @param {string} dateStr - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`;
};

/**
 * Gets styling for days left indicator
 * @param {number|null} daysLeft - Number of days left
 * @returns {Object} - Style object containing background and text colors
 */
export const getDaysLeftStyle = (daysLeft) => {
  if (daysLeft === null) return deadlineColors.none;
  if (daysLeft < 0) return deadlineColors.overdue;
  if (daysLeft <= 2) return deadlineColors.urgent;
  if (daysLeft <= 7) return deadlineColors.soon;
  return deadlineColors.comfortable;
};