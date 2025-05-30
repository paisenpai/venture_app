import { useState, useEffect } from "react";

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

/**
 * Calculate days left from a date string
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {number} - Number of days left (0 if date is in the past)
 */
const calculateDaysLeft = (dateString) => {
  if (!dateString) return 0;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time part for accurate day comparison

  const selectedDate = new Date(dateString);
  const timeDifference = selectedDate - currentDate;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : 0;
};

/**
 * Default values for new quests
 */
const defaultQuestValues = {
  name: "",
  category: "Other",
  goal: "",
  xp: 50,
  priority: 1,
  status: "available",
  progress: 0,
};

/**
 * Custom hook for managing quest form state and logic
 */
export const useQuestForm = (initialData = {}, isSubtask = false) => {
  // Set up form state with default values
  const [formData, setFormData] = useState({
    name: initialData.name || defaultQuestValues.name,
    category: initialData.category || defaultQuestValues.category,
    goal: initialData.goal || defaultQuestValues.goal,
    dueDate: initialData.dueDate || getTodayDate(),
    xp: initialData.xp ?? defaultQuestValues.xp,
    daysLeft:
      initialData.daysLeft ??
      calculateDaysLeft(initialData.dueDate || getTodayDate()),
    priority: initialData.priority ?? defaultQuestValues.priority,
    status: initialData.status || defaultQuestValues.status,
    subtasks: initialData.subtasks || [],
    progress: initialData.progress ?? defaultQuestValues.progress,
    isSubtask: isSubtask,
    type: isSubtask ? "subtask" : "default",
  });

  const [subtask, setSubtask] = useState("");

  // When isSubtask prop changes, update the form data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      isSubtask,
      type: isSubtask ? "subtask" : "default",
    }));
  }, [isSubtask]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically calculate daysLeft when dueDate changes
    if (name === "dueDate") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        daysLeft: calculateDaysLeft(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add a subtask to the list
  const handleAddSubtask = (newSubtask) => {
    const subtaskToAdd = newSubtask || subtask;
    if (subtaskToAdd.trim()) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [...prev.subtasks, subtaskToAdd],
      }));
      setSubtask(""); // Clear input field
    }
  };

  // Remove a subtask from the list
  const handleRemoveSubtask = (index) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index),
    }));
  };

  // Update progress for subtasks
  const handleProgressChange = (e) => {
    const progress = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 100);
    setFormData((prev) => ({ ...prev, progress }));
  };

  return {
    formData,
    subtask,
    setSubtask,
    handleChange,
    handleAddSubtask,
    handleRemoveSubtask,
    handleProgressChange,
  };
};

export default useQuestForm;
