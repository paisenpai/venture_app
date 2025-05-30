import React, { useState } from "react";
import PropTypes from "prop-types";

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error info
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 mb-2">
            {this.state.error?.message || "Unknown error"}
          </p>
          <button
            onClick={() =>
              this.setState({ hasError: false, error: null, errorInfo: null })
            }
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Quest Card Component with Action Menu
const QuestItem = ({ item, isSubtask, actions }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-[320px] md:w-[360px] lg:w-[400px] h-[160px] min-w-[280px] flex-shrink-0 cursor-pointer 
        ${isSubtask ? "border-l-4 border-indigo-300" : ""} 
        hover:shadow-md transition-shadow relative`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start">
        <div className="overflow-hidden">
          <h3
            classNameName={`font-medium ${isSubtask ? "text-sm" : ""} truncate`}
          >
            {item.name}
          </h3>
          {isSubtask && item.parentName && (
            <p className="text-xs text-gray-500 truncate">
              Part of: {item.parentName}
            </p>
          )}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-1 ${
            isSubtask
              ? "bg-indigo-100 text-indigo-800"
              : item.priority === 3
              ? "bg-red-100 text-red-800"
              : item.priority === 2
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isSubtask
            ? "Subtask"
            : item.priority === 3
            ? "High"
            : item.priority === 2
            ? "Medium"
            : "Low"}
        </span>
      </div>

      {/* Goal/Description with limited height to prevent overflow */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 overflow-hidden max-h-[60px]">
        {item.goal && <p className="line-clamp-3">{item.goal}</p>}
      </div>

      <div className="mt-2 flex justify-between text-sm absolute bottom-3 left-4 right-4">
        <span className="flex items-center">
          <svg
            className="w-4 h-4 text-indigo-500 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3.586l2.707 2.707a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586 12.293 6.293A1 1 0 0110 5z"
              clipRule="evenodd"
            />
          </svg>
          {item.xp || 0} XP
        </span>

        {item.dueDate && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {new Date(item.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Action Menu - conditionally displayed */}
      {showActions && (
        <div className="absolute right-2 top-10 bg-white shadow-lg rounded-md border border-gray-200 p-1 z-10">
          <div className="flex flex-col text-sm">
            {/* Edit button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                isSubtask
                  ? actions.onEditSubtask(item.parentId, item.id)
                  : actions.onEditQuest(item.id);
              }}
              className="px-3 py-1.5 text-left hover:bg-gray-100 rounded-sm flex items-center"
            >
              <svg
                className="w-3.5 h-3.5 mr-2 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>

            {/* Status Change buttons */}
            {item.status !== "available" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isSubtask
                    ? actions.onChangeSubtaskStatus(
                        item.parentId,
                        item.id,
                        "available"
                      )
                    : actions.onChangeStatus(item.id, "available");
                }}
                className="px-3 py-1.5 text-left hover:bg-gray-100 rounded-sm flex items-center"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Mark as Available
              </button>
            )}

            {item.status !== "ongoing" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isSubtask
                    ? actions.onChangeSubtaskStatus(
                        item.parentId,
                        item.id,
                        "ongoing"
                      )
                    : actions.onChangeStatus(item.id, "ongoing");
                }}
                className="px-3 py-1.5 text-left hover:bg-gray-100 rounded-sm flex items-center"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Mark as In Progress
              </button>
            )}

            {item.status !== "completed" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isSubtask
                    ? actions.onChangeSubtaskStatus(
                        item.parentId,
                        item.id,
                        "completed"
                      )
                    : actions.onChangeStatus(item.id, "completed");
                }}
                className="px-3 py-1.5 text-left hover:bg-gray-100 rounded-sm flex items-center"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Mark as Complete
              </button>
            )}

            {/* Add subtask button - only for main quests */}
            {!isSubtask && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  actions.onAddSubtask(item.id);
                }}
                className="px-3 py-1.5 text-left hover:bg-gray-100 rounded-sm flex items-center"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                Add Subtask
              </button>
            )}

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (
                  window.confirm("Are you sure you want to delete this item?")
                ) {
                  isSubtask
                    ? actions.onDeleteSubtask(item.parentId, item.id)
                    : actions.onDeleteQuest(item.id);
                }
              }}
              className="px-3 py-1.5 text-left hover:bg-red-50 text-red-600 rounded-sm flex items-center"
            >
              <svg
                className="w-3.5 h-3.5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main QuestBoard Component
const QuestBoard = ({
  quests = [],
  subtasks = [],
  onChangeStatus,
  onEditQuest,
  onDeleteQuest,
  onAddQuest,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
}) => {
  // Group items by status
  const availableItems = {
    quests: quests.filter((q) => q.status === "available" || !q.status),
    subtasks: subtasks.filter((s) => s.status === "available" || !s.status),
  };

  const ongoingItems = {
    quests: quests.filter((q) => q.status === "ongoing"),
    subtasks: subtasks.filter((s) => s.status === "ongoing"),
  };

  const completedItems = {
    quests: quests.filter((q) => q.status === "completed"),
    subtasks: subtasks.filter((s) => s.status === "completed"),
  };

  // Click handlers and actions
  const actions = {
    onChangeStatus,
    onEditQuest,
    onDeleteQuest,
    onAddQuest,
    onAddSubtask,
    onEditSubtask,
    onDeleteSubtask,
    onChangeSubtaskStatus,
  };

  // Render a column with quests and subtasks
  const renderColumn = (title, items, status) => (
    <div
      className={`rounded-lg p-4 ${
        status === "available"
          ? "bg-blue-50/30 dark:bg-blue-900/10"
          : status === "ongoing"
          ? "bg-yellow-50/30 dark:bg-yellow-900/10"
          : "bg-green-50/30 dark:bg-green-900/10"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm">
          {items.quests.length + items.subtasks.length}
        </span>
      </div>

      {status === "available" && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={onAddQuest}
            className="w-[280px] h-[160px] min-w-[280px] flex-shrink-0 bg-white dark:bg-gray-800 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg text-blue-600 dark:text-blue-400 flex flex-col justify-center items-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition shadow"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Add New Quest</span>
          </button>
        </div>
      )}

      <div
        className="flex flex-col items-center gap-4 overflow-y-auto pb-4"
        style={{ maxHeight: "calc(100vh - 250px)" }}
      >
        {/* Main Quests */}
        {items.quests.map((quest) => (
          <QuestItem
            key={`quest-${quest.id}`}
            item={quest}
            isSubtask={false}
            actions={actions}
          />
        ))}

        {/* Subtasks */}
        {items.subtasks.map((subtask) => (
          <QuestItem
            key={`subtask-${subtask.id}`}
            item={subtask}
            isSubtask={true}
            actions={actions}
          />
        ))}

        {/* Empty state */}
        {items.quests.length === 0 && items.subtasks.length === 0 && (
          <div className="w-[280px] h-[160px] min-w-[280px] flex-shrink-0 flex items-center justify-center text-center text-gray-500 bg-white/60 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            {status === "available" ? (
              <div>
                <p className="mb-2">No available quests</p>
              </div>
            ) : (
              <p>No {status} items</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {renderColumn("Available", availableItems, "available")}
      {renderColumn("In Progress", ongoingItems, "ongoing")}
      {renderColumn("Completed", completedItems, "completed")}
    </div>
  );
};

QuestBoard.propTypes = {
  quests: PropTypes.array,
  subtasks: PropTypes.array,
  onChangeStatus: PropTypes.func,
  onEditQuest: PropTypes.func,
  onDeleteQuest: PropTypes.func,
  onAddQuest: PropTypes.func,
  onAddSubtask: PropTypes.func,
  onEditSubtask: PropTypes.func,
  onDeleteSubtask: PropTypes.func,
  onChangeSubtaskStatus: PropTypes.func,
};

export default QuestBoard;
