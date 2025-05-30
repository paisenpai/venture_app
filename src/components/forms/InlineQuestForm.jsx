import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { componentStyles } from "../../styles/designSystem";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";

/**
 * Form component for creating or editing quests
 */
const InlineQuestForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    category: initialData.category || "Other",
    dueDate: initialData.dueDate || today,
    priority: initialData.priority || 1,
    xp: initialData.xp || 50,
    goal: initialData.goal || "",
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={componentStyles.input}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={componentStyles.select}
          >
            {Object.keys(categoryColors).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={componentStyles.input}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={componentStyles.select}
          >
            {[1, 2, 3, 4].map((level) => (
              <option key={level} value={level}>
                Priority {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            XP Value
          </label>
          <input
            type="number"
            name="xp"
            min="0"
            value={formData.xp}
            onChange={handleChange}
            className={componentStyles.input}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={componentStyles.select}
          >
            <option value="available">Available</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Goal</label>
        <textarea
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className={componentStyles.textarea}
          rows="2"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 mt-5">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button type="submit" className={componentStyles.button.primary}>
          {initialData.id ? "Update Quest" : "Create Quest"}
        </button>
      </div>
    </form>
  );
};

InlineQuestForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default InlineQuestForm;
