import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../../utils/QuestBoard/questBoardConstants";
import {
  getDaysLeftStyle,
  formatDate,
} from "../../../utils/QuestBoard/boardUtils";
import SwordShieldIcon from "../../../assets/icons/SwordShield.png";
import MenuPortal from "../../ui/MenuPortal";

const QuestCard = ({
  id,
  name = "",
  category = "",
  goal = "",
  dueDate,
  xp = 0,
  priority = 0,
  status = "available",
  progress = 0,
  daysLeft,
  type = "default",
  toggleMenu,
  isMenuOpen,
  menuPosition = { top: 0, left: 0 },
  setActiveMenuId,
  subtasks = [], // We'll still accept this prop but won't display a subtask indicator
  onEdit,
  onDelete,
  onChangeStatus,
  onAddSubtask,
}) => {
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Calculate if quest is overdue
  const isOverdue = status !== "completed" && daysLeft < 0;

  // Get styling for days left
  const daysLeftStyle = getDaysLeftStyle(daysLeft);

  // Get category styling
  const categoryColor = categoryColors[category] || categoryColors.Other;
  const bgColor = categoryColor.split(" ")[0];
  const textColor = categoryColor.split(" ")[1] || "text-gray-800";

  // Handle menu toggle
  const handleMenuToggle = (e) => {
    e.stopPropagation();
    toggleMenu(type === "subtask" ? `subtask-${id}` : id, menuButtonRef);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setActiveMenuId]);

  return (
    <div className="h-[220px] w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <div
        className={`h-full w-full p-4 flex flex-col ${
          type === "subtask"
            ? "border-l-4 border-purple-400 dark:border-purple-600"
            : ""
        }`}
      >
        {/* Layer 1: Top row - Category circle, Task name, Settings */}
        <div className="flex items-center mb-3">
          {/* Category circle */}
          <div
            className={`w-9 h-9 ${bgColor} rounded-full flex-shrink-0 flex items-center justify-center`}
          >
            {type === "subtask" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          {/* Task name */}
          <div className="flex-grow mx-2 overflow-hidden">
            <h3 className="font-bold text-base text-gray-800 dark:text-gray-100 line-clamp-1">
              {name}
            </h3>
          </div>

          {/* Settings button (three dots) */}
          <button
            ref={menuButtonRef}
            onClick={handleMenuToggle}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Quest options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        {/* Layer 2: Category name, separator, goal - with fixed height */}
        <div
          className="flex items-center text-sm mb-3"
          style={{ minHeight: "20px" }}
        >
          <span className={`${textColor} dark:text-gray-300 text-xs`}>
            {category}
          </span>
          <span
            className={`mx-2 inline-block w-1.5 h-1.5 rounded-full ${bgColor}`}
          ></span>
          <span className="text-gray-600 dark:text-gray-400 text-xs truncate">
            {goal}
          </span>
        </div>

        {/* Layer 3: Deadline info or Progress for subtask - with fixed height */}
        <div style={{ minHeight: "32px" }}>
          {type === "default" ? (
            <div className="flex items-center flex-wrap gap-1">
              {daysLeft !== null && (
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: daysLeftStyle.bg,
                    color: daysLeftStyle.color,
                  }}
                >
                  {isOverdue
                    ? `${Math.abs(daysLeft)}d Overdue`
                    : daysLeft === 0
                    ? "Due Today"
                    : `${daysLeft}d Left`}
                </span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {formatDate(dueDate) || "No due date"}
              </span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {progress}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-yellow-400 dark:bg-yellow-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Flexible space to push the bottom content down */}
        <div className="flex-grow"></div>

        {/* Layer 4: Priority and XP reward - fixed at bottom */}
        <div className="flex items-center justify-between mt-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-lg flex items-center">
            {Array.from({ length: Math.min(priority || 1, 4) }).map((_, i) => (
              <span
                key={i}
                className="text-yellow-500 dark:text-yellow-400 text-xs"
              >
                ★
              </span>
            ))}
          </div>
          <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-lg">
            <img src={SwordShieldIcon} alt="XP" className="w-4 h-4 mr-1" />
            <span className="font-medium text-xs text-indigo-600 dark:text-indigo-400">
              {xp} XP
            </span>
          </div>
        </div>

        {/* Subtask indicator removed - this was previously here */}
      </div>

      {/* Menu portal */}
      <MenuPortal isOpen={isMenuOpen}>
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: `${menuPosition?.top || 0}px`,
            left: `${menuPosition?.left || 0}px`,
            zIndex: 1000,
          }}
          className="w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            <button
              onClick={() => {
                onEdit();
                setActiveMenuId(null);
              }}
              className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Edit</span>
            </button>

            {/* Status change options */}
            {status === "available" && (
              <button
                onClick={() => {
                  onChangeStatus("ongoing");
                  setActiveMenuId(null);
                }}
                className="flex w-full px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2 text-yellow-500 dark:text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Start Quest</span>
              </button>
            )}

            {status === "ongoing" && (
              <button
                onClick={() => {
                  onChangeStatus("completed");
                  setActiveMenuId(null);
                }}
                className="flex w-full px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2 text-green-500 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Complete</span>
              </button>
            )}

            {/* Add subtask option (only for default quests) */}
            {type === "default" && onAddSubtask && (
              <button
                onClick={() => {
                  onAddSubtask();
                  setActiveMenuId(null);
                }}
                className="flex w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
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
                <span>Add Subtask</span>
              </button>
            )}

            {/* Delete option */}
            <button
              onClick={() => {
                onDelete();
                setActiveMenuId(null);
              }}
              className="flex w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-4 h-4 mr-2 text-red-500 dark:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
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
              <span>Delete</span>
            </button>
          </div>
        </div>
      </MenuPortal>
    </div>
  );
};

QuestCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  category: PropTypes.string,
  goal: PropTypes.string,
  dueDate: PropTypes.string,
  xp: PropTypes.number,
  priority: PropTypes.number,
  status: PropTypes.string,
  progress: PropTypes.number,
  daysLeft: PropTypes.number,
  type: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool,
  menuPosition: PropTypes.object,
  setActiveMenuId: PropTypes.func.isRequired,
  subtasks: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func,
};

export default QuestCard;
