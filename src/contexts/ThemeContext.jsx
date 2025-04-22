import React, { createContext, useState, useContext, useEffect } from 'react';

// Create ThemeContext
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    const [accentColor, setAccentColor] = useState(() => {
        // Load accent color from localStorage or default to '#007bff' (blue)
        return localStorage.getItem('accentColor') || '#007bff';
    });

    // Update localStorage whenever theme or accentColor changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    // Toggle between light and dark mode
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Update accent color
    const updateAccentColor = (color) => {
        setAccentColor(color);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, updateAccentColor }}>
            <div className={theme} style={{ '--accent-color': accentColor }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

// Custom hook to use ThemeContext
export const useTheme = () => {
    return useContext(ThemeContext);
};