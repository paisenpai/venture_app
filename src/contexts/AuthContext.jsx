// NOT DONE YET 
// Authentication context to manage user state and authentication actions
// This context will provide authentication state and functions to the rest of the app
// such as login, logout, and register.


import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard'); // Redirect to a protected page after login
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page after logout
    };

    // Register function (placeholder, replace with real implementation)
    const register = async (userData) => {
        console.log('Registering user:', userData);
        // After successful registration, you might want to log the user in
    };

    const updateUser = (updates) => {
        setUser((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext };
