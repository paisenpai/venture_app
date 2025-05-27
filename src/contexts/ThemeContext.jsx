// ThemeContext.jsx
// This file contains the ThemeContext and ThemeProvider component,
// which provides theme management for the application.
// It allows toggling between light and dark themes.

import React, { createContext, useContext, useState, useEffect } from "react";

// Create theme context
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference stored in localStorage
  // Default to 'light' if nothing is found
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Effect to update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Apply theme class to the document body
    document.body.className = theme;
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Provide theme values to children
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
