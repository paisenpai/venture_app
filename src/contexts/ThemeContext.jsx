// ThemeContext.jsx
// This file contains the ThemeContext and ThemeProvider component,
// which provides theme management for the application.
// It allows toggling between light and dark themes.

import React, { createContext, useState, useContext, useEffect } from 'react';
import './styles.css';

// Create ThemeContext with default values
const ThemeContext = createContext({
    theme: 'light', // Default theme
    toggleTheme: () => {}, // Placeholder function for toggling theme
});

// ThemeProvider component to manage and provide theme state
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        try {
            const storedTheme = localStorage.getItem('theme');
            return storedTheme === 'dark' ? 'dark' : 'light';
        } catch {
            return 'light'; // Default to light theme if localStorage fails
        }
    });

    // Update localStorage whenever the theme changes
    useEffect(() => {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.error('Failed to save theme to localStorage:', error);
        }
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

// Custom hook to use ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};
