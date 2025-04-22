import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const isAuthenticated = false; // Replace with your actual authentication logic
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Protected route for the dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
