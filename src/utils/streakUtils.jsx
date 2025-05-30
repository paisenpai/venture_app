// streakUtils.js

/**
 * Calculates the current streak of consecutive days based on an array of dates.
 * @param {Date[]} dates - An array of JavaScript Date objects sorted in ascending order.
 * @returns {number} - The number of consecutive days in the streak.
 */
export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  let streak = 1; // Start with a streak of 1
  for (let i = dates.length - 1; i > 0; i--) {
    const currentDate = dates[i];
    const previousDate = dates[i - 1];

    // Calculate the difference in days
    const diffInTime = currentDate - previousDate;
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      streak++;
    } else if (diffInDays > 1) {
      break; // Streak is broken
    }
  }

  return streak;
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
 * Adds a new date to the streak if it is today and not already present.
 * @param {Date[]} dates - An array of JavaScript Date objects sorted in ascending order.
 * @returns {Date[]} - The updated array of dates.
 */
export function addTodayToStreak(dates) {
  const today = new Date();
  if (!dates.some((date) => isToday(date))) {
    dates.push(today);
    dates.sort((a, b) => a - b); // Ensure dates remain sorted
  }
  return dates;
}
