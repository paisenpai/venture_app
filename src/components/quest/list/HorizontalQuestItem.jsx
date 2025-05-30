import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  formatListDate,
  getStatusDisplayName,
} from "../../../utils/QuestBoard/listViewUtils";
import SubtaskList from "./SubtaskList";
import MenuPortal from "../../../components/ui/MenuPortal";

const HorizontalQuestItem = ({
  item,
  subtasks = [],
  onEdit,
  onDelete,
  onChangeStatus,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Category styling
  const getCategoryStyle = (category) => {
    const styles = {
      Work: "bg-blue-100 text-blue-800",
      Personal: "bg-purple-100 text-purple-800",
      Learning: "bg-green-100 text-green-800",
      Health: "bg-red-100 text-red-800",
      Subtask: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-100 text-gray-800",
    };

    return styles[category] || styles.Other;
  };

  // Status styling
  const getStatusStyle = (status) => {
    const styles = {
      available: "bg-blue-100 text-blue-800",
      ongoing: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    };

    return styles[status] || styles.available;
  };

  // Handle menu toggle
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (showMenu) {
      setShowMenu(false);
      return;
    }

    const rect = menuButtonRef.current.getBoundingClientRect();
    setShowMenu(true);
  };

  // Menu options based on status
  const getMenuOptions = () => {
    const options = [];

    if (item.status === "available") {
      options.push({
        label: "Start Quest",
        action: () => onChangeStatus("ongoing"),
        icon: (
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      });
    } else if (item.status === "ongoing") {
      options.push({
        label: "Complete Quest",
        action: () => onChangeStatus("completed"),
        icon: (
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      });
    } else if (item.status === "completed") {
      options.push({
        label: "Restart Quest",
        action: () => onChangeStatus("available"),
        icon: (
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        ),
      });
    }

    return options;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Main row */}
      <div className="p-4 flex items-center gap-4">
        {/* Category badge */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getCategoryStyle(
            item.category
          )}`}
        >
          <span className="text-lg font-semibold">
            {item.category?.[0] || "?"}
          </span>
        </div>

        {/* Content column */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {/* Status pill */}
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(
                item.status
              )}`}
            >
              {getStatusDisplayName(item.status)}
            </span>

            {/* Due date */}
            {item.dueDate && (
              <span className="text-xs text-gray-500 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Due: {formatListDate(item.dueDate)}
              </span>
            )}

            {/* Priority */}
            {item.priority > 0 && (
              <span className="text-xs text-amber-600 flex items-center">
                {Array.from({ length: Math.min(item.priority, 4) }).map(
                  (_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  )
                )}
              </span>
            )}

            {/* XP reward */}
            <span className="text-xs text-indigo-600 flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {item.xp} XP
            </span>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Progress indicator if ongoing */}
          {item.status === "ongoing" && (
            <div className="w-16 flex flex-col">
              <span className="text-xs text-gray-500 text-center mb-1">
                {item.progress || 0}%
              </span>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${item.progress || 0}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Subtask toggle if any */}
          {subtasks.length > 0 && (
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              aria-label={showSubtasks ? "Hide subtasks" : "Show subtasks"}
            >
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showSubtasks ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}

          {/* Menu button */}
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Quest options"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtasks section */}
      {showSubtasks && subtasks.length > 0 && (
        <SubtaskList
          subtasks={subtasks}
          onEdit={onEditSubtask}
          onDelete={onDeleteSubtask}
          onChangeStatus={onChangeSubtaskStatus}
          parentId={item.id}
        />
      )}

      {/* Action menu portal */}
      <MenuPortal isOpen={showMenu}>
        <div
          ref={menuRef}
          className="absolute z-50 mt-2 bg-white rounded-md shadow-lg py-1 text-sm"
          style={{
            top: menuButtonRef.current
              ? menuButtonRef.current.getBoundingClientRect().bottom +
                window.scrollY
              : 0,
            right: 16,
          }}
        >
          {/* Status-based actions */}
          {getMenuOptions().map((option, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
              onClick={() => {
                option.action();
                setShowMenu(false);
              }}
            >
              {option.icon}
              {option.label}
            </button>
          ))}

          {/* Edit action */}
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => {
              onEdit();
              setShowMenu(false);
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          {/* Add subtask action */}
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => {
              onAddSubtask();
              setShowMenu(false);
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
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
            Add Subtask
          </button>

          {/* Delete action */}
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
            onClick={() => {
              onDelete();
              setShowMenu(false);
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
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
            Delete
          </button>
        </div>
      </MenuPortal>
    </div>
  );
};

HorizontalQuestItem.propTypes = {
  item: PropTypes.object.isRequired,
  subtasks: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func.isRequired,
  onEditSubtask: PropTypes.func.isRequired,
  onDeleteSubtask: PropTypes.func.isRequired,
  onChangeSubtaskStatus: PropTypes.func.isRequired,
};

export default HorizontalQuestItem;
