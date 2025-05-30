// Add calendar-specific styling

export const categoryColors = {
  Work: "bg-blue-500 text-blue-800",
  Personal: "bg-purple-500 text-purple-800",
  Learning: "bg-green-500 text-green-800",
  Health: "bg-red-500 text-red-800",
  Subtask: "bg-yellow-500 text-yellow-800",
  Other: "bg-gray-500 text-gray-800",
};

export const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

// Add calendar status styles
export const calendarStatusColors = {
  available: {
    light: "bg-blue-100 text-blue-800",
    dark: "bg-blue-800 text-blue-100",
  },
  ongoing: {
    light: "bg-yellow-100 text-yellow-800",
    dark: "bg-yellow-800 text-yellow-100",
  },
  completed: {
    light: "bg-green-100 text-green-800",
    dark: "bg-green-800 text-green-100",
  },
};

// Add calendar date styling
export const calendarDateStyles = {
  today: {
    light: "border-blue-400 border-2",
    dark: "border-blue-600 border-2",
  },
  selected: {
    light: "bg-blue-50",
    dark: "bg-blue-900",
  },
  otherMonth: {
    light: "bg-gray-50 text-gray-400",
    dark: "bg-gray-900 text-gray-500",
  },
  currentMonth: {
    light: "bg-white",
    dark: "bg-gray-800",
  },
};
