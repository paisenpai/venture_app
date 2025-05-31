import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import Dashboard from "../pages/Dashboard";
import Quests from "../pages/Quests";
import Progress from "../pages/Progress";
import Character from "../pages/Character";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Auth routes - accessible when not logged in */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes - require authentication */}
      <Route
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quests" element={<Quests />} />
        <Route
          path="achievements"
          element={<div className="p-6">Achievements coming soon!</div>}
        />
        <Route path="progress" element={<Progress />} />
        <Route path="character" element={<Character />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Root redirect to login if not authenticated */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      {/* Fallback route for undefined paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
