import React, { useRef, useEffect } from "react";
import settingsIcon from "../../../assets/icons/SettingsDots.png";

const SettingsMenu = ({
  showMenu,
  setShowMenu,
  darkMode,
  setDarkMode,
  viewMode,
  setViewMode,
}) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Settings button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        aria-label="Settings"
      >
        <img src={settingsIcon} alt="Settings" className="w-6 h-6" />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
              <p className="mb-2">View Mode</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setViewMode("board");
                    setShowMenu(false);
                  }}
                  className={`px-2 py-1 rounded text-left ${
                    viewMode === "board"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => {
                    setViewMode("list");
                    setShowMenu(false);
                  }}
                  className={`px-2 py-1 rounded text-left ${
                    viewMode === "list"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => {
                    setViewMode("calendar");
                    setShowMenu(false);
                  }}
                  className={`px-2 py-1 rounded text-left ${
                    viewMode === "calendar"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
