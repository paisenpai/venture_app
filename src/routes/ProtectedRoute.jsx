import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth state, you might want to show a loading spinner
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;