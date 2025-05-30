import React, { useState } from "react";
import PropTypes from "prop-types";

const SubtaskInputSection = ({ subtasks = [], onAdd, onRemove }) => {
  const [subtask, setSubtask] = useState("");

  const handleAddSubtask = () => {
    if (subtask.trim()) {
      onAdd(subtask);
      setSubtask(""); // Clear input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubtask();
    }
  };

  return (
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
        {Array.isArray(subtasks) &&
          subtasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-1">
              <span className="truncate">{task}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

SubtaskInputSection.propTypes = {
  subtasks: PropTypes.array,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SubtaskInputSection;
