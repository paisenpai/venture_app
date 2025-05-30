import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import Dashboard from "../pages/Dashboard";
import Quests from "../pages/Quests";
import Progress from "../pages/Progress";
import Character from "../pages/Character";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";

import React, { useState } from "react";

const QuestList = () => {
  // Sample quest data - replace with your actual data fetching logic
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Learn React Basics",
      difficulty: "Easy",
      reward: "50 XP",
      status: "completed",
    },
    {
      id: 2,
      title: "Build a To-Do App",
      difficulty: "Medium",
      reward: "100 XP",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Master State Management",
      difficulty: "Hard",
      reward: "200 XP",
      status: "not-started",
    },
    {
      id: 4,
      title: "Implement Authentication",
      difficulty: "Hard",
      reward: "250 XP",
      status: "not-started",
    },
  ]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Quests</h2>
      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-3 border rounded-md ${
              quest.status === "completed"
                ? "bg-green-50 border-green-200"
                : quest.status === "in-progress"
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{quest.title}</h3>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  quest.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : quest.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {quest.difficulty}
              </span>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Reward: {quest.reward}</span>
              <span className="capitalize">
                {quest.status.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

      {/* Fallback route for undefined paths */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
