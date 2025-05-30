import React from "react";
import PropTypes from "prop-types";

const PageTitle = ({ title, className = "", size = "large" }) => {
  // Determine size-based styling
  let fontSize;
  let fontWeight;

  switch (size) {
    case "small":
      fontSize = "text-xl";
      fontWeight = "font-semibold";
      break;
    case "medium":
      fontSize = "text-2xl";
      fontWeight = "font-bold";
      break;
    case "large":
    default:
      fontSize = "text-3xl md:text-4xl";
      fontWeight = "font-bold";
      break;
  }

  return (
    <h1
      className={`text-primary dark:text-primary-dark ${fontSize} ${fontWeight} font-typold ${className}`}
    >
      {title}
    </h1>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default PageTitle;
