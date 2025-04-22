import React, { createContext, useState, useContext } from 'react';


// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        xp: 0,
        level: 1,
        avatar: '',
        theme: 'light', // Default theme
        achievements: [],
        notificationsEnabled: true,
    });

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser({
            username: '',
            xp: 0,
            level: 1,
            avatar: '',
            theme: 'light',
            achievements: [],
            notificationsEnabled: true,
        });
    };

    const updateUser = (updates) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updates,
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// Removed duplicate UserContext and UserProvider declarations
