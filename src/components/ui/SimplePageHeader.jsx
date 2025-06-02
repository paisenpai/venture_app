import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import PageTitle from "./PageTitle";
import SettingsDots from "../../assets/icons/SettingsDots.png";

const SimplePageHeader = ({ title, darkMode, setDarkMode }) => {
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
      <PageTitle title={title} />
      
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <img 
            src={SettingsDots} 
            alt="Settings" 
            className="w-6 h-6" 
          />
        </button>
        
        {showSettings && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20"
          >
            <div className="py-1">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {/* Add more common menu items here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SimplePageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
};

export default SimplePageHeader;
