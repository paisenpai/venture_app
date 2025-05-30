import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AddQuestForm = ({
  onSubmit,
  onClose,
  initialData = {},
  isSubtask = false,
  isOpen = true,
  isSubmitting = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: isSubtask ? "Subtask" : "Personal",
    goal: "",
    dueDate: "",
    xp: isSubtask ? 5 : 10,
    priority: 1,
    ...initialData,
  });

  const [formError, setFormError] = useState(null);
  const nameInputRef = useRef(null);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  // Reset form when initialData changes
  useEffect(() => {
    setFormData({
      name: "",
      category: isSubtask ? "Subtask" : "Personal",
      goal: "",
      dueDate: "",
      xp: isSubtask ? 5 : 10,
      priority: 1,
      ...initialData,
    });
    setFormError(null);

    // If editing a quest with subtasks, load them
    if (initialData && initialData.subtasks) {
      setSubtasks(initialData.subtasks);
      setShowSubtasks(initialData.subtasks.length > 0);
    } else {
      setSubtasks([]);
      setShowSubtasks(false);
    }
  }, [initialData, isSubtask]);

  // Focus the name input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error("Quest name is required");
      }

      onSubmit({
        ...formData,
        subtasks: subtasks.length > 0 ? subtasks : undefined,
      });
    } catch (err) {
      console.error("Form validation error:", err);
      setFormError(err.message || "Failed to submit form");
    }
  };

  const addSubtask = () => {
    const newSubtask = {
      id: `temp-${Date.now()}`, // Temporary ID, will be replaced server-side
      name: "",
      status: "available",
      isSubtask: true,
    };
    setSubtasks([...subtasks, newSubtask]);
    setShowSubtasks(true);
  };

  const updateSubtask = (index, field, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = {
      ...updatedSubtasks[index],
      [field]: value,
    };
    setSubtasks(updatedSubtasks);
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
    if (updatedSubtasks.length === 0) {
      setShowSubtasks(false);
    }
  };

  const modalTitle = isSubtask
    ? initialData.id
      ? "Edit Subtask"
      : "Add New Subtask"
    : initialData.id
    ? "Edit Quest"
    : "Add New Quest";

  // Categories for dropdown
  const categories = isSubtask
    ? ["Subtask", "Critical", "Optional"]
    : [
        "Personal",
        "Work",
        "Health",
        "Education",
        "Financial",
        "Social",
        "Other",
      ];

  // If modal is closed, don't render anything
  if (!isOpen && typeof window !== "undefined") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 shadow-xl">
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <div className="w-6 h-6 relative transform rotate-45">
              <div className="absolute bg-gray-500 rounded-md w-6 h-1.5 top-2"></div>
              <div className="absolute bg-gray-500 rounded-md h-6 w-1.5 left-2"></div>
            </div>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="space-y-8">
            {/* Show error if any */}
            {(formError || error) && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md p-3 text-sm">
                {formError || error}
              </div>
            )}

            {/* Quest Name - Large Input */}
            <div className="shadow-lg rounded-xl">
              <input
                ref={nameInputRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-9 py-6 text-2xl italic font-light text-gray-500 placeholder-gray-400 border-0 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Quest Name"
              />
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
              <div className="flex items-center">
                <label
                  htmlFor="category"
                  className="w-24 font-bold text-gray-500 text-lg"
                >
                  Category
                </label>
                <div className="flex-1">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="goal"
                  className="w-24 font-bold text-gray-500 text-lg"
                >
                  Goal
                </label>
                <div className="flex-1">
                  <input
                    id="goal"
                    name="goal"
                    value={formData.goal || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 focus:outline-none"
                    placeholder="Set your goal"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="dueDate"
                  className="w-24 font-bold text-gray-500 text-lg"
                >
                  Date
                </label>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 shadow-md rounded-xl border-0 text-gray-500 italic font-light focus:outline-none appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 relative">
                      <div className="absolute w-2.5 h-2 bg-gray-500 rounded-sm transform rotate-45 left-0 top-1.5"></div>
                      <div className="absolute w-2.5 h-2 bg-gray-500 rounded-sm transform -rotate-45 right-0 top-1.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="priority"
                  className="w-24 font-bold text-gray-500 text-lg"
                >
                  Deadline
                </label>
                <div className="flex-1 relative">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority || 1}
                    onChange={handleChange}
                    className="w-full px-3 py-2 shadow-md rounded-xl border-0 text-gray-500 italic font-light focus:outline-none appearance-none"
                  >
                    <option value={1}>Low Priority</option>
                    <option value={2}>Medium Priority</option>
                    <option value={3}>High Priority</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-4 h-4 relative">
                      <div className="absolute w-2.5 h-2 bg-gray-500 rounded-sm transform rotate-45 left-0 top-1.5"></div>
                      <div className="absolute w-2.5 h-2 bg-gray-500 rounded-sm transform -rotate-45 right-0 top-1.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Quests Section */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-xl font-bold text-gray-500">Side Quests</h3>
                <div className="flex-1 border-t border-gray-300 border-opacity-50"></div>
              </div>

              <div className="flex">
                <div className="flex-1">
                  {/* Subtasks List */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4">
                    {subtasks.map((subtask, index) => (
                      <div
                        key={subtask.id || index}
                        className="flex items-center gap-2 p-3 bg-white rounded-xl shadow border border-gray-200"
                      >
                        <input
                          type="text"
                          value={subtask.name || ""}
                          onChange={(e) =>
                            updateSubtask(index, "name", e.target.value)
                          }
                          className="flex-1 border-0 focus:ring-0 text-gray-600"
                          placeholder="Subtask name"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubtask(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Add Subtask Button */}
                    <button
                      type="button"
                      onClick={addSubtask}
                      className="w-full h-16 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-1.5 h-8 bg-gray-500 rounded"></div>
                          <div className="w-8 h-1.5 bg-gray-500 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Scrollbar styling - purely decorative */}
                <div className="w-3 ml-3">
                  <div className="w-2 h-full rounded-full bg-gray-200 mx-auto relative">
                    <div className="absolute top-0 left-0 right-0 w-3 h-[90%] bg-gray-400 bg-opacity-60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions - custom styled buttons */}
            <div className="border-t border-gray-300 border-opacity-50 pt-4">
              <div className="flex justify-center space-x-4 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="h-15 px-5 py-4 bg-red-100 text-red-700 font-medium rounded-xl flex items-center gap-4 hover:bg-red-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xl">Delete</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-15 px-5 py-4 bg-green-100 text-green-700 font-medium rounded-xl flex items-center gap-4 hover:bg-green-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xl">
                    {isSubmitting
                      ? "Saving..."
                      : initialData.id
                      ? "Save"
                      : "Complete"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddQuestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isSubtask: PropTypes.bool,
  isOpen: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
};

export default AddQuestForm;
