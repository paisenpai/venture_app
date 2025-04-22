// dateUtils.js

/**
 * Formats a JavaScript Date object into a readable string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale string (e.g., 'en-US').
 * @param {Object} options - Intl.DateTimeFormat options.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date, locale = 'en-US', options = {}) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
    }
    return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Calculates the difference in days between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {number} - The difference in days.
 */
export function getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInTime = Math.abs(date2 - date1);
    return Math.round(diffInTime / oneDay);
}

/**
 * Checks if a given date is today.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is today, false otherwise.
 */
export function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

/**
 * Adds days to a given date.
 * @param {Date} date - The date to add days to.
 * @param {number} days - The number of days to add.
 * @returns {Date} - The new date.
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Subtracts days from a given date.
 * @param {Date} date - The date to subtract days from.
 * @param {number} days - The number of days to subtract.
 * @returns {Date} - The new date.
 */
export function subtractDays(date, days) {
    return addDays(date, -days);
}

/**
 * Calculates the due date by adding a specific number of days to a given date.
 * @param {Date} startDate - The start date.
 * @param {number} daysToAdd - The number of days to add.
 * @returns {Date} - The calculated due date.
 */
export function calculateDueDate(startDate, daysToAdd) {
    return addDays(startDate, daysToAdd);
}

/**
 * Formats a date into a relative time string (e.g., "2 days ago", "in 3 days").
 * @param {Date} date - The date to format.
 * @returns {string} - The relative time string.
 */
export function formatRelativeDate(date) {
    const now = new Date();
    const diffInDays = getDaysDifference(now, date);

    if (isToday(date)) {
        return 'Today';
    } else if (date > now) {
        return `In ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    } else {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
}

/**
 * Checks if a given date is a weekend.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is a weekend, false otherwise.
 */
export function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

/**
 * Gets the start of the day for a given date.
 * @param {Date} date - The date to process.
 * @returns {Date} - The start of the day.
 */
export function getStartOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Gets the end of the day for a given date.
 * @param {Date} date - The date to process.
 * @returns {Date} - The end of the day.
 */
export function getEndOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}