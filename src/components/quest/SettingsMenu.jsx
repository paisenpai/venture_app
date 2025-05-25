import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SettingsDots from "../../assets/icons/SettingsDots.png";

const SettingsMenu = ({ showMenu, setShowMenu, darkMode, setDarkMode, viewMode, setViewMode }) => {
    const menuRef = useRef(null);

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowMenu]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="w-10 h-10 flex-shrink-0 focus:outline-none"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Quest Board Settings"
                aria-expanded={showMenu}
                tabIndex={0}
            >
                <img
                    className="w-10 h-10"
                    src={SettingsDots}
                    alt="Quest Board Settings Icon"
                />
            </button>
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 text-black">
                    {/* Toggle Dark Mode */}
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                            setDarkMode((prev) => !prev);
                            setShowMenu(false);
                        }}
                    >
                        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                    {/* Board View */}
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                            setViewMode("board");
                            setShowMenu(false);
                        }}
                        disabled={viewMode === "board"}
                    >
                        Board View
                    </button>

                    {/* List View */}
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                            setViewMode("list");
                            setShowMenu(false);
                        }}
                        disabled={viewMode === "list"}
                    >
                        List View
                    </button>

                    {/* Calendar View */}
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                            setViewMode("calendar");
                            setShowMenu(false);
                        }}
                        disabled={viewMode === "calendar"}
                    >
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