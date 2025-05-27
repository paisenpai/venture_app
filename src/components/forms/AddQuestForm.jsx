import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";

const defaultQuestValues = {
  name: "",
  category: "Other",
  goal: "",
  xp: 50,
  priority: 1,
  status: "available",
  progress: 0,
};

const AddQuestForm = ({
  onSubmit,
  onClose,
  initialData = {},
  isSubtask = false,
}) => {
  // Set today's date as default for new quests
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Merge initialData with default values to ensure all fields are defined
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
  const formRef = useRef(null);

  // When isSubtask prop changes, update the form data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      isSubtask,
      type: isSubtask ? "subtask" : "default",
    }));
  }, [isSubtask]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close when clicking outside the form
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Calculate days left from a date string
  function calculateDaysLeft(dateString) {
    if (!dateString) return 0;

    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    const timeDifference = selectedDate - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  }

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
  const handleAddSubtask = () => {
    if (subtask.trim()) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [...prev.subtasks, subtask],
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle pressing Enter in subtask input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubtask();
    }
  };

  // Get background color for category display
  const getCategoryBgColor = (cat) => {
    return categoryColors[cat]?.split(" ")[0] || "bg-gray-200";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={formRef}
        className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData.name
            ? isSubtask
              ? "Edit Subtask"
              : "Edit Quest"
            : isSubtask
            ? "Add New Subtask"
            : "Add New Quest"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {isSubtask ? "Subtask Name" : "Quest Name"}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={isSubtask ? "Subtask Name" : "Quest Name"}
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              {Object.keys(categoryColors).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div
              className={`mt-1 w-6 h-6 rounded-full ${getCategoryBgColor(
                formData.category
              )}`}
            ></div>
          </div>

          <div>
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Goal
            </label>
            <input
              id="goal"
              type="text"
              name="goal"
              placeholder="Goal"
              value={formData.goal}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {!isSubtask && (
            <>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="daysLeft"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Days Left
                </label>
                <input
                  id="daysLeft"
                  type="number"
                  name="daysLeft"
                  value={formData.daysLeft}
                  className="border rounded p-2 w-full bg-gray-100"
                  readOnly
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="xp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              XP
            </label>
            <input
              id="xp"
              type="number"
              name="xp"
              placeholder="XP"
              value={formData.xp}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              {[1, 2, 3, 4].map((level) => (
                <option key={level} value={level}>
                  Priority {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              <option value="available">Available</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Subtask Section */}
          {!isSubtask && (
            <div>
              <h3 className="text-lg font-bold mb-2">Subtasks</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a subtask"
                  value={subtask}
                  onChange={(e) => setSubtask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border rounded p-2 flex-1"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Add
                </button>
              </div>
              <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
                {Array.isArray(formData.subtasks) &&
                  formData.subtasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-1"
                    >
                      <span className="truncate">{task}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(index)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* EXP Progress Bar for Subtasks */}
          {isSubtask && (
            <div>
              <h3 className="text-lg font-bold mb-2">Progress</h3>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleProgressChange}
                  className="w-full"
                />
                <span className="min-w-[40px] text-right">
                  {formData.progress}%
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${formData.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {initialData.name ? "Save Changes" : "Add"}
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
};

export default AddQuestForm;
