/**
 * This code defines the main routes for the application using React Router.
 * @fileoverview AppRoutes component
 * This component defines the main routes for the application using React Router.
 * It imports necessary components and sets up the routing structure.
 **/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Achievements from '../pages/Achievements';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;