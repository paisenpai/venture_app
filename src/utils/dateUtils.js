/**
 * Consolidated date utility functions
 */

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

/**
 * Calculate days left from a date string
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {number} - Number of days left (0 if date is in the past)
 */
export const calculateDaysLeft = (dateString) => {
  if (!dateString) return 0;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dateString);
  const timeDifference = selectedDate - currentDate;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : 0;
};

/**
 * Formats a JavaScript Date object into a readable string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale string (e.g., 'en-US').
 * @param {Object} options - Intl.DateTimeFormat options.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date, locale = 'en-US', options = {}) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Calculates the difference in days between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} - The difference in days.
 */
export function getDaysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
  return diffDays;
}

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
    // Format as MM/DD/YYYY or your preferred format
    return date.toLocaleDateString();
  }
};
