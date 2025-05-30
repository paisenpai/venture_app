import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTheme } from "../../../contexts/ThemeContext"; // Use contexts (plural)

// Use actual components instead of importing placeholders
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import DateDetailsPanel from "./DateDetailsPanel";

// Import extracted utility functions
import {
  getStatusColor,
  groupItemsByDate,
  getQuestsByStatus,
} from "../../../utils/QuestBoard/calendarUtils";

// New utility functions to replace date-fns
const formatDate = (date, formatStr) => {
  if (!date) return ""; // Add return statement

  const d = new Date(date);

  switch (formatStr) {
    case "yyyy-MM-dd":
      return d.toISOString().split("T")[0];
    case "d":
      return d.getDate();
    case "MMMM yyyy":
      return (
        d.toLocaleString("default", { month: "long" }) + " " + d.getFullYear()
      );
    default:
      return d.toLocaleDateString(); // Add default return
  }
};

const startOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d; // Add proper return statement
};

const endOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0); // Last day of previous month
  d.setHours(23, 59, 59, 999);
  return d;
};

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
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

// Add missing return statement in isSameDay
const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false; // Add return statement

  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

// Fix parseISO function
const parseISO = (dateString) => {
  if (!dateString) return null; // Add return statement

  return new Date(dateString);
};

// New function to generate calendar days
const generateCalendarDays = (currentMonth, itemsByDate) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    const dateStr = formatDate(day, "yyyy-MM-dd");
    days.push({
      date: new Date(day),
      dateStr,
      isCurrentMonth: isSameMonth(day, monthStart),
      isToday: isSameDay(day, new Date()),
      hasItems: itemsByDate[dateStr] && itemsByDate[dateStr].length > 0,
    });
    day = addDays(day, 1);
  }

  return days;
};

const QuestCalendarView = ({
  quests = [],
  subtasks = [],
  onAddQuest,
  onEditQuest,
  onChangeStatus,
  onDeleteQuest,
}) => {
  const { darkMode } = useTheme(); // Changed from theme to darkMode based on context
  const isDarkMode = darkMode;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateDetails, setShowDateDetails] = useState(false);

  // Reset selected date when month changes
  useEffect(() => {
    setSelectedDate(null);
    setShowDateDetails(false);
  }, [currentMonth.getMonth(), currentMonth.getFullYear()]);

  // Create items array with both quests and subtasks
  const allItems = useMemo(
    () =>
      [
        ...quests.map((quest) => ({
          ...quest,
          type: "quest",
          date: quest.dueDate ? parseISO(quest.dueDate) : null,
        })),
        ...subtasks.map((subtask) => ({
          ...subtask,
          type: "subtask",
          date: subtask.dueDate ? parseISO(subtask.dueDate) : null,
        })),
      ].filter((item) => item.date !== null), // Only include items with dates
    [quests, subtasks]
  );

  // Group items by date - memoized
  const itemsByDate = useMemo(
    () => groupItemsByDate(quests, subtasks),
    [quests, subtasks]
  );

  // Calendar navigation functions - improved with useCallback
  const previousMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  const resetToToday = useCallback(() => {
    setCurrentMonth(new Date());
    setSelectedDate(formatDate(new Date(), "yyyy-MM-dd"));
    setShowDateDetails(true);
  }, []);

  // Group selected date's quests by status - memoized
  const selectedDateQuests = useMemo(
    () => getQuestsByStatus(selectedDate, itemsByDate),
    [selectedDate, itemsByDate]
  );

  // Generate calendar grid
  const calendar = useMemo(
    () => generateCalendarDays(currentMonth, itemsByDate),
    [currentMonth, itemsByDate]
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Handle day click
  const handleDayClick = useCallback((day) => {
    if (day.hasItems) {
      setSelectedDate(day.dateStr);
      setShowDateDetails(true);
    }
  }, []);

  // Close details panel
  const closeDetails = useCallback(() => {
    setShowDateDetails(false);
  }, []);

  // Handle quest actions
  const handleQuestAction = useCallback(
    (item) => {
      onEditQuest(item.id);
    },
    [onEditQuest]
  );

  // Status color helper
  const getStatusColorClass = useCallback(
    (status) => getStatusColor(status, isDarkMode),
    [isDarkMode]
  );

  // Update the event processing
  const events = useMemo(() => {
    const questEvents = quests
      .filter((q) => q.dueDate)
      .map((quest) => ({
        id: quest.id,
        title: quest.name,
        start: new Date(quest.dueDate),
        end: new Date(quest.dueDate),
        allDay: true,
        category: quest.category,
        status: quest.status,
        type: "quest",
      }));

    const subtaskEvents = subtasks
      .filter((s) => s.dueDate)
      .map((subtask) => ({
        id: `subtask-${subtask.id}`,
        title: subtask.name,
        start: new Date(subtask.dueDate),
        end: new Date(subtask.dueDate),
        allDay: true,
        category: subtask.category,
        status: subtask.status,
        parentId: subtask.parentId,
        type: "subtask",
      }));

    return [...questEvents, ...subtaskEvents];
  }, [quests, subtasks]);

  // Render header with month and navigation
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {formatDate(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Previous
          </button>
          <button
            onClick={resetToToday}
            className="p-2 rounded bg-blue-100 hover:bg-blue-200"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
          <button
            onClick={onAddQuest}
            className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Quest
          </button>
        </div>
      </div>
    );
  };

  // Render days of week header
  const renderDaysOfWeek = () => {
    return (
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center py-2 font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Render calendar days
  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const formattedDate = formatDate(day, "yyyy-MM-dd");
        const dayItems = allItems.filter(
          (item) => item.date && isSameDay(item.date, currentDay)
        );

        days.push(
          <div
            key={formattedDate}
            className={`min-h-[100px] border p-2 ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-50 text-gray-400"
                : isSameDay(day, new Date())
                ? "bg-blue-50 border-blue-300"
                : "bg-white"
            }`}
          >
            <div className="font-medium text-right text-sm">
              {formatDate(day, "d")}
            </div>

            <div className="mt-1 space-y-1">
              {dayItems.map((item, idx) => (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => item.type === "quest" && onEditQuest(item.id)}
                  className={`p-1 rounded text-xs truncate cursor-pointer hover:bg-opacity-80 ${
                    item.type === "quest"
                      ? item.status === "completed"
                        ? "bg-green-100"
                        : item.status === "ongoing"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                      : "bg-indigo-50 border-l-2 border-indigo-300"
                  }`}
                  title={item.description || item.name}
                >
                  <div className="font-medium truncate">{item.name}</div>
                  {item.type === "subtask" && item.parentName && (
                    <div className="text-xs text-gray-500 truncate">
                      {item.parentName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div
          key={formatDate(new Date(days[0].key), "yyyy-MM-dd")}
          className="grid grid-cols-7 gap-1"
        >
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div
      className={classNames(
        "quest-calendar rounded-xl shadow-md p-5",
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      )}
    >
      {/* Calendar Header */}
      {renderHeader()}

      {/* Calendar Grid */}
      {renderDaysOfWeek()}
      {renderDays()}

      {/* Selected Day Details */}
      {showDateDetails && selectedDate && (
        <DateDetailsPanel
          selectedDate={selectedDate}
          selectedDateQuests={selectedDateQuests}
          onClose={closeDetails}
          handleQuestAction={handleQuestAction}
          isDarkMode={isDarkMode}
          getStatusColor={getStatusColorClass}
        />
      )}
    </div>
  );
};

QuestCalendarView.propTypes = {
  quests: PropTypes.array,
  subtasks: PropTypes.array,
  onAddQuest: PropTypes.func,
  onEditQuest: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onDeleteQuest: PropTypes.func,
};

export default QuestCalendarView;
