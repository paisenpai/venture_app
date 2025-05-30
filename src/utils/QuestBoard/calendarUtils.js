/**
 * Get color class based on quest status
 * @param {string} status - Quest status
 * @param {boolean} isDarkMode - If dark mode is enabled
 * @returns {string} - CSS class name
 */
export const getStatusColor = (status, isDarkMode = false) => {
  switch (status) {
    case "available":
      return isDarkMode ? "bg-blue-600" : "bg-blue-400";
    case "ongoing":
      return isDarkMode ? "bg-yellow-600" : "bg-yellow-400";
    case "completed":
      return isDarkMode ? "bg-green-600" : "bg-green-400";
    default:
      return isDarkMode ? "bg-gray-500" : "bg-gray-400";
  }
};

/**
 * Generate calendar array for a specific month
 * @param {Date} currentDate - Current date to base the calendar on
 * @param {Object} itemsByDate - Quest items grouped by date
 * @returns {Array} - Array of day objects for the calendar
 */
export const generateCalendarDays = (currentDate, itemsByDate = {}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysFromPrevMonth = firstDayOfMonth.getDay();
  const totalDays = 42; // 6 rows of 7 days
  const days = [];

  // Add days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const dateObj = new Date(year, month - 1, dayNum);
    const dateStr = dateObj.toISOString().split("T")[0];

    days.push({
      date: dateObj,
      dateStr,
      dayOfMonth: dayNum,
      isCurrentMonth: false,
      hasItems: !!itemsByDate[dateStr] && itemsByDate[dateStr].length > 0,
      itemCount: itemsByDate[dateStr] ? itemsByDate[dateStr].length : 0,
      items: itemsByDate[dateStr] || [],
    });
  }

  // Add days from current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dateObj = new Date(year, month, i);
    const dateStr = dateObj.toISOString().split("T")[0];
    const today = new Date();
    const isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

    days.push({
      date: dateObj,
      dateStr,
      dayOfMonth: i,
      isCurrentMonth: true,
      isToday,
      hasItems: !!itemsByDate[dateStr] && itemsByDate[dateStr].length > 0,
      itemCount: itemsByDate[dateStr] ? itemsByDate[dateStr].length : 0,
      items: itemsByDate[dateStr] || [],
    });
  }

  // Fill remaining days from next month
  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const dateObj = new Date(year, month + 1, i);
    const dateStr = dateObj.toISOString().split("T")[0];

    days.push({
      date: dateObj,
      dateStr,
      dayOfMonth: i,
      isCurrentMonth: false,
      hasItems: !!itemsByDate[dateStr] && itemsByDate[dateStr].length > 0,
      itemCount: itemsByDate[dateStr] ? itemsByDate[dateStr].length : 0,
      items: itemsByDate[dateStr] || [],
    });
  }

  return days;
};

/**
 * Group quests and subtasks by their due date
 * @param {Array} quests - Array of quest objects
 * @param {Array} subtasks - Array of subtask objects
 * @returns {Object} - Items grouped by date
 */
export const groupItemsByDate = (quests = [], subtasks = []) => {
  const grouped = {};

  // Process quests
  quests
    .filter((q) => q.dueDate)
    .forEach((quest) => {
      const dateStr = new Date(quest.dueDate).toISOString().split("T")[0];
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push({ ...quest, isSubtask: false });
    });

  // Process subtasks
  subtasks
    .filter((s) => s.dueDate)
    .forEach((subtask) => {
      const dateStr = new Date(subtask.dueDate).toISOString().split("T")[0];
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push({ ...subtask, isSubtask: true });
    });

  return grouped;
};

/**
 * Get quests for a specific date, grouped by status
 * @param {string} selectedDate - Date in ISO string format
 * @param {Object} itemsByDate - Items grouped by date
 * @returns {Object} - Grouped quests by status
 */
export const getQuestsByStatus = (selectedDate, itemsByDate) => {
  if (!selectedDate || !itemsByDate[selectedDate])
    return { available: [], ongoing: [], completed: [] };

  const items = itemsByDate[selectedDate];
  return {
    available: items.filter((item) => item.status === "available"),
    ongoing: items.filter((item) => item.status === "ongoing"),
    completed: items.filter((item) => item.status === "completed"),
  };
};
