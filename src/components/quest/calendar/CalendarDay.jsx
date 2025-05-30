import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

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

      {/* Quest indicators - max 3 visible dots */}
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
          <span
            className={classNames(
              "text-xs ml-1",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}
          >
            +{day.itemCount - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
};

export default CalendarDay;
