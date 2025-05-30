/**
 * Central color system for the application
 * Ensures consistent colors across all components
 */

// Section colors
export const sectionColors = {
  available: {
    bg: "#1F168D",
    text: "#1F168D",
  },
  ongoing: {
    bg: "#E1AE01",
    text: "#E1AE01",
  },
  completed: {
    bg: "#05944F",
    text: "#05944F",
  },
};

// Page colors
export const pageColors = {
  quest: "#1F168D",
  journey: "#0A84FF",
  guild: "#05944F",
};

// Category colors with text variants
export const categoryColors = {
  Work: "bg-blue-500 text-blue-800",
  Personal: "bg-purple-500 text-purple-800",
  Learning: "bg-green-500 text-green-800",
  Health: "bg-red-500 text-red-800",
  Subtask: "bg-yellow-500 text-yellow-800",
  Other: "bg-gray-500 text-gray-800",
};

// Deadline colors for visual indication
export const deadlineColors = {
  overdue: { bg: "#FEE2E2", color: "#B91C1C" },
  urgent: { bg: "#FEF3C7", color: "#92400E" },
  soon: { bg: "#E0F2FE", color: "#0369A1" },
  comfortable: { bg: "#ECFDF5", color: "#065F46" },
  none: { bg: "#F3F4F6", color: "#4B5563" },
};

// Quest type styling
export const questTypeVariants = {
  Adventure: "bg-blue-300 text-blue-900",
  Puzzle: "bg-green-300 text-green-900",
  Battle: "bg-yellow-200 text-yellow-700",
  Study: "bg-blue-300 text-blue-900",
  Fitness: "bg-green-300 text-green-900",
  Work: "bg-yellow-200 text-yellow-700",
  Hobby: "bg-pink-200 text-pink-700",
  Other: "bg-gray-200 text-gray-700",
};

// Days left background colors
export const daysLeftBgColors = {
  blue: "#163A8D",
  purple: "#1F168D",
  red: "#8D1616",
  yellow: "#CAA004",
};

// For consistency, default to the Available color when needed
export const defaultColor = "#1F168D";

// Theme helper function
export const getThemeClass = (darkMode) => {
  return darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
};
