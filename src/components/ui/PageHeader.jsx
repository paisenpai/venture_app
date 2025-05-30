import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuPortal from "./MenuPortal";

/**
 * Unified PageHeader component with various configuration options
 * Can be used in different modes:
 * - Standard: Just title and optional children
 * - Simple: Title with optional theme toggle and settings menu
 * - Custom: Any combination of the above
 */
const PageHeader = ({
  title,
  subtitle,
  children,
  variant = "standard",
  darkMode,
  setDarkMode,
  showSettingsOption = false,
  onSettingsClick,
  className = "",
  titleClassName = "",
  size = "large",
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);

  // Define the title styling based on design specs
  const titleStyle = {
    color: "#1F168D",
    fontSize: size === "large" ? "48px" : size === "medium" ? "36px" : "24px",
    fontFamily: "Typold, sans-serif",
    fontWeight: "800",
    wordWrap: "break-word",
  };

  // Close settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle theme toggle
  const handleThemeToggle = () => {
    if (setDarkMode) {
      setDarkMode(!darkMode);
    }
  };

  // Handle settings click
  const toggleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      setShowSettings(!showSettings);
    }
  };

  // Render based on variant
  switch (variant) {
    case "simple":
      return (
        <div className={`flex justify-between items-center mb-4 ${className}`}>
          <h1 style={titleStyle} className={`font-typold ${titleClassName}`}>
            {title}
          </h1>
          <div className="flex items-center gap-2">
            {setDarkMode && (
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            )}
            {showSettingsOption && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleSettings}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Settings"
                >
                  <img
                    src="/src/assets/icons/SettingsDots.png"
                    alt="Settings"
                    className="w-6 h-6"
                  />
                </button>
                <MenuPortal isOpen={showSettings}>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                    {/* Settings menu content */}
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Help
                      </button>
                    </div>
                  </div>
                </MenuPortal>
              </div>
            )}
          </div>
        </div>
      );

    case "custom":
      return (
        <div className={`flex justify-between items-center mb-4 ${className}`}>
          <h1 style={titleStyle} className={`font-typold ${titleClassName}`}>
            {title}
          </h1>
          <div className="flex items-center">{children}</div>
        </div>
      );

    case "standard":
    default:
      return (
        <div className={`flex justify-between items-center mb-4 ${className}`}>
          <h1 style={titleStyle} className={`font-typold ${titleClassName}`}>
            {title}
          </h1>
          <div className="flex items-center">{children}</div>
        </div>
      );
  }
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["standard", "simple", "custom"]),
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
  showSettingsOption: PropTypes.bool,
  onSettingsClick: PropTypes.func,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default PageHeader;

// If you have usage examples in this file, make sure they're wrapped in a fragment
// For example:
/*
const PageHeaderExamples = () => {
  return (
    <>
      <PageHeader
        title="Simple View"
        variant="simple"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showSettingsOption={true}
      />
      
      <PageHeader
        title="Custom View"
        variant="custom"
      >
        <div className="flex items-center gap-4">
          <button className="btn">Action</button>
          <button className="btn-primary">Primary Action</button>
        </div>
      </PageHeader>
    </>
  );
};
*/
