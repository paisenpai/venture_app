import React from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../../utils/QuestBoard/questBoardConstants";
import SwordShieldIcon from "../../assets/icons/SwordShield.png";
import classNames from "classnames";

const CalendarEventItem = ({
  item,
  onClick,
  onChangeStatus,
  onAddSubtask,
  onDelete,
  isDarkMode = false,
  style,
}) => {
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return isDarkMode
          ? "bg-green-800 text-green-100"
          : "bg-green-100 text-green-800";
      case "ongoing":
        return isDarkMode
          ? "bg-yellow-800 text-yellow-100"
          : "bg-yellow-100 text-yellow-800";
      case "available":
        return isDarkMode
          ? "bg-blue-800 text-blue-100"
          : "bg-blue-100 text-blue-800";
      default:
        return isDarkMode
          ? "bg-gray-700 text-gray-200"
          : "bg-gray-100 text-gray-800";
    }
  };

  // Safe access to category and get colors
  const categoryStr = item.category || "Other";
  const categoryStyle = categoryColors[categoryStr] || categoryColors.Other;
  const bgColor = categoryStyle.split(" ")[0] || "bg-gray-200";

  // Optional menu functionality
  const handleMenuClick = (e) => {
    e.stopPropagation();
    // Add menu functionality here if needed
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        "border rounded-lg p-4 cursor-pointer transition-shadow hover:shadow-md",
        isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
      )}
      style={style}
    >
      <div className="flex items-center justify-between mb-2">
        {/* Left side: category dot and title */}
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-8 h-8 rounded-full ${bgColor} flex-shrink-0`}
          ></div>
          <h4
            className={classNames(
              "font-medium truncate",
              isDarkMode ? "text-white" : "text-gray-800"
            )}
          >
            {item.name}
          </h4>
        </div>

        {/* Right side: status badge */}
        <div
          className={classNames(
            "px-2 py-0.5 rounded-full text-xs flex-shrink-0",
            getStatusColor(item.status)
          )}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </div>
      </div>

      {/* Description/goal (if available) */}
      {item.goal && (
        <div
          className={classNames(
            "mb-2 text-sm",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}
        >
          {item.goal.length > 60
            ? item.goal.substring(0, 57) + "..."
            : item.goal}
        </div>
      )}

      {/* Bottom row: XP, priority and more options */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          {/* XP indicator */}
          <div className="flex items-center gap-1">
            <img src={SwordShieldIcon} alt="XP" className="w-4 h-4" />
            <span
              className={classNames(
                "text-xs font-medium",
                isDarkMode ? "text-gray-200" : "text-gray-800"
              )}
            >
              {item.xp} XP
            </span>
          </div>

          {/* Priority stars */}
          {item.priority && (
            <div
              className={classNames(
                "px-2 py-0.5 rounded-md flex items-center",
                isDarkMode ? "bg-yellow-900" : "bg-yellow-100"
              )}
            >
              {Array.from({ length: Math.min(item.priority || 1, 4) }).map(
                (_, i) => (
                  <span
                    key={i}
                    className={
                      isDarkMode
                        ? "text-yellow-400 text-xs"
                        : "text-yellow-500 text-xs"
                    }
                  >
                    ★
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* Quick actions */}
        {(onChangeStatus || onAddSubtask || onDelete) && (
          <div className="flex items-center gap-2">
            {onAddSubtask && !item.isSubtask && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddSubtask();
                }}
                className={classNames(
                  "p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600",
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className={classNames(
                  "p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600",
                  isDarkMode ? "text-red-400" : "text-red-500"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CalendarEventItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onAddSubtask: PropTypes.func,
  onDelete: PropTypes.func,
  isDarkMode: PropTypes.bool,
  style: PropTypes.object,
};

export default CalendarEventItem;
