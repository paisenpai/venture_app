import React, { useState } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";
import { deadlineColors } from "../../theme/colors";
import SwordShieldIcon from "../../assets/icons/SwordShield.png";

const QuestItem = ({
  item,
  onEdit,
  onDelete,
  onChangeStatus,
  onAddSubtask,
}) => {
  const [showActions, setShowActions] = useState(false);

  // Safe access to get category colors
  const categoryStr = item.category || "Other";
  const categoryStyle = categoryColors[categoryStr] || categoryColors.Other;
  const bgColor = categoryStyle.split(" ")[0] || "bg-gray-200";

  // Determine days left styling
  const isOverdue = item.status !== "completed" && item.daysLeft < 0;
  const getDaysLeftStyle = () => {
    if (item.daysLeft === null) return deadlineColors.none;
    if (item.daysLeft < 0) return deadlineColors.overdue;
    if (item.daysLeft <= 2) return deadlineColors.urgent;
    if (item.daysLeft <= 7) return deadlineColors.soon;
    return deadlineColors.comfortable;
  };
  const daysLeftStyle = getDaysLeftStyle();

  // Get status badge color
  const getStatusColor = () => {
    switch (item.status) {
      case "available":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format due date
  const formattedDate = item.dueDate
    ? new Date(item.dueDate).toLocaleDateString()
    : "No date";

  return (
    <div
      className="p-4 relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center gap-4">
        {/* Status checkbox */}
        <div>
          <button
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
              ${
                item.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : item.status === "ongoing"
                  ? "border-yellow-500"
                  : "border-gray-300 dark:border-gray-600"
              }
            `}
            onClick={() => {
              if (item.status === "completed") {
                onChangeStatus("available");
              } else if (item.status === "ongoing") {
                onChangeStatus("completed");
              } else {
                onChangeStatus("ongoing");
              }
            }}
            aria-label={`Mark as ${
              item.status === "completed" ? "not completed" : "completed"
            }`}
          >
            {item.status === "completed" && (
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Content area */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            {/* Category badge */}
            <span className={`text-xs px-2 py-0.5 rounded ${categoryStyle}`}>
              {categoryStr}
            </span>

            {/* Status badge */}
            <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor()}`}>
              {item.status || "available"}
            </span>

            {/* Type badge for subtasks */}
            {item.type === "subtask" && (
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Subtask
              </span>
            )}
          </div>

          {/* Name / Title */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1 truncate">
            {item.name}
          </h3>

          {/* Goal / Description */}
          {item.goal && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
              {item.goal}
            </p>
          )}

          {/* Deadline and XP row */}
          <div className="flex items-center justify-between text-sm mt-2">
            <div className={`${daysLeftStyle}`}>
              {isOverdue ? (
                <span className="font-medium">
                  Overdue by {Math.abs(item.daysLeft)} days
                </span>
              ) : (
                item.daysLeft !== null && (
                  <span>
                    Due{" "}
                    {item.daysLeft === 0 ? "today" : `in ${item.daysLeft} days`}
                  </span>
                )
              )}
              {item.dueDate && (
                <span className="ml-1 text-gray-500">({formattedDate})</span>
              )}
            </div>

            {/* XP indicator */}
            <div className="flex items-center">
              <img src={SwordShieldIcon} alt="XP" className="w-4 h-4 mr-1" />
              <span className="font-medium">{item.xp || 0} XP</span>
            </div>
          </div>

          {/* Parent quest reference for subtasks */}
          {item.type === "subtask" && item.parentName && (
            <div className="text-xs text-gray-500 mt-1">
              From: {item.parentName}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div
          className={`flex gap-2 ${
            showActions ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          {/* Only show add subtask button for main quests */}
          {item.type === "quest" && onAddSubtask && (
            <button
              onClick={onAddSubtask}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
              title="Add subtask"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}

          <button
            onClick={onEdit}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                onDelete();
              }
            }}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
            title="Delete"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

QuestItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func,
};

export default QuestItem;
