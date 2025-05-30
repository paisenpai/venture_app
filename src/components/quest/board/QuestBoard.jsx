import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import QuestCard from "./QuestCard";
import SectionHeader from "../../ui/SectionHeader";

const QuestSection = ({
  title,
  quests = [],
  subtasks = [],
  showAddButton = false,
  onAddQuest,
  onDeleteQuest,
  onEditQuest,
  onChangeStatus,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
  className = "",
}) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const scrollContainerRef = useRef(null);

  // Toggle menu function
  const toggleMenu = (id, buttonRef) => {
    if (activeMenuId === id) {
      setActiveMenuId(null);
      return;
    }

    if (buttonRef && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setActiveMenuId(id);
  };

  // Calculate total count for the section header (only count main quests)
  const totalCount = quests.length + subtasks.length;

  // Determine if section is empty (no quests and no add button)
  const isEmpty =
    quests.length === 0 && subtasks.length === 0 && !showAddButton;

  // Handle scroll left/right
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  // Determine section background color based on section type
  const getSectionStyle = () => {
    switch (title.toLowerCase()) {
      case "available":
        return "bg-blue-50/30 dark:bg-blue-900/10";
      case "ongoing":
        return "bg-yellow-50/30 dark:bg-yellow-900/10";
      case "completed":
        return "bg-green-50/30 dark:bg-green-900/10";
      default:
        return "bg-gray-50/50 dark:bg-gray-800/30";
    }
  };

  return (
    <div
      className={`quest-section p-2 rounded-lg ${getSectionStyle()} ${className}`}
    >
      <SectionHeader title={title} count={totalCount} />

      {isEmpty ? (
        <div className="flex items-center justify-center h-[220px] bg-white/60 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No quests in this section
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white dark:bg-gray-700 rounded-full shadow-md p-2 opacity-80 hover:opacity-100 transition-opacity"
            onClick={scrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Right Navigation Button */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white dark:bg-gray-700 rounded-full shadow-md p-2 opacity-80 hover:opacity-100 transition-opacity"
            onClick={scrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className="overflow-x-auto scrollbar-hide"
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-4 py-2">
              {/* Add Quest Button */}
              {showAddButton && (
                <button
                  onClick={onAddQuest}
                  className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 dark:border-gray-600 w-[640px] md:w-[720px] lg:w-[800px] h-[160px] min-w-[500px] flex-shrink-0"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
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
                    </div>
                    <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                      Add New Quest
                    </span>
                  </div>
                </button>
              )}

              {/* Quest Cards - Main Quests */}
              {quests.map((quest) => (
                <div key={quest.id} className="flex-shrink-0">
                  <QuestCard
                    id={quest.id}
                    name={quest.name}
                    category={quest.category}
                    goal={quest.goal}
                    dueDate={quest.dueDate}
                    xp={quest.xp}
                    priority={quest.priority}
                    status={quest.status || "available"}
                    progress={quest.progress || 0}
                    daysLeft={quest.daysLeft}
                    type="default"
                    subtasks={quest.subtasks || []} // Still pass this for data purposes
                    toggleMenu={toggleMenu}
                    isMenuOpen={activeMenuId === quest.id}
                    menuPosition={menuPosition}
                    setActiveMenuId={setActiveMenuId}
                    onEdit={() => onEditQuest(quest.id)}
                    onDelete={() => onDeleteQuest(quest.id)}
                    onChangeStatus={(newStatus) =>
                      onChangeStatus(quest.id, newStatus)
                    }
                    onAddSubtask={() => onAddSubtask(quest.id)}
                  />
                </div>
              ))}

              {/* Subtask Cards - Now as independent slates */}
              {subtasks.map((subtask) => (
                <div key={`subtask-${subtask.id}`} className="flex-shrink-0">
                  <QuestCard
                    id={subtask.id}
                    name={subtask.name}
                    category={subtask.category || "Subtask"}
                    goal={
                      subtask.goal ||
                      `Part of: ${subtask.parentName || "Parent Task"}`
                    }
                    xp={subtask.xp || 0}
                    priority={subtask.priority || 1}
                    status={subtask.status || "available"}
                    progress={subtask.progress || 0}
                    daysLeft={subtask.daysLeft}
                    type="subtask"
                    toggleMenu={toggleMenu}
                    isMenuOpen={activeMenuId === `subtask-${subtask.id}`}
                    menuPosition={menuPosition}
                    setActiveMenuId={setActiveMenuId}
                    onEdit={() => onEditSubtask(subtask.parentId, subtask.id)}
                    onDelete={() =>
                      onDeleteSubtask(subtask.parentId, subtask.id)
                    }
                    onChangeStatus={(newStatus) =>
                      onChangeSubtaskStatus(
                        subtask.parentId,
                        subtask.id,
                        newStatus
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  `,
        }}
      />
    </div>
  );
};

QuestSection.propTypes = {
  title: PropTypes.string.isRequired,
  quests: PropTypes.array,
  subtasks: PropTypes.array,
  showAddButton: PropTypes.bool,
  onAddQuest: PropTypes.func,
  onDeleteQuest: PropTypes.func,
  onEditQuest: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onAddSubtask: PropTypes.func,
  onEditSubtask: PropTypes.func,
  onDeleteSubtask: PropTypes.func,
  onChangeSubtaskStatus: PropTypes.func,
  className: PropTypes.string,
};

export default QuestSection;
