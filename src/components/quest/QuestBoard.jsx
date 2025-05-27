import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";
import SwordShieldIcon from "../../assets/icons/SwordShield.png"; // Import the SwordShield image

// Fixed size hook for ALL boards (add, quest, subtask) - perfectly consistent
const useFixedBoardSize = () => {
  // Set consistent fixed dimensions for all boards
  return {
    width: "w-[320px]", // Fixed width for all boards
    height: "h-[220px]", // Fixed height for all boards
  };
};

const QuestBoard = ({
  id,
  name = "",
  category = "Other", // Provide default values to prevent undefined
  goal = "",
  dueDate,
  xp = 0,
  priority = 1,
  status = "available",
  progress = 0,
  daysLeft = 0,
  type = "default",
  onAddQuest,
  onDeleteQuest,
  onEditQuest,
  onChangeStatus,
  onAddSubtask,
}) => {
  const { width, height } = useFixedBoardSize();
  const [showMenu, setShowMenu] = useState(false);
  const [isSubtask, setIsSubtask] = useState(false);
  const menuRef = useRef(null);

  // Determine if this is a subtask board
  useEffect(() => {
    setIsSubtask(type === "subtask");
  }, [type]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // For add quest button - SAME EXACT SIZE as other boards
  if (type === "add") {
    return (
      <button
        onClick={() => onAddQuest && onAddQuest()}
        className={`${width} ${height} flex items-center justify-center 
                  bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 
                  border-dashed border-gray-300 dark:border-gray-600 
                  hover:border-indigo-500 dark:hover:border-indigo-400 
                  transition-colors duration-200`}
        style={{
          width: "320px", // Explicitly set width
          minHeight: "220px", // Ensure exact height even with minimal content
          maxWidth: "320px", // Prevent expansion
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-5xl text-gray-400 dark:text-gray-500 mb-2">
            +
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            Add New Quest
          </span>
        </div>
      </button>
    );
  }

  // Safe access to category string
  const categoryStr = typeof category === "string" ? category : "Other";
  const categoryInitials = categoryStr.substring(0, 2);

  // Handle category color and style
  const categoryStyle = categoryColors[categoryStr] || categoryColors.Other;
  const bgColor = categoryStyle.split(" ")[0] || "bg-gray-200";
  const textColor = categoryStyle.split(" ")[1] || "text-gray-700";

  // Determine days left status
  const isOverdue = status !== "completed" && daysLeft < 0;
  const daysLeftColor = isOverdue
    ? "bg-red-200 text-red-800"
    : daysLeft <= 3
    ? "bg-yellow-200 text-yellow-800"
    : "bg-green-200 text-green-800";

  return (
    <div
      className={`${width} ${height} bg-white dark:bg-gray-800 
                rounded-lg shadow-md overflow-hidden p-4 flex flex-col`}
      style={{
        width: "320px", // Explicitly set width
        minHeight: "220px", // Ensure exact height even with minimal content
        maxWidth: "320px", // Prevent expansion
      }}
    >
      {/* LAYER 1: Category Circle, Task Name, Settings Button */}
      <div className="flex items-center mb-3">
        {/* Category Circle */}
        <div
          className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}
        >
          <span className={`text-sm font-medium ${textColor}`}>
            {categoryInitials}
          </span>
        </div>

        {/* Task Name */}
        <h3 className="flex-grow ml-3 font-bold text-lg text-gray-900 dark:text-white truncate">
          {name}
        </h3>

        {/* Settings Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 ml-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute top-14 right-4 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20"
          >
            <div className="py-1">
              {/* Only show available options based on current status */}
              {status !== "ongoing" && (
                <button
                  onClick={() => {
                    onChangeStatus && onChangeStatus("ongoing");
                    setShowMenu(false);
                  }}
                  className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Move to Ongoing</span>
                </button>
              )}

              {status !== "available" && (
                <button
                  onClick={() => {
                    onChangeStatus && onChangeStatus("available");
                    setShowMenu(false);
                  }}
                  className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
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
                  <span>Move to Available</span>
                </button>
              )}

              {status !== "completed" && (
                <button
                  onClick={() => {
                    onChangeStatus && onChangeStatus("completed");
                    setShowMenu(false);
                  }}
                  className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
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
                  <span>Mark as Completed</span>
                </button>
              )}

              <button
                onClick={() => {
                  onEditQuest && onEditQuest();
                  setShowMenu(false);
                }}
                className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2 text-gray-500"
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

              <button
                onClick={() => {
                  onDeleteQuest &&
                    window.confirm(
                      "Are you sure you want to delete this quest?"
                    ) &&
                    onDeleteQuest();
                  setShowMenu(false);
                }}
                className="flex w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
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

              {/* Only show Add Subtask for non-subtask boards */}
              {!isSubtask && (
                <button
                  onClick={() => {
                    onAddSubtask && onAddSubtask();
                    setShowMenu(false);
                  }}
                  className="flex w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add Subtask</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* LAYER 2: Category Name + Separator + Goal */}
      <div className="flex items-center text-sm mb-4">
        <span className={textColor}>{categoryStr}</span>
        <div className={`w-1.5 h-1.5 rounded-full mx-2 ${bgColor}`}></div>
        <p className="text-gray-600 dark:text-gray-300 truncate">{goal}</p>
      </div>

      {/* LAYER 3: Based on type - either deadline info or progress */}
      <div className="mb-4">
        {isSubtask ? (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Progress: {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-yellow-400"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm">
            <span className={`px-3 py-1 rounded-full ${daysLeftColor}`}>
              {isOverdue ? "Overdue" : `${daysLeft} days left`}
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md ml-3">
              {dueDate
                ? new Date(dueDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                  })
                : "No due date"}
            </span>
          </div>
        )}
      </div>

      {/* LAYER 4: Priority stars and XP reward */}
      <div className="flex justify-between items-center mt-auto">
        {/* Priority Stars */}
        <div className="flex items-center rounded-lg bg-yellow-100 dark:bg-yellow-900 px-2 py-1">
          {[...Array(priority)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* XP Reward with SwordShield image */}
        <div className="flex items-center">
          <span className="mr-1">
            <img
              src={SwordShieldIcon}
              alt="XP"
              className="w-5 h-5 object-contain"
            />
          </span>
          <span className="text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
            {xp} XP
          </span>
        </div>
      </div>

      {/* Progress bar at bottom (for non-subtask) */}
      {!isSubtask && status !== "completed" && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-4 rounded-full">
          <div
            className="h-1 rounded-full bg-indigo-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

QuestBoard.propTypes = {
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
  onAddQuest: PropTypes.func,
  onDeleteQuest: PropTypes.func,
  onEditQuest: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onAddSubtask: PropTypes.func,
};

export default QuestBoard;
