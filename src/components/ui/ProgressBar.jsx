import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({
  value,
  barColor = "bg-yellow-500",
  bgColor = "bg-gray-200",
}) => {
  return (
    <div className={`w-full h-4 ${bgColor} rounded-full`}>
      <div
        className={`h-full ${barColor} rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  barColor: PropTypes.string,
  bgColor: PropTypes.string,
};

export default ProgressBar;
