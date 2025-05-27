import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QuestBoard from "./QuestBoard";
import { transitions, shadows } from "../../styles/designSystem";

const QuestSection = ({
  title,
  quests,
  subtasks = [],
  showAddButton,
  onAddQuest,
  onDeleteQuest,
  onEditQuest,
  onChangeStatus,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onChangeSubtaskStatus,
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Combine all items for counter
  const allItems = [...quests, ...subtasks];

  // Check scroll position to determine if arrows should be shown
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 5);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    };

    // Initial check
    checkScroll();

    // Add scroll event listener
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", checkScroll);

    // Check if we need right scroll button on initial render
    if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
      setShowRightScroll(true);
    }

    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
    };
  }, [quests.length, subtasks.length]);

  // Scroll handling functions
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360; // A bit wider than the card width for better UX
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          currentScroll + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-12 relative">
      {/* Header with counter circle first, then title and line */}
      <div className="flex items-center mb-4">
        {/* Counter Circle - Now first element with pulsing animation for emphasis */}
        <div className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3 relative">
          <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
            {allItems.length}
          </span>
          {allItems.length > 0 && (
            <span className="absolute w-full h-full rounded-full bg-indigo-500/20 dark:bg-indigo-500/30 animate-ping-slow"></span>
          )}
        </div>

        {/* Title with improved typography */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h2>

        {/* Line with gradient effect */}
        <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent ml-4"></div>
      </div>

      {/* Scroll navigation - enhanced with better visibility */}
      <div className="relative">
        {showLeftScroll && (
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={() => handleScroll("left")}
              className={`p-2.5 rounded-full bg-white dark:bg-gray-700 ${shadows.md} ${transitions.normal} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
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
          </div>
        )}

        {showRightScroll && (
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={() => handleScroll("right")}
              className={`p-2.5 rounded-full bg-white dark:bg-gray-700 ${shadows.md} ${transitions.normal} hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
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
          </div>
        )}

        {/* Enhanced scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-1 pb-6 gap-6 hide-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Add button - ensure fixed width container */}
          {showAddButton && (
            <div
              className="flex-shrink-0"
              style={{ width: "320px", maxWidth: "320px" }}
            >
              <QuestBoard type="add" onAddQuest={onAddQuest} />
            </div>
          )}

          {/* Quest boards - ensure fixed width container */}
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="flex-shrink-0"
              style={{ width: "320px", maxWidth: "320px" }}
            >
              <QuestBoard
                {...quest}
                onDeleteQuest={() => onDeleteQuest(quest.id)}
                onEditQuest={() => onEditQuest(quest.id)}
                onChangeStatus={(status) => onChangeStatus(quest.id, status)}
                onAddSubtask={() =>
                  onAddSubtask(quest.id, { name: "New subtask", progress: 0 })
                }
              />
            </div>
          ))}

          {/* Subtask boards - ensure fixed width container */}
          {subtasks.map((subtask) => (
            <div
              key={`subtask-${subtask.id}`}
              className="flex-shrink-0"
              style={{ width: "320px", maxWidth: "320px" }}
            >
              <QuestBoard
                {...subtask}
                type="subtask"
                onDeleteQuest={() =>
                  onDeleteSubtask(subtask.parentId, subtask.id)
                }
                onEditQuest={() => onEditSubtask(subtask.parentId, subtask.id)}
                onChangeStatus={(status) =>
                  onChangeSubtaskStatus &&
                  onChangeSubtaskStatus(subtask.parentId, subtask.id, status)
                }
              />
            </div>
          ))}

          {allItems.length === 0 && !showAddButton && (
            <div className="text-gray-500 dark:text-gray-400 w-full text-center p-6">
              No {title.toLowerCase()} quests available.
            </div>
          )}
        </div>

        {/* Enhanced scroll indicator with animated gradient */}
        {allItems.length > 0 && (
          <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div
              className="absolute h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-500 rounded-full transform transition-all duration-300"
              style={{
                width: scrollContainerRef.current
                  ? `${Math.min(
                      100,
                      (scrollContainerRef.current.clientWidth /
                        scrollContainerRef.current.scrollWidth) *
                        100
                    )}%`
                  : "20%",
                left: scrollContainerRef.current
                  ? `${
                      (scrollContainerRef.current.scrollLeft /
                        scrollContainerRef.current.scrollWidth) *
                      100
                    }%`
                  : "0%",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

QuestSection.propTypes = {
  title: PropTypes.string.isRequired,
  quests: PropTypes.array.isRequired,
  subtasks: PropTypes.array,
  showAddButton: PropTypes.bool,
  onAddQuest: PropTypes.func.isRequired,
  onDeleteQuest: PropTypes.func.isRequired,
  onEditQuest: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func.isRequired,
  onEditSubtask: PropTypes.func.isRequired,
  onDeleteSubtask: PropTypes.func.isRequired,
  onChangeSubtaskStatus: PropTypes.func,
};

QuestSection.defaultProps = {
  showAddButton: false,
  subtasks: [],
};

export default QuestSection;
