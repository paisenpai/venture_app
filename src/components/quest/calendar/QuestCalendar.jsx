import React, { useState, useMemo, useCallback, memo, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts/ThemeContext";
import { createPortal } from "react-dom";

// Import extracted utility function
import { groupItemsByDate } from "../../../utils/QuestBoard/calendarUtils";
import AddQuestForm from "../../../components/forms/AddQuestForm";

// Utility date functions
const formatDate = (date, formatStr) => {
  if (!date) return "";

  // Ensure we're working with a Date object
  const d = new Date(date);

  // Check for invalid date
  if (isNaN(d.getTime())) return "";

  switch (formatStr) {
    case "yyyy-MM-dd":
      // Format as ISO date string and take just the date part
      return d.toISOString().split("T")[0];
    case "d":
      // Get day of month as number
      return d.getDate();
    case "MMMM yyyy":
      // Format as "Month Year"
      return (
        d.toLocaleString("default", { month: "long" }) + " " + d.getFullYear()
      );
    case "MMM d":
      // Format as "Mon 15"
      return (
        d.toLocaleString("default", { month: "short" }) + " " + d.getDate()
      );
    default:
      return d.toLocaleDateString();
  }
};

const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() + (6 - day));
  d.setHours(23, 59, 59, 999);
  return d;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

const subMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() - months);
  return d;
};

const isSameMonth = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
};

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

// Generate calendar days
const generateCalendarDays = (currentMonth, itemsByDate) => {
  // Create proper date objects to avoid reference issues
  const monthStart = startOfMonth(new Date(currentMonth));
  const monthEnd = endOfMonth(new Date(monthStart));
  const startDate = startOfWeek(new Date(monthStart));
  const endDate = endOfWeek(new Date(monthEnd));

  const days = [];
  let day = new Date(startDate);

  while (day <= endDate) {
    // Format the date consistently
    const dateStr = formatDate(day, "yyyy-MM-dd");

    // Create properties for the day object
    days.push({
      date: new Date(day), // Create a new date object to avoid reference issues
      dateStr,
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isSameDay(day, new Date()),
      hasItems: !!(itemsByDate[dateStr] && itemsByDate[dateStr].length > 0),
    });

    // Increment the day correctly
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    day = nextDay;
  }

  return days;
};

const CalendarHeader = memo(({ weekdays }) => (
  <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
    {weekdays.map((day) => (
      <div
        key={day}
        className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        {day}
      </div>
    ))}
  </div>
));

CalendarHeader.propTypes = {
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const CalendarDayItem = memo(({ item, onEditQuest, onDeleteQuest }) => {
  const [showModal, setShowModal] = useState(false);

  // Add defensive checks to prevent errors with malformed items
  if (!item || !item.type) {
    return null;
  }

  const bgColor =
    item.status === "completed"
      ? "bg-green-200 dark:bg-green-900/40"
      : item.status === "ongoing"
      ? "bg-purple-200 dark:bg-purple-900/40"
      : item.color === "yellow"
      ? "bg-yellow-200 dark:bg-yellow-900/40"
      : item.color === "blue"
      ? "bg-blue-200 dark:bg-blue-900/40"
      : "bg-green-200 dark:bg-green-900/40";

  const handleClick = (e) => {
    e.stopPropagation();
    if (item.type === "quest") {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`py-1 px-2 rounded-full text-xs cursor-pointer ${bgColor} transition-opacity hover:opacity-80 truncate`}
      >
        <span className="font-medium">{item.name || "Unnamed Quest"}</span>
      </div>

      {/* Quest details modal */}
      {showModal && item.type === "quest" && (
        <QuestModal
          quest={item}
          onClose={() => setShowModal(false)}
          onEdit={() => {
            setShowModal(false);
            onEditQuest(item.id);
          }}
          onDelete={() => {
            setShowModal(false);
            onDeleteQuest(item.id);
          }}
        />
      )}
    </>
  );
});

// Updated PropTypes - removed idx prop
CalendarDayItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEditQuest: PropTypes.func.isRequired,
  onDeleteQuest: PropTypes.func.isRequired,
};

// Update the CalendarDay component to ensure date numbers display correctly
const CalendarDay = memo(
  ({
    day,
    dayItems,
    isSelected,
    handleDayClick,
    onEditQuest,
    onAddQuest,
    onDeleteQuest,
  }) => {
    const isToday = day.isToday;
    const [isHovering, setIsHovering] = useState(false);

    // Ensure we have a proper date number to display
    const dayNumber =
      day.date instanceof Date
        ? day.date.getDate()
        : typeof day.date === "string"
        ? new Date(day.date).getDate()
        : "";

    return (
      <div
        onClick={() => handleDayClick(day)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          border-b border-r p-2
          h-32 md:h-36 lg:h-40 overflow-y-auto
          ${
            !day.isCurrentMonth
              ? "bg-gray-50 dark:bg-gray-800/50"
              : "bg-white dark:bg-gray-800"
          }
          ${
            isSelected
              ? "ring-2 ring-inset ring-purple-500 dark:ring-purple-400"
              : ""
          }
          transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50
          cursor-pointer relative
        `}
      >
        {/* Day number with enhanced styling for today */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center z-20 relative">
          {isToday ? (
            <div className="relative inline-flex items-center justify-center w-6 h-6">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#1F168D",
                  borderRadius: 12,
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                aria-hidden="true"
              ></div>
              <span
                className="relative text-white font-bold z-10 text-xs"
                style={{
                  position: "absolute",
                }}
              >
                {dayNumber}
              </span>
            </div>
          ) : (
            <span className="font-medium">{dayNumber}</span>
          )}
        </div>

        <div className="space-y-1 relative z-0">
          {/* Add Quest slate button that appears on hover */}
          {isHovering && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onAddQuest(day.dateStr);
              }}
              className="py-1 px-2 rounded-full text-xs cursor-pointer bg-slate-100 dark:bg-slate-700 transition-opacity hover:opacity-80 truncate border border-dashed border-gray-300 dark:border-gray-600"
            >
              <span className="font-medium text-gray-500 dark:text-gray-400">
                + Add Quest
              </span>
            </div>
          )}

          {/* Only show quest items if they exist */}
          {dayItems && dayItems.length > 0 && (
            <>
              {dayItems.slice(0, 3).map((item, idx) => (
                <CalendarDayItem
                  key={`${item.type}-${item.id || idx}`}
                  item={item}
                  onEditQuest={onEditQuest}
                  onDeleteQuest={onDeleteQuest}
                />
              ))}

              {dayItems.length > 3 && (
                <div className="py-1 px-2 rounded-full bg-gray-100 dark:bg-gray-700/50 text-xs">
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    {dayItems.length - 3} More
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Improved memoization check without using full JSON.stringify
    if (
      prevProps.day.dateStr !== nextProps.day.dateStr ||
      prevProps.isSelected !== nextProps.isSelected ||
      prevProps.dayItems?.length !== nextProps.dayItems?.length
    ) {
      return false;
    }

    // Only do deeper comparison if lengths match
    if (prevProps.dayItems && nextProps.dayItems) {
      // Check if items are the same by comparing ids and status
      for (let i = 0; i < prevProps.dayItems.length; i++) {
        if (
          prevProps.dayItems[i].id !== nextProps.dayItems[i].id ||
          prevProps.dayItems[i].status !== nextProps.dayItems[i].status
        ) {
          return false;
        }
      }
    }

    return true;
  }
);

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  dayItems: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  onEditQuest: PropTypes.func.isRequired,
  onAddQuest: PropTypes.func.isRequired,
  onDeleteQuest: PropTypes.func.isRequired,
};

// Add custom SVG icons to replace lucide icons
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Add the Modal component
const QuestModal = ({ quest, onClose, onEdit, onDelete }) => {
  const modalRef = useRef(null);

  // Handle click outside to close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Format the date for display with error handling
  const formattedDate = quest.dueDate
    ? new Date(quest.dueDate).toLocaleDateString()
    : "No due date";

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Quest Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {quest.name || "Unnamed Quest"}
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  quest.status === "completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : quest.status === "ongoing"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                }`}
              >
                {quest.status
                  ? quest.status.charAt(0).toUpperCase() + quest.status.slice(1)
                  : "Pending"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Due: {formattedDate}
              </span>
            </div>
          </div>

          {quest.description && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {quest.description}
              </p>
            </div>
          )}

          {quest.subtasks && quest.subtasks.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subtasks
              </h5>
              <ul className="space-y-1">
                {quest.subtasks.map((subtask) => (
                  <li
                    key={subtask.id || `subtask-${Math.random()}`}
                    className="flex items-center"
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        subtask.completed
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></span>
                    <span
                      className={`text-sm ${
                        subtask.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {subtask.name || "Unnamed Subtask"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => onDelete(quest.id)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <TrashIcon />
            Delete
          </button>
          <button
            onClick={() => onEdit(quest.id)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Add the PropTypes for the modal
QuestModal.propTypes = {
  quest: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const QuestCalendarView = ({
  quests = [],
  subtasks = [],
  onAddQuest,
  onEditQuest,
  onDeleteQuest,
}) => {
  const { darkMode } = useTheme();
  const isDarkMode = darkMode;

  const today = new Date();
  const formattedToday = formatDate(today, "yyyy-MM-dd");
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [selectedDay, setSelectedDay] = useState({
    date: today,
    dateStr: formattedToday,
    isCurrentMonth: true,
    isToday: true,
  });

  // Add new state for form management
  const [showQuestForm, setShowQuestForm] = useState(false);
  const [questToEdit, setQuestToEdit] = useState(null);
  const [formDate, setFormDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Group items by date - memoized
  const itemsByDate = useMemo(
    () => groupItemsByDate(quests, subtasks),
    [quests, subtasks]
  );

  // Calendar navigation functions
  const previousMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  // Go to today function
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(formatDate(today, "yyyy-MM-dd"));
    setSelectedDay({
      date: today,
      dateStr: formatDate(today, "yyyy-MM-dd"),
      isCurrentMonth: true,
      isToday: true,
    });
  }, []);

  // Generate calendar grid
  const calendar = useMemo(
    () => generateCalendarDays(currentMonth, itemsByDate),
    [currentMonth, itemsByDate]
  );

  // Handle day click to select a day
  const handleDayClick = useCallback((day) => {
    setSelectedDay(day);
    setSelectedDate(day.dateStr);
  }, []);

  // Form handling functions
  const handleAddQuest = useCallback((dateStr) => {
    setFormDate(dateStr);
    setQuestToEdit(null);
    setShowQuestForm(true);
  }, []);

  const handleEditQuest = useCallback(
    (questId) => {
      const questToEdit = quests.find((quest) => quest.id === questId);
      if (questToEdit) {
        setQuestToEdit(questToEdit);
        setShowQuestForm(true);
      }
    },
    [quests]
  );

  const handleFormClose = useCallback(() => {
    setShowQuestForm(false);
    setQuestToEdit(null);
    setFormError(null);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        setIsSubmitting(true);
        setFormError(null);

        // If editing an existing quest
        if (questToEdit) {
          await onEditQuest({
            ...formData,
            id: questToEdit.id,
          });
        } else {
          // If adding a new quest
          await onAddQuest({
            ...formData,
            dueDate: formDate || formData.dueDate,
          });
        }

        setShowQuestForm(false);
        setQuestToEdit(null);
      } catch (error) {
        console.error("Failed to save quest:", error);
        setFormError(error.message || "Failed to save quest");
      } finally {
        setIsSubmitting(false);
      }
    },
    [questToEdit, formDate, onAddQuest, onEditQuest]
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      {/* SECTION 1: Horizontal layout with navigation elements */}
      <div className="mb-3">
        <div className="flex items-center h-7">
          {/* Today button */}
          <button
            onClick={goToToday}
            className="px-6 py-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
              shadow-sm border border-gray-200 dark:border-gray-700
              rounded-lg transition-colors min-w-[90px] flex justify-center items-center"
            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
          >
            <span className="font-bold text-gray-400 dark:text-gray-500 text-xs">
              Today
            </span>
          </button>

          {/* Arrow navigation */}
          <div className="flex items-center ml-3">
            <button
              onClick={previousMonth}
              className="text-gray-400 hover:text-gray-600 transition-colors w-4 h-4 flex items-center justify-center"
              aria-label="Previous month"
            >
              <svg
                width="8"
                height="5"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6L6 1L11 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={nextMonth}
              className="text-gray-400 hover:text-gray-600 transition-colors w-4 h-4 flex items-center justify-center ml-1"
              aria-label="Next month"
            >
              <svg
                width="8"
                height="5"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Month indicator */}
          <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            {formatDate(currentMonth, "MMMM yyyy")}
          </span>

          {/* Horizontal divider line */}
          <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
        </div>
      </div>

      {/* SECTION 2: Calendar Grid */}
      <div
        className={`quest-calendar rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <CalendarHeader weekdays={weekdays} />

        {/* Calendar days with responsive height */}
        <div className="h-[calc(100vh-12rem)] overflow-auto">
          {Array.from({ length: Math.ceil(calendar.length / 7) }).map(
            (_, weekIndex) => {
              const startIdx = weekIndex * 7;
              return (
                <div key={`week-${startIdx}`} className="grid grid-cols-7">
                  {calendar.slice(startIdx, startIdx + 7).map((day) => {
                    const dayItems = itemsByDate[day.dateStr] || [];
                    const isSelected = selectedDate === day.dateStr;

                    return (
                      <CalendarDay
                        key={day.dateStr}
                        day={day}
                        dayItems={dayItems}
                        isSelected={isSelected}
                        handleDayClick={handleDayClick}
                        onEditQuest={handleEditQuest}
                        onAddQuest={handleAddQuest}
                        onDeleteQuest={onDeleteQuest}
                      />
                    );
                  })}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Add Quest Form Modal */}
      {showQuestForm && (
        <AddQuestForm
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          initialData={questToEdit || { dueDate: formDate }}
          isOpen={showQuestForm}
          isSubmitting={isSubmitting}
          error={formError}
        />
      )}
    </div>
  );
};

// Update the QuestCalendarView propTypes to match new behavior
QuestCalendarView.propTypes = {
  quests: PropTypes.array,
  subtasks: PropTypes.array,
  onAddQuest: PropTypes.func.isRequired,
  onEditQuest: PropTypes.func.isRequired,
  onDeleteQuest: PropTypes.func.isRequired,
};

export default QuestCalendarView;
