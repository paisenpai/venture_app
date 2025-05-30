import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import trashIcon from "../../assets/icons/trash-bin.svg";
import checkedIcon from "../../assets/icons/checked.svg";

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
    deadline: "",
    xp: isSubtask ? 5 : 10,
    priority: 1,
    ...initialData,
  });

  const [formError, setFormError] = useState(null);
  const nameInputRef = useRef(null);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

  // Reset form when initialData changes
  useEffect(() => {
    setFormData({
      name: "",
      category: isSubtask ? "Subtask" : "Personal",
      goal: "",
      dueDate: "",
      deadline: "",
      xp: isSubtask ? 5 : 10,
      priority: 1,
      ...initialData,
    });
    setFormError(null);

    // If editing a quest with subtasks, load them
    if (initialData?.subtasks?.length) {
      setSubtasks(initialData.subtasks);
      setShowSubtasks(true);
    } else {
      setSubtasks([]);
      setShowSubtasks(false);
    }
  }, [initialData, isSubtask]);

  // Focus the name input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => nameInputRef.current.focus(), 50);
    }
  }, [isOpen]);

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (showDatePicker || showDeadlinePicker) &&
        !event.target.closest(".date-picker-container")
      ) {
        setShowDatePicker(false);
        setShowDeadlinePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker, showDeadlinePicker]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });

    if (field === "dueDate") setShowDatePicker(false);
    if (field === "deadline") setShowDeadlinePicker(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    try {
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
      id: `temp-${Date.now()}`,
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

  // If modal is closed, don't render anything
  if (!isOpen && typeof window !== "undefined") {
    return null;
  }

  // Categories for dropdown
  const categories = useMemo(
    () =>
      isSubtask
        ? ["Subtask", "Critical", "Optional"]
        : [
            "Personal",
            "Work",
            "Health",
            "Education",
            "Financial",
            "Social",
            "Other",
          ],
    [isSubtask]
  );

  // Generate days for date pickers
  const generateDays = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i + 1),
    []
  );

  // Generate months for date pickers
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  // Generate years for date pickers
  const generateYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => currentYear + i);
  }, []);

  const handleDateSelectChange = (e, field, datePart) => {
    const value = parseInt(e.target.value, 10);
    const newDate =
      field === "dueDate"
        ? new Date(formData.dueDate || new Date())
        : new Date(formData.deadline || new Date());

    if (datePart === "month") newDate.setMonth(value);
    if (datePart === "day") newDate.setDate(value);
    if (datePart === "year") newDate.setFullYear(value);

    handleDateChange(newDate.toISOString(), field);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full mx-4 shadow-xl border border-gray-100">
        {/* Close button */}
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="px-8 pb-6">
          {/* Error message */}
          {(formError || error) && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md p-3 text-sm">
              {formError || error}
            </div>
          )}

          {/* Quest Name Input */}
          <div className="mb-4">
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3.5 text-xl italic font-light text-gray-500 placeholder-gray-400 border-none rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Enter Quest Name"
            />
          </div>

          {/* Quest Details Fields */}
          <div className="mb-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex items-center">
                <label className="w-24 text-sm font-medium text-gray-500">
                  Category
                </label>
                <div className="relative flex-1">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-4 pr-8 py-2 bg-gray-100 border-none rounded-full text-sm text-gray-500 focus:outline-none appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none flex">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div className="flex items-center">
                <label
                  htmlFor="goal"
                  className="w-24 text-sm font-medium text-gray-500"
                >
                  Goal
                </label>
                <div className="relative flex-1">
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal || ""}
                    onChange={handleChange}
                    className="w-full pl-4 pr-8 py-2 bg-gray-100 border-none rounded-full text-sm text-gray-500 focus:outline-none appearance-none"
                  >
                    <option value="">Select Goal</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none flex">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center">
                <label
                  htmlFor="dueDate"
                  className="w-24 text-sm font-medium text-gray-500"
                >
                  Date
                </label>
                <div className="relative flex-1 date-picker-container">
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-white border-none rounded-xl shadow-md text-sm text-gray-500 text-left focus:outline-none italic font-light flex justify-between items-center"
                    onClick={() => {
                      setShowDatePicker(!showDatePicker);
                      setShowDeadlinePicker(false);
                    }}
                  >
                    <span>
                      {formData.dueDate
                        ? formatDate(formData.dueDate)
                        : "Select Date"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        showDatePicker ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Date Picker dropdown */}
                  {showDatePicker && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl">
                      <div className="p-3">
                        <div className="flex space-x-3">
                          <select
                            className="p-2 text-base border rounded flex-1"
                            value={
                              formData.dueDate
                                ? new Date(formData.dueDate).getMonth()
                                : new Date().getMonth()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "dueDate", "month")
                            }
                          >
                            {months.map((month, i) => (
                              <option key={month} value={i}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            className="p-2 text-base border rounded w-20"
                            value={
                              formData.dueDate
                                ? new Date(formData.dueDate).getDate()
                                : new Date().getDate()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "dueDate", "day")
                            }
                          >
                            {generateDays().map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>

                          <select
                            className="p-2 text-base border rounded w-24"
                            value={
                              formData.dueDate
                                ? new Date(formData.dueDate).getFullYear()
                                : new Date().getFullYear()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "dueDate", "year")
                            }
                          >
                            {generateYears().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-3 flex justify-between">
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md"
                            onClick={() =>
                              handleDateChange(
                                new Date().toISOString(),
                                "dueDate"
                              )
                            }
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md"
                            onClick={() => setShowDatePicker(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center">
                <label
                  htmlFor="deadline"
                  className="w-24 text-sm font-medium text-gray-500"
                >
                  Deadline
                </label>
                <div className="relative flex-1 date-picker-container">
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-white border-none rounded-xl shadow-md text-sm text-gray-500 text-left focus:outline-none italic font-light flex justify-between items-center"
                    onClick={() => {
                      setShowDeadlinePicker(!showDeadlinePicker);
                      setShowDatePicker(false);
                    }}
                  >
                    <span>
                      {formData.deadline
                        ? formatDate(formData.deadline)
                        : "Select Deadline"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        showDeadlinePicker ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Deadline Picker dropdown */}
                  {showDeadlinePicker && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl">
                      <div className="p-3">
                        <div className="flex space-x-3">
                          <select
                            className="p-2 text-base border rounded flex-1"
                            value={
                              formData.deadline
                                ? new Date(formData.deadline).getMonth()
                                : new Date().getMonth()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "deadline", "month")
                            }
                          >
                            {months.map((month, i) => (
                              <option key={month} value={i}>
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            className="p-2 text-base border rounded w-20"
                            value={
                              formData.deadline
                                ? new Date(formData.deadline).getDate()
                                : new Date().getDate()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "deadline", "day")
                            }
                          >
                            {generateDays().map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>

                          <select
                            className="p-2 text-base border rounded w-24"
                            value={
                              formData.deadline
                                ? new Date(formData.deadline).getFullYear()
                                : new Date().getFullYear()
                            }
                            onChange={(e) =>
                              handleDateSelectChange(e, "deadline", "year")
                            }
                          >
                            {generateYears().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-3 flex justify-between">
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md"
                            onClick={() =>
                              handleDateChange(
                                new Date().toISOString(),
                                "deadline"
                              )
                            }
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md"
                            onClick={() => setShowDeadlinePicker(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center col-span-2 sm:col-span-1">
                <label
                  htmlFor="priority"
                  className="w-24 text-sm font-medium text-gray-500"
                >
                  Priority
                </label>
                <div className="relative flex-1">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full pl-4 pr-8 py-2 bg-gray-100 border-none rounded-full text-sm text-gray-500 focus:outline-none appearance-none"
                  >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                    <option value={4}>Critical</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none flex">
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Quests */}
          <div className="mb-5">
            <h3 className="text-base font-bold text-gray-500 mb-2 flex items-center">
              Side Quests
              <span className="ml-3 flex-grow h-0.5 bg-gray-200"></span>
            </h3>

            {/* Unified container with integrated custom scrollbar */}
            <div className="h-48 overflow-hidden relative border border-gray-100 rounded-xl shadow-sm">
              {/* Main content container with built-in scrolling */}
              <div className="h-full overflow-y-auto p-2">
                {/* Add button slate - now inside the container */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-12 mb-3 hover:bg-gray-50 transition-colors">
                  <button
                    type="button"
                    onClick={addSubtask}
                    className="text-gray-400 hover:text-gray-500 flex items-center justify-center w-full h-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-xs font-medium">Add Side Quest</span>
                  </button>
                </div>

                {/* Subtasks list */}
                {subtasks.length > 0 ? (
                  subtasks.map((subtask, index) => (
                    <div
                      key={subtask.id || index}
                      className="flex items-center gap-2 p-2 mb-2 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="text"
                        value={subtask.name || ""}
                        onChange={(e) =>
                          updateSubtask(index, "name", e.target.value)
                        }
                        className="flex-1 border-0 focus:ring-0 text-gray-600 text-sm py-0.5"
                        placeholder="Subtask name"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubtask(index)}
                        className="text-red-500 hover:text-red-700 text-base transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-28 text-gray-400 mt-2">
                    <p className="text-xs">No side quests added yet</p>
                    <p className="text-xs mt-1">
                      Use the button above to add one
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Form Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-xl hover:bg-red-200 transition-colors flex items-center gap-2 text-sm"
            >
              <img src={trashIcon} alt="Delete" className="h-5 w-5" />
              Delete
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-xl hover:bg-green-200 transition-colors flex items-center gap-2 text-sm"
            >
              <img src={checkedIcon} alt="Complete" className="h-5 w-5" />
              Complete
            </button>
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
