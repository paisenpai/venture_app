/**
 * Formats a date string into a user-friendly format
 * @param {string} dateStr - The date string to format
 * @returns {string} Formatted date string (Today, Tomorrow, or date)
 */
export const formatDueDate = (dateStr) => {
  if (!dateStr) return "No due date";

  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: today.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    });
  }
};

export default formatDueDate;
