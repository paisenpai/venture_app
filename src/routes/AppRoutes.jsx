/**
 * This code defines the main routes for the application using React Router.
 * @fileoverview AppRoutes component
 * This component defines the main routes for the application using React Router.
 * It imports necessary components and sets up the routing structure.
 **/
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import Dashboard from '../pages/Dashboard';
import Quests from '../pages/Quests';
import Achievements from '../pages/Achievements';
import Progress from '../pages/Progress';
import Character from '../pages/Character';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main app routes with sidebar */}
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="quests" element={<Quests />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="progress" element={<Progress />} />
        <Route path="character" element={<Character />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;