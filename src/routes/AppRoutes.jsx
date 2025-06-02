"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

// Pages
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Quests from "../pages/Quests"
import Character from "../pages/Character"
import Progress from "../pages/Progress"
import Settings from "../pages/Settings"
import AuthCallback from "../pages/AuthCallback"

// Layout components
import MainLayout from "../layout/MainLayout"
import AuthLayout from "../layout/AuthLayout"

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth routes - accessible when not logged in */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Route>

      {/* Protected routes - require authentication */}
      <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/character" element={<Character />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/achievements" element={<div className="p-6">Achievements coming soon!</div>} />
      </Route>

      {/* Fallback route for undefined paths */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  )
}

export default AppRoutes
