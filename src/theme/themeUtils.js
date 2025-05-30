/**
 * Returns the appropriate theme class based on the dark mode state.
 * @param {boolean} darkMode - Indicates whether dark mode is enabled.
 * @returns {string} - The theme class name.
 */
export const getThemeClass = (darkMode) => {
    return darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
};