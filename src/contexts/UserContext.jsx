// NOT DONE YET
// This file will contain the UserContext and UserProvider
// It will manage user data and authentication state
// It will also provide functions to update user data and authentication state
// It will be used in the App component to provide user data and authentication state to the entire app
// Import necessary libraries

import { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '', // use 'name' instead of 'username'
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
            name: '', // use 'name' instead of 'username'
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
