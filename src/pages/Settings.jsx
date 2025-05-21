import React, { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext';

const Settings = () => {
  const themeContext = useContext(ThemeContext) || {};
  const theme = themeContext.theme || {
    background: '#ffffff',
    color: '#000000',
    infoBoxBackground: '#f9f9f9',
  };

  // Example site settings actions
  const handleThemeToggle = () => {
    if (themeContext.toggleTheme) themeContext.toggleTheme();
  };

  const handleClearCache = () => {
    // Add your cache clearing logic here
    alert('Site cache cleared!');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: theme.background,
        color: theme.color,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="w-full max-w-md rounded-xl shadow-md p-8" style={{ background: theme.infoBoxBackground }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Site Settings</h2>
        <div className="space-y-4">
          <button
            onClick={handleThemeToggle}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition-colors"
          >
            Toggle Theme
          </button>
          <button
            onClick={handleClearCache}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors"
          >
            Clear Site Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
