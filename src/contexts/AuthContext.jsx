import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Simulate fetching user data (replace with real API call)
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const storedToken = localStorage.getItem('token');
                if (storedUser && storedToken) {
                    setUser(storedUser);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Login function
    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        navigate('/dashboard'); // Redirect to a protected page after login
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    // Register function (placeholder, replace with real implementation)
    const register = async (userData) => {
        // Simulate registration logic
        console.log('Registering user:', userData);
        // After successful registration, you might want to log the user in
    };

    // Check if user is logged in
    const isLoggedIn = !!user && !!token;

    return (
        <AuthContext.Provider value={{ user, token, loading, isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};