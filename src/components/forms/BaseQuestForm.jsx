import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Base form component that can be extended by other quest form components
 */
const BaseQuestForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  onDelete,
  submitButtonText = "Save",
  cancelButtonText = "Cancel",
  deleteButtonText = "Delete",
  showDeleteButton = false,
  className = "",
}) => {
  // Default form fields, combined with initialData
  const defaultValues = {
    name: "",
    category: "Other",
    goal: "",
    xp: 50,
    priority: 1,
    status: "available",
    progress: 0,
    dueDate: "",
    ...initialData,
  };

  const [formData, setFormData] = useState(defaultValues);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Handle different input types
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Form cancellation
  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className={`quest-form ${className}`}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
          <option value="Health">Health</option>
          <option value="Subtask">Subtask</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="goal">Goal</label>
        <textarea
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="form-control"
          rows="3"
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="xp">XP</label>
          <input
            type="number"
            id="xp"
            name="xp"
            value={formData.xp}
            onChange={handleChange}
            min="0"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-control"
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
            <option value={4}>Urgent</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-control"
        >
          <option value="available">Available</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {formData.status === "ongoing" && (
        <div className="form-group">
          <label htmlFor="progress">Progress ({formData.progress}%)</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            min="0"
            max="100"
            className="form-control"
          />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          {cancelButtonText}
        </button>
        {showDeleteButton && onDelete && (
          <button type="button" onClick={onDelete} className="btn btn-danger">
            {deleteButtonText}
          </button>
        )}
      </div>
    </form>
  );
};

BaseQuestForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
  showDeleteButton: PropTypes.bool,
  className: PropTypes.string,
};

export default BaseQuestForm;
