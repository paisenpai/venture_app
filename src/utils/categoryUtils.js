/**
 * Get background color class for a category
 * @param {string} category - The category name
 * @returns {string} - CSS class for the background color
 */
export const getCategoryBgColor = (category) => {
  // If you have a categoryColors object defined elsewhere, import it
  // For now we'll provide a basic implementation
  const categoryColors = {
    Work: "bg-blue-500",
    Personal: "bg-green-500",
    Learning: "bg-yellow-500",
    Health: "bg-red-500",
    Subtask: "bg-purple-500",
    Other: "bg-gray-500",
  };

  return categoryColors[category] || "bg-gray-200";
};

export default getCategoryBgColor;
