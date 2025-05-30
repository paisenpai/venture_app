// Authentication context to manage user state and authentication actions
// This context will provide authentication state and functions to the rest of the app
// such as login, logout, and register.

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Complete authentication implementation with proper JWT handling
// TODO: Add refresh token mechanism
// TODO: Add persistent authentication state

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // TODO: Implement token validation logic
          setUser({}); // user details
        } catch (err) {
          console.error("Auth token invalid:", err);
          localStorage.removeItem("authToken");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await api.login(credentials);
      const response = {
        token: "sample-token",
        user: { id: 1, name: "Demo User" },
      };

      localStorage.setItem("authToken", response.token);
      setUser(response.user);
      navigate("/");

      return true;
    } catch (err) {
      setError(err.message || "Failed to login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await api.register(userData);

      // Automatically login after registration
      return await login({
        email: userData.email,
        password: userData.password,
      });
    } catch (err) {
      setError(err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
