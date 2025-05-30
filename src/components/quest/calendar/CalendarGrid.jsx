import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Inline CalendarDay component
const CalendarDay = ({
  day,
  isDarkMode,
  selectedDate,
  onClick,
  getStatusColor,
}) => {
  return (
    <div
      onClick={() => onClick(day)}
      className={classNames(
        "h-24 p-1 border relative",
        day.isCurrentMonth
          ? isDarkMode
            ? "bg-gray-800"
            : "bg-white"
          : isDarkMode
          ? "bg-gray-900 text-gray-500"
          : "bg-gray-50 text-gray-400",
        day.isToday
          ? "border-blue-400 border-2"
          : isDarkMode
          ? "border-gray-700"
          : "border-gray-100",
        day.hasItems &&
          "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700",
        selectedDate === day.dateStr &&
          (isDarkMode ? "bg-blue-900" : "bg-blue-50")
      )}
    >
      {/* Day number */}
      <div
        className={classNames(
          "font-medium text-sm mb-1",
          isDarkMode ? "text-gray-200" : ""
        )}
      >
        {day.dayOfMonth}
      </div>

      {/* Quest indicators */}
      <div className="flex flex-wrap gap-1">
        {day.items.slice(0, 3).map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className={classNames(
              "w-2 h-2 rounded-full",
              getStatusColor(item.status)
            )}
            title={item.name}
          ></div>
        ))}

        {day.itemCount > 3 && (
          <span className="text-xs ml-1">{day.itemCount - 3} more</span>
        )}
      </div>
    </div>
  );
};

const CalendarGrid = ({
  weekdays,
  calendar,
  selectedDate,
  handleDayClick,
  isDarkMode,
  getStatusColor,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Weekday Headers */}
      {weekdays.map((day) => (
        <div
          key={day}
          className={classNames(
            "py-2 font-medium text-center",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}
        >
          {day}
        </div>
      ))}

      {/* Calendar Days */}
      {calendar.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          isDarkMode={isDarkMode}
          selectedDate={selectedDate}
          onClick={handleDayClick}
          getStatusColor={getStatusColor}
        />
      ))}
    </div>
  );
};

CalendarGrid.propTypes = {
  weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
  calendar: PropTypes.array.isRequired,
  selectedDate: PropTypes.string,
  handleDayClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  getStatusColor: PropTypes.func.isRequired,
};

export default CalendarGrid;
