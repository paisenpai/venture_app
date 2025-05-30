import React, { useCallback } from "react";
import PropTypes from "prop-types";

const AddQuestSlate = ({ onAddQuest }) => {
  // Handle key press for accessibility
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        onAddQuest();
        e.preventDefault();
      }
    },
    [onAddQuest]
  );

  return (
    <div
      onClick={onAddQuest}
      className="rounded-xl mb-6 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
      style={{
        width: "100%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "2px dashed #e2e8f0",
        borderRadius: "12px",
        backgroundColor: "white",
      }}
      role="button"
      aria-label="Add new quest"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center">
        <span className="text-4xl text-gray-400 mr-3">+</span>
        <span className="text-lg text-gray-500">Add New Quest</span>
      </div>
    </div>
  );
};

AddQuestSlate.propTypes = {
  onAddQuest: PropTypes.func.isRequired,
};

export default AddQuestSlate;
