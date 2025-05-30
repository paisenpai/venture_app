import React from "react";
import PropTypes from "prop-types";

const AddQuestBoard = ({ onAddQuest }) => {
  return (
    <button
      onClick={onAddQuest}
      className="h-[160px] w-[320px] md:w-[360px] lg:w-[400px] min-w-[280px] flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition p-4"
    >
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1">
          Add New Quest
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Click to create a task
        </p>
      </div>
    </button>
  );
};

AddQuestBoard.propTypes = {
  onAddQuest: PropTypes.func.isRequired,
};

export default AddQuestBoard;
