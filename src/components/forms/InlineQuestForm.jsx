import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";

const InlineQuestForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    category: initialData.category || "Other",
    goal: initialData.goal || "",
    dueDate: initialData.dueDate || today,
    xp: initialData.xp || 50,
    priority: initialData.priority || 1,
    status: initialData.status || "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Goal
        </label>
        <input
          type="text"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          XP
        </label>
        <input
          type="number"
          name="xp"
          value={formData.xp}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
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

      <div className="col-span-full flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {initialData.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

InlineQuestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default InlineQuestForm;
