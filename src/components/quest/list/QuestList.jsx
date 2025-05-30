import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../../utils/QuestBoard/questBoardConstants";
import SwordShieldIcon from "../../../assets/icons/SwordShield.png";

const QuestListView = ({
  quests,
  subtasks,
  onAddQuest,
  onEditQuest,
  onDeleteQuest,
  onChangeStatus,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
}) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [expandedQuests, setExpandedQuests] = useState({});
  const [showMenus, setShowMenus] = useState({});
  const menuRefs = useRef({});
  const buttonRefs = useRef({});

  // Define status colors once and reuse them consistently
  const statusColors = useMemo(
    () => ({
      available: {
        bgCircle: "bg-red-500",
        bgButton: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        label: "Pending",
      },
      ongoing: {
        bgCircle: "bg-orange-500",
        bgButton:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        label: "Ongoing",
      },
      completed: {
        bgCircle: "bg-green-500",
        bgButton:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        label: "Completed",
      },
    }),
    []
  );

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(showMenus).forEach((id) => {
        if (
          showMenus[id] &&
          menuRefs.current[id] &&
          !menuRefs.current[id].contains(event.target) &&
          (!buttonRefs.current[id] ||
            !buttonRefs.current[id].contains(event.target))
        ) {
          setShowMenus((prev) => ({ ...prev, [id]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenus]);

  // Combine quests and subtasks into a single array for filtering
  const allItems = useMemo(() => {
    const combinedItems = quests.map((quest) => ({ ...quest, type: "quest" }));

    // Apply filtering
    if (filter === "completed") {
      return combinedItems.filter((item) => item.status === "completed");
    } else if (filter === "active") {
      return combinedItems.filter(
        (item) => item.status === "available" || item.status === "ongoing"
      );
    }

    return combinedItems;
  }, [quests, filter]);

  // Group subtasks by parent quest
  const subtasksByParent = useMemo(() => {
    const grouped = {};
    subtasks.forEach((subtask) => {
      if (!grouped[subtask.parentId]) {
        grouped[subtask.parentId] = [];
      }
      grouped[subtask.parentId].push(subtask);
    });
    return grouped;
  }, [subtasks]);

  // Apply sorting to filtered items
  const sortedItems = useMemo(() => {
    return [...allItems].sort((a, b) => {
      if (sortBy === "dueDate") {
        // Handle null dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "priority") {
        return (b.priority || 0) - (a.priority || 0);
      } else if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });
  }, [allItems, sortBy]);

  // Toggle expanded state for a quest
  const toggleExpanded = useCallback((questId) => {
    setExpandedQuests((prev) => ({
      ...prev,
      [questId]: !prev[questId],
    }));
  }, []);

  // Toggle menu visibility
  const toggleMenu = useCallback((id, e) => {
    e.stopPropagation();
    setShowMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Format due date
  const formatDueDate = useCallback((dateStr) => {
    if (!dateStr) return "00/00/00";

    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  }, []);

  // Add helper function to get category color
  const getCategoryColor = useCallback((category) => {
    return categoryColors[category] || "bg-gray-400 dark:bg-gray-600";
  }, []);

  // Reusable UI components to reduce redundancy
  const StatusDropdown = useCallback(
    ({ id, status, onChange, isSubtask = false }) => {
      return (
        <div className="flex-none relative">
          <button
            ref={(el) => (buttonRefs.current[`status-${id}`] = el)}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(`status-${id}`, e);
            }}
            className={`${
              isSubtask ? "text-xs" : "text-sm font-medium"
            } px-2 py-1 rounded flex items-center whitespace-nowrap ${
              statusColors[status || "available"].bgButton
            }`}
          >
            <span className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-1.5 ${
                  statusColors[status || "available"].bgCircle
                }`}
              ></span>
              {statusColors[status || "available"].label}
            </span>
            <svg
              className={`${isSubtask ? "w-3 h-3" : "w-4 h-4"} ml-1`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showMenus[`status-${id}`] && (
            <div
              ref={(el) => (menuRefs.current[`status-${id}`] = el)}
              className="fixed z-50 bg-white dark:bg-gray-800 border rounded shadow-lg"
              style={{
                width: isSubtask ? "8rem" : "10rem",
                top: `${
                  buttonRefs.current[`status-${id}`]?.getBoundingClientRect()
                    .bottom + window.scrollY
                }px`,
                left: `${
                  buttonRefs.current[`status-${id}`]?.getBoundingClientRect()
                    .left + window.scrollX
                }px`,
              }}
            >
              {Object.entries(statusColors).map(([key, value]) => (
                <button
                  key={key}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(key);
                    setShowMenus((prev) => ({
                      ...prev,
                      [`status-${id}`]: false,
                    }));
                  }}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${value.bgCircle} mr-2`}
                  ></span>
                  {value.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    },
    [statusColors, showMenus, toggleMenu]
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      {/* Add Quest Slate */}
      <div
        onClick={onAddQuest}
        className="m-4 p-4 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-lg flex items-center justify-center cursor-pointer group transition-colors"
        aria-label="Add New Task"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Add New Quest
          </span>
        </div>
      </div>

      {/* Quest List */}
      <div className="px-4">
        {sortedItems.length > 0 ? (
          sortedItems.map((quest) => (
            <div
              key={quest.id}
              className="mb-4 rounded-lg border-2 border-purple-300 dark:border-purple-700 overflow-hidden"
            >
              {/* Quest Slate - Main row */}
              <div
                className="flex items-center h-16 p-3 cursor-pointer"
                onClick={() => toggleExpanded(quest.id)}
              >
                {/* Expansion Arrow - Only show if quest has subtasks */}
                {subtasksByParent[quest.id]?.length > 0 && (
                  <div className="pr-2 flex items-center justify-center">
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        expandedQuests[quest.id] ? "transform rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Category Circle */}
                <div
                  className={`w-9 h-9 rounded-full ${getCategoryColor(
                    quest.category
                  )} flex items-center justify-center mr-3`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>

                {/* Task Content - Left side */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {quest.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{quest.category}</span>
                    <span
                      className={`mx-1.5 w-2 h-2 rounded-full inline-block ${getCategoryColor(
                        quest.category
                      )}`}
                    ></span>
                    <span className="truncate">
                      {quest.goal || "No goal set"}
                    </span>
                  </div>
                </div>

                {/* Task Indicators - Right side */}
                <div className="flex items-center space-x-3">
                  {/* Days Left */}
                  <div className="flex-none px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm whitespace-nowrap font-medium">
                    {quest.daysLeft < 0
                      ? "Overdue"
                      : `${quest.daysLeft || 0} Day(s) Left`}
                  </div>

                  {/* Due Date */}
                  <div className="flex-none text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDueDate(quest.dueDate)}
                  </div>

                  {/* Status Button */}
                  <StatusDropdown
                    id={quest.id}
                    status={quest.status}
                    onChange={(status) => onChangeStatus(quest.id, status)}
                  />

                  {/* Priority Stars (1-4) */}
                  <div className="flex-none bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-md flex items-center">
                    {[...Array(quest.priority || 1)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* XP with Sword/Shield Icon */}
                  <div className="flex-none flex items-center">
                    <img
                      src={SwordShieldIcon}
                      alt="XP"
                      className="w-5 h-5 mr-1"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {quest.xp || "000"} XP
                    </span>
                  </div>

                  {/* Menu (3 vertical dots) */}
                  <div className="flex-none relative ml-1">
                    <button
                      ref={(el) => (buttonRefs.current[quest.id] = el)}
                      onClick={(e) => toggleMenu(quest.id, e)}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      aria-label="Task options"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {showMenus[quest.id] && (
                      <div
                        ref={(el) => (menuRefs.current[quest.id] = el)}
                        className="fixed z-50 w-44 bg-white dark:bg-gray-800 border rounded shadow-lg"
                        style={{
                          top: `${
                            buttonRefs.current[
                              quest.id
                            ]?.getBoundingClientRect().bottom + window.scrollY
                          }px`,
                          left: `${
                            buttonRefs.current[
                              quest.id
                            ]?.getBoundingClientRect().left -
                            120 +
                            window.scrollX
                          }px`, // Position to the left of the button
                        }}
                      >
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditQuest(quest.id);
                            setShowMenus((prev) => ({
                              ...prev,
                              [quest.id]: false,
                            }));
                          }}
                        >
                          Edit Quest
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddSubtask(quest.id);
                            setShowMenus((prev) => ({
                              ...prev,
                              [quest.id]: false,
                            }));
                          }}
                        >
                          Add Subtask
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this quest?"
                              )
                            ) {
                              onDeleteQuest(quest.id);
                            }
                            setShowMenus((prev) => ({
                              ...prev,
                              [quest.id]: false,
                            }));
                          }}
                        >
                          Delete Quest
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Subtasks */}
              {expandedQuests[quest.id] &&
                subtasksByParent[quest.id]?.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    {subtasksByParent[quest.id].map((subtask) => (
                      <div
                        key={subtask.id}
                        className="px-4 py-3 ml-6 border-b border-gray-200 dark:border-gray-700 last:border-0 flex items-center h-14"
                      >
                        {/* Subtask Name */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                            {subtask.name}
                          </div>
                        </div>

                        {/* Subtask Info */}
                        <div className="flex items-center space-x-2 ml-auto">
                          {/* Days Left */}
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                            {subtask.daysLeft < 0
                              ? "Overdue"
                              : `${subtask.daysLeft || 0}d left`}
                          </span>

                          {/* Due Date */}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDueDate(subtask.dueDate)}
                          </span>

                          {/* Status */}
                          <StatusDropdown
                            id={subtask.id}
                            status={subtask.status}
                            onChange={(status) =>
                              onChangeSubtaskStatus(
                                subtask.parentId,
                                subtask.id,
                                status
                              )
                            }
                            isSubtask={true}
                          />

                          {/* Priority (smaller size for subtask) */}
                          <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-1.5 py-1 rounded">
                            <svg
                              className="w-3 h-3 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          </div>

                          {/* XP with smaller Sword/Shield */}
                          <div className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-xs px-2 py-1 rounded">
                            <img
                              src={SwordShieldIcon}
                              alt="XP"
                              className="w-3 h-3 mr-1"
                            />
                            <span className="font-medium text-indigo-800 dark:text-indigo-200">
                              {subtask.xp} XP
                            </span>
                          </div>

                          {/* Menu (smaller for subtasks) */}
                          <div className="relative">
                            <button
                              ref={(el) =>
                                (buttonRefs.current[`subtask-${subtask.id}`] =
                                  el)
                              }
                              onClick={(e) =>
                                toggleMenu(`subtask-${subtask.id}`, e)
                              }
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                              aria-label="Subtask options"
                            >
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            {showMenus[`subtask-${subtask.id}`] && (
                              <div
                                ref={(el) =>
                                  (menuRefs.current[`subtask-${subtask.id}`] =
                                    el)
                                }
                                className="fixed z-50 w-32 bg-white dark:bg-gray-800 border rounded shadow-lg"
                                style={{
                                  top: `${
                                    buttonRefs.current[
                                      `subtask-${subtask.id}`
                                    ]?.getBoundingClientRect().bottom +
                                    window.scrollY
                                  }px`,
                                  left: `${
                                    buttonRefs.current[
                                      `subtask-${subtask.id}`
                                    ]?.getBoundingClientRect().left +
                                    window.scrollX
                                  }px`,
                                }}
                              >
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditSubtask(subtask.parentId, subtask.id);
                                    setShowMenus((prev) => ({
                                      ...prev,
                                      [`subtask-${subtask.id}`]: false,
                                    }));
                                  }}
                                >
                                  Edit Subtask
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      window.confirm(
                                        "Are you sure you want to delete this subtask?"
                                      )
                                    ) {
                                      onDeleteSubtask(
                                        subtask.parentId,
                                        subtask.id
                                      );
                                    }
                                    setShowMenus((prev) => ({
                                      ...prev,
                                      [`subtask-${subtask.id}`]: false,
                                    }));
                                  }}
                                >
                                  Delete Subtask
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No quests found for the current filter.
            <button
              onClick={onAddQuest}
              className="block mx-auto mt-2 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Add a new quest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

QuestListView.propTypes = {
  quests: PropTypes.array.isRequired,
  subtasks: PropTypes.array.isRequired,
  onAddQuest: PropTypes.func.isRequired,
  onEditQuest: PropTypes.func.isRequired,
  onDeleteQuest: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func.isRequired,
  onEditSubtask: PropTypes.func.isRequired,
  onDeleteSubtask: PropTypes.func.isRequired,
  onChangeSubtaskStatus: PropTypes.func.isRequired,
};

export default QuestListView;
