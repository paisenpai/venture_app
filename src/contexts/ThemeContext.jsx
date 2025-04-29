// ThemeContext.jsx
// This file contains the ThemeContext and ThemeProvider component
// which provides theme management for the application.
// It allows toggling between light and dark themes.
// It uses React's Context API to provide theme-related state and functions
// to the entire application.

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create ThemeContext
const ThemeContext = createContext({
    theme: 'light', // Default theme
    toggleTheme: () => {}, // Function to toggle theme
});

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
try {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark' ? 'dark' : 'light';
} catch {
            return 'light';
        }
    });

    // Update localStorage whenever theme changes
    useEffect(() => {
try {
        localStorage.setItem('theme', theme);
} catch {
            console.error('Failed to save theme to localStorage');
        }
    }, [theme]);

    // Toggle between light and dark mode
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
