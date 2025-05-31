// Authentication context to manage user state and authentication actions
// This context will provide authentication state and functions to the rest of the app
// such as login, logout, and register.

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on initial load
  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token) {
      setIsAuthenticated(true);
      setUser(userData ? JSON.parse(userData) : null);
    }

    setLoading(false);
  }, []);

  // Login function with guaranteed demo login support
  const login = async (email, password) => {
    try {
      console.log("Login attempt with:", email);
      setLoading(true);

      // Special handling for demo user
      if (email === "demo@example.com" && password === "demopassword") {
        console.log("Demo login credentials recognized");

        // Create demo user data
        const demoUserData = {
          id: "demo-user-123",
          email: "demo@example.com",
          name: "Demo User",
          role: "user",
        };

        // Store auth info
        localStorage.setItem("authToken", "demo-token-123456");
        localStorage.setItem("userData", JSON.stringify(demoUserData));

        // Update state
        setIsAuthenticated(true);
        setUser(demoUserData);

        return true;
      }

      // Regular login logic for other users
      if (email.length > 3) {
        // Simulate successful login
        const userData = {
          id: `user-${Date.now()}`,
          email: email,
          name: email.split("@")[0],
          role: "user",
        };

        // Store auth info
        localStorage.setItem("authToken", `token-${Date.now()}`);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Update state
        setIsAuthenticated(true);
        setUser(userData);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Reset state
    setIsAuthenticated(false);
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      // For demo purposes - in a real app, you would call your API
      setLoading(true);

      // Simulate successful registration
      const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.username || userData.email.split("@")[0],
        role: "user",
      };

      // Store auth info
      localStorage.setItem("authToken", `token-${Date.now()}`);
      localStorage.setItem("userData", JSON.stringify(newUser));

      // Update state
      setIsAuthenticated(true);
      setUser(newUser);

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Expose the auth context value
  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
