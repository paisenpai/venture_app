import React from "react";
import PropTypes from "prop-types";

const SectionHeader = ({ title, count, className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        {/* Counter circle positioned inline with title */}
        <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-semibold mr-3">
          {count}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      </div>

      {/* Horizontal line below the title */}
      <div className="mt-2 border-b border-gray-200 dark:border-gray-700"></div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  className: PropTypes.string,
};

export default SectionHeader;
