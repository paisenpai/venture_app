/**
 * Design system for the Quest Management application
 * Provides consistent colors, spacing, and styling across all components
 */

// Enhanced design system with more comprehensive styling options

export const colors = {
  primary: {
    light: "#6366f1", // Indigo-500
    DEFAULT: "#4f46e5", // Indigo-600
    dark: "#4338ca", // Indigo-700
    bg: "bg-indigo-500",
    hover: "hover:bg-indigo-600",
    border: "border-indigo-500",
    text: "text-indigo-600",
  },
  secondary: {
    light: "#a855f7", // Purple-500
    DEFAULT: "#9333ea", // Purple-600
    dark: "#7e22ce", // Purple-700
    bg: "bg-purple-500",
    hover: "hover:bg-purple-600",
    border: "border-purple-500",
    text: "text-purple-600",
  },
  success: {
    light: "#10b981", // Emerald-500
    DEFAULT: "#059669", // Emerald-600
    dark: "#047857", // Emerald-700
    bg: "bg-emerald-500",
    hover: "hover:bg-emerald-600",
    border: "border-emerald-500",
    text: "text-emerald-600",
  },
  warning: {
    light: "#f59e0b", // Amber-500
    DEFAULT: "#d97706", // Amber-600
    dark: "#b45309", // Amber-700
    bg: "bg-amber-500",
    hover: "hover:bg-amber-600",
    border: "border-amber-500",
    text: "text-amber-600",
  },
  danger: {
    light: "#ef4444", // Red-500
    DEFAULT: "#dc2626", // Red-600
    dark: "#b91c1c", // Red-700
    bg: "bg-red-500",
    hover: "hover:bg-red-600",
    border: "border-red-500",
    text: "text-red-600",
  },
};

export const statusColors = {
  available: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-800",
    bgSolid: "bg-green-500",
  },
  ongoing: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-yellow-200 dark:border-yellow-800",
    bgSolid: "bg-yellow-500",
  },
  completed: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800",
    bgSolid: "bg-blue-500",
  },
  overdue: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-800",
    bgSolid: "bg-red-500",
  },
};

export const deadlineColors = {
  overdue: { bg: "#E7BBBB", color: "#8D1616" },
  urgent: { bg: "#FFE893", color: "#CAA004" },
  soon: { bg: "#BEBBE7", color: "#1F168D" },
  comfortable: { bg: "#BBD1E7", color: "#163A8D" },
  none: { bg: "#E5E5E5", color: "#909090" },
};

export const transitions = {
  fast: "transition-all duration-150",
  normal: "transition-all duration-300",
  slow: "transition-all duration-500",
};

export const shadows = {
  sm: "shadow-sm",
  DEFAULT: "shadow",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  inner: "shadow-inner",
  none: "shadow-none",
  hover: "hover:shadow-lg",
};

export const boardSizes = {
  width: "360px", // Updated to match QuestBoard
  height: "240px", // Updated from 220px to 240px
};

export const borders = {
  rounded: "rounded-lg",
  circle: "rounded-full",
  none: "rounded-none",
  sm: "rounded",
};

export const componentStyles = {
  card: `${borders.rounded} ${shadows.DEFAULT} ${transitions.normal} bg-white dark:bg-gray-800`,
  button: {
    primary: `px-4 py-2 ${borders.rounded} ${transitions.normal} bg-indigo-600 hover:bg-indigo-700 text-white font-medium`,
    secondary: `px-4 py-2 ${borders.rounded} ${transitions.normal} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium`,
    danger: `px-4 py-2 ${borders.rounded} ${transitions.normal} bg-red-600 hover:bg-red-700 text-white font-medium`,
    icon: `p-2 ${borders.rounded} ${transitions.normal} hover:bg-gray-100 dark:hover:bg-gray-700`,
  },
  input: `block w-full px-4 py-2 ${borders.rounded} ${transitions.normal} bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-900/30 focus:ring-opacity-50 outline-none`,
  select: `block w-full px-4 py-2 ${borders.rounded} ${transitions.normal} bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-900/30 focus:ring-opacity-50 outline-none`,
  textarea: `block w-full px-4 py-2 ${borders.rounded} ${transitions.normal} bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-900/30 focus:ring-opacity-50 outline-none`,
  label: `block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1`,
};

export const typography = {
  heading: {
    h1: "text-3xl sm:text-4xl font-extrabold",
    h2: "text-2xl sm:text-3xl font-bold",
    h3: "text-xl sm:text-2xl font-bold",
    h4: "text-lg sm:text-xl font-semibold",
  },
  text: {
    base: "text-base text-gray-700 dark:text-gray-300",
    sm: "text-sm text-gray-600 dark:text-gray-400",
    xs: "text-xs text-gray-500 dark:text-gray-500",
  },
};

export const responsiveStyles = {
  container: "px-4 sm:px-6 lg:px-8",
  section: "mb-8 sm:mb-12",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
};
