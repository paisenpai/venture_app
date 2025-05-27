import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { categoryColors } from "../../utils/QuestBoard/questBoardConstants";
import SwordShieldIcon from "../../assets/icons/SwordShield.png";
import { statusColors, componentStyles, transitions } from "../../styles/designSystem";

const QuestListView = ({
  quests,
  onNavigate,
  onAddQuest,
  onEditQuest,
  onDeleteQuest,
  onChangeStatus,
}) => {
  const [expandedQuests, setExpandedQuests] = useState({});
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);
  const [showMenus, setShowMenus] = useState({});
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [searchTerm, setSearchTerm] = useState("");
  const menuRefs = useRef({});

  // Handle click outside to close dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(showMenus).forEach((questId) => {
        if (
          showMenus[questId] &&
          menuRefs.current[questId] &&
          !menuRefs.current[questId].contains(event.target)
        ) {
          setShowMenus((prev) => ({ ...prev, [questId]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenus]);

  // Toggle expanded state for a quest
  const toggleExpanded = (questId, e) => {
    e.stopPropagation();
    setExpandedQuests((prev) => ({
      ...prev,
      [questId]: !prev[questId],
    }));
  };

  // Toggle menu visibility
  const toggleMenu = (questId, e) => {
    e.stopPropagation();
    setShowMenus((prev) => ({
      ...prev,
      [questId]: !prev[questId],
    }));
  };

  // Handle status change
  const handleStatusChange = (questId, newStatus, e) => {
    e?.stopPropagation();
    onChangeStatus(questId, newStatus);
    setShowMenus((prev) => ({ ...prev, [questId]: false }));
  };

  // Handle quest deletion
  const handleDeleteQuest = (questId, e) => {
    e?.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quest?")) {
      onDeleteQuest(questId);
    }
    setShowMenus((prev) => ({ ...prev, [questId]: false }));
  };

  // Handle edit quest
  const handleEditClick = (quest, e) => {
    e?.stopPropagation();
    setEditingQuest(quest);
    setShowMenus((prev) => ({ ...prev, [quest.id]: false }));
  };

  // Handle edit form submission
  const handleEditSubmit = (updatedData) => {
    onEditQuest(editingQuest.id, { ...editingQuest, ...updatedData });
    setEditingQuest(null);
  };

  // Filter and sort quests
  const filteredQuests = quests.filter((quest) => {
    const matchesFilter = filter === "all" || quest.status === filter;
    const matchesSearch = quest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         quest.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      return b.priority - a.priority;
    } else if (sortBy === "xp") {
      return b.xp - a.xp;
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Format due date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "No due date";
    
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: today.getFullYear() !== date.getFullYear() ? "numeric" : undefined
      });
    }
  };

  // Get status class for background
  const getStatusClass = (status, daysLeft) => {
    if (status === "completed") return statusColors.completed;
    if (status === "ongoing") return statusColors.ongoing;
    if (daysLeft < 0) return statusColors.overdue;
    return statusColors.available;
  };

  // Get category background color for styling
  const getCategoryStyle = (category) => {
    const color = categoryColors[category];
    return color ? color.split(" ")[0] : "bg-gray-200";
  };

  // Render the list of quests
  return (
    <div className="flex flex-col gap-6">
      {/* Add new quest form or button */}
      {isAddingQuest ? (
        <InlineQuestForm
          onSubmit={(newQuest) => {
            onAddQuest(newQuest);
            setIsAddingQuest(false);
          }}
          onCancel={() => setIsAddingQuest(false)}
        />
      ) : (
        <button
          className="w-full p-4 bg-white bg-opacity-50 rounded-xl border-2 border-dashed border-indigo-200 flex justify-center items-center cursor-pointer hover:bg-opacity-70 hover:border-indigo-300 transition-all"
          onClick={() => setIsAddingQuest(true)}
        >
          <span className="text-indigo-600 font-medium">+ Add New Quest</span>
        </button>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search quests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={componentStyles.input}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Filter */}
          <div className="w-full sm:w-40">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">Filter</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={componentStyles.select}
            >
              <option value="all">All Quests</option>
              <option value="available">Available</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* Sort */}
          <div className="w-full sm:w-40">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={componentStyles.select}
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="xp">XP Value</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
        
        {/* Add Button */}
        <button
          onClick={onAddQuest}
          className={`${componentStyles.button.primary} flex items-center space-x-1 px-4 py-2 mt-4 md:mt-0`}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Quest</span>
        </button>
      </div>
      
      {/* Quest List */}
      <div className="space-y-3">
        {filteredQuests.length === 0 ? (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            No quests match your current filters
          </div>
        ) : (
          filteredQuests.map((quest) =>
            editingQuest?.id === quest.id ? (
              <InlineQuestForm
                key={`edit-${quest.id}`}
                initialData={quest}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingQuest(null)}
              />
            ) : (
              <div
                key={quest.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Quest header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(quest.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-4 h-4 rounded-full ${getCategoryStyle(
                          quest.category
                        )}`}
                      />
                      <h3 className="text-lg font-medium">{quest.name}</h3>
                      <span className="text-sm text-gray-500">
                        {quest.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        {formatDueDate(quest.dueDate)}
                      </div>

                      <div
                        className="relative"
                        ref={(el) => (menuRefs.current[quest.id] = el)}
                      >
                        <button
                          onClick={(e) => toggleMenu(quest.id, e)}
                          className="p-1.5 rounded-full hover:bg-gray-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {showMenus[quest.id] && (
                          <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                              onClick={(e) => handleEditClick(quest, e)}
                            >
                              Edit
                            </button>
                            {quest.status !== "available" && (
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={(e) =>
                                  handleStatusChange(quest.id, "available", e)
                                }
                              >
                                Move to Available
                              </button>
                            )}
                            {quest.status !== "ongoing" && (
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={(e) =>
                                  handleStatusChange(quest.id, "ongoing", e)
                                }
                              >
                                Move to Ongoing
                              </button>
                            )}
                            {quest.status !== "completed" && (
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                onClick={(e) =>
                                  handleStatusChange(quest.id, "completed", e)
                                }
                              >
                                Move to Completed
                              </button>
                            )}
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                              onClick={(e) => handleDeleteQuest(quest.id, e)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Priority and XP indicators */}
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full ${
                            index < quest.priority ? "bg-yellow-500" : "bg-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">
                        Priority {quest.priority}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-indigo-700">
                      {quest.xp} XP
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedQuests[quest.id] && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-3">
                      <strong className="text-sm text-gray-700">Goal:</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        {quest.goal || "No goal set"}
                      </p>
                    </div>

                    {quest.subtasks && quest.subtasks.length > 0 && (
                      <div className="mt-4">
                        <strong className="text-sm text-gray-700">Subtasks:</strong>
                        <ul className="mt-2 space-y-2">
                          {quest.subtasks.map((subtask) => (
                            <li key={subtask.id} className="flex items-center">
                              <div className="w-full">
                                <div className="flex justify-between text-sm">
                                  <span>{subtask.name}</span>
                                  <span>{subtask.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                                  <div
                                    className="h-full bg-indigo-500 rounded-full"
                                    style={{ width: `${subtask.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <div
                        className="px-2.5 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor:
                            quest.status === "completed"
                              ? "#DEF7EC"
                              : quest.status === "ongoing"
                              ? "#E1EFFE"
                              : "#FEF3C7",
                          color:
                            quest.status === "completed"
                              ? "#03543E"
                              : quest.status === "ongoing"
                              ? "#1E429F"
                              : "#723B13",
                        }}
                      >
                        {quest.status.charAt(0).toUpperCase() +
                          quest.status.slice(1)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
      
      {/* List Summary */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        Showing {filteredQuests.length} {filteredQuests.length === 1 ? 'quest' : 'quests'} 
        {filter !== 'all' ? ` in ${filter} status` : ''}
      </div>
    </div>
  );
};

QuestListView.propTypes = {
  quests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      dueDate: PropTypes.string,
      xp: PropTypes.number,
      goal: PropTypes.string,
      priority: PropTypes.number,
      status: PropTypes.string,
      subtasks: PropTypes.array,
    })
  ).isRequired,
  onNavigate: PropTypes.func,
  onAddQuest: PropTypes.func,
  onEditQuest: PropTypes.func,
  onDeleteQuest: PropTypes.func,
  onChangeStatus: PropTypes.func,
};

export default QuestListView;
