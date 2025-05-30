import React from "react";
import PropTypes from "prop-types";

const EmptyQuestList = ({ message = "No tasks to show" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-center">{message}</p>
      <p className="text-gray-400 text-sm mt-1">
        Add a new quest to get started
      </p>
    </div>
  );
};

EmptyQuestList.propTypes = {
  message: PropTypes.string,
};

export default EmptyQuestList;
