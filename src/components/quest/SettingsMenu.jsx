import React from "react";
import PropTypes from "prop-types";

const SettingsMenu = ({ showMenu, setShowMenu, darkMode, setDarkMode, viewMode, setViewMode }) => {
    return (
        <div className="relative">
            <button
                className="w-10 h-10"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Quest Board Settings"
            >
                <img src="/path/to/SettingsDots.png" alt="Settings" />
            </button>
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <button onClick={() => setDarkMode((prev) => !prev)}>
                        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                    <button onClick={() => setViewMode("board")} disabled={viewMode === "board"}>
                        Board View
                    </button>
                    <button onClick={() => setViewMode("list")} disabled={viewMode === "list"}>
                        List View
                    </button>
                    <button onClick={() => setViewMode("calendar")} disabled={viewMode === "calendar"}>
                        Calendar View
                    </button>
                </div>
            )}
        </div>
    );
};

SettingsMenu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    setShowMenu: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    viewMode: PropTypes.string.isRequired,
    setViewMode: PropTypes.func.isRequired,
};

export default SettingsMenu;