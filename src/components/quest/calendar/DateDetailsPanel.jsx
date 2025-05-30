import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const DateDetailsPanel = ({
  selectedDate,
  selectedDateQuests,
  onClose,
  handleQuestAction,
  isDarkMode,
  getStatusColor,
}) => {
  return (
    <div
      className={classNames(
        "mt-6 rounded-xl shadow-md p-4 border",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <h3
          className={classNames(
            "text-lg font-bold",
            isDarkMode ? "text-white" : ""
          )}
        >
          {new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <button
          onClick={onClose}
          className={classNames(
            "p-1 rounded-full",
            isDarkMode
              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          )}
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Quests by Status */}
      {["available", "ongoing", "completed"].map((status) => {
        const statusQuests = selectedDateQuests[status] || [];
        if (statusQuests.length === 0) return null;

        return (
          <div key={status} className="mb-4">
            <h4
              className={classNames(
                "text-md font-semibold mb-2",
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Quests
            </h4>
            <div className="flex flex-col gap-2">
              {statusQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={classNames(
                    "p-3 rounded-lg shadow-sm transition-all flex items-center gap-3",
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  {/* Quest color indicator */}
                  <div
                    className={classNames(
                      "w-2.5 h-2.5 rounded-full",
                      getStatusColor(quest.status)
                    )}
                    aria-hidden="true"
                  ></div>

                  {/* Quest details */}
                  <div className="flex-1">
                    <p
                      className={classNames(
                        "text-sm font-medium",
                        isDarkMode ? "text-white" : "text-gray-800"
                      )}
                    >
                      {quest.name}
                    </p>
                    <p
                      className={classNames(
                        "text-xs",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}
                    >
                      {quest.dueDate
                        ? `Due: ${new Date(quest.dueDate).toLocaleDateString(
                            "en-US"
                          )}`
                        : "No due date"}
                    </p>
                  </div>

                  {/* Edit button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuestAction(quest);
                    }}
                    className={classNames(
                      "p-2 rounded-full transition-all",
                      isDarkMode
                        ? "text-gray-300 hover:bg-gray-600"
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                    aria-label="Edit quest"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.414 2.586a2 2 0 00-2.828 0L10 8.586 5.414 4 4 5.414l5.586 5.586L4 17.414l1.414 1.414L10 13.414l5.586 5.586L17.414 17l-5.586-5.586L17 4.828l-1.586-1.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

DateDetailsPanel.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  selectedDateQuests: PropTypes.shape({
    available: PropTypes.array.isRequired,
    ongoing: PropTypes.array.isRequired,
    completed: PropTypes.array.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  handleQuestAction: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  getStatusColor: PropTypes.func.isRequired,
};

export default DateDetailsPanel;
