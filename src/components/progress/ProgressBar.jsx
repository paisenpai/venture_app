import React from "react";
import PropTypes from "prop-types";

/**
 * Shows task, XP, or level progress.
 *
 * This component displays the progress of a task,
 * experience points (XP), or the current level in a user interface.
 * It provides a visual representation of the progress made.
 */
const ProgressBar = ({
  value,
  maxValue = 100,
  height = "h-2",
  backgroundColor = "bg-gray-200",
  fillColor = "bg-blue-600",
  rounded = true,
  animated = false,
  label = false,
}) => {
  // Calculate percentage
  const percentage = (Math.min(Math.max(0, value), maxValue) / maxValue) * 100;

  // Determine rounding classes
  const roundedClass = rounded ? "rounded-full" : "";

  // Determine animation classes
  const animationClass = animated ? "transition-all duration-500 ease-out" : "";

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`w-full ${height} ${backgroundColor} ${roundedClass} overflow-hidden`}
      >
        <div
          className={`${fillColor} ${height} ${roundedClass} ${animationClass}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={maxValue}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  fillColor: PropTypes.string,
  rounded: PropTypes.bool,
  animated: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ProgressBar;
