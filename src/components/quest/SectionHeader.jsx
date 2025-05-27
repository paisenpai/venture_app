import React from "react";
import PropTypes from "prop-types";

const SectionHeader = ({ title, count, bgColor, textColor }) => {
  return (
    <div className="flex items-center mb-2 sm:mb-3">
      <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${textColor}`}>
        {title}
      </h2>
      <div
        className={`ml-2 px-1.5 sm:px-2 py-0.5 rounded-full ${bgColor} text-white text-xs sm:text-sm font-medium`}
      >
        {count}
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

SectionHeader.defaultProps = {
  bgColor: "bg-indigo-900",
  textColor: "text-indigo-900",
};

export default SectionHeader;
