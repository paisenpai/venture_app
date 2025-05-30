import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const CalendarHeader = ({
  currentDate,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  isDarkMode,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-[#1F168D] mb-4">
        {currentDate.toLocaleString("default", { month: "long" })}{" "}
        {currentDate.getFullYear()}
      </h2>

      <div className="flex space-x-2">
        <button
          onClick={goToPreviousMonth}
          className={classNames(
            "p-2 rounded-full transition-colors",
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-100"
          )}
          aria-label="Previous Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

        <button
          onClick={goToToday}
          className={classNames(
            "px-3 py-1 text-sm font-medium rounded-md transition-colors",
            isDarkMode
              ? "bg-blue-800 text-blue-100 hover:bg-blue-700"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          )}
        >
          Today
        </button>

        <button
          onClick={goToNextMonth}
          className={classNames(
            "p-2 rounded-full transition-colors",
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-100"
          )}
          aria-label="Next Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </div>
  );
};

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  goToPreviousMonth: PropTypes.func.isRequired,
  goToNextMonth: PropTypes.func.isRequired,
  goToToday: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default CalendarHeader;
