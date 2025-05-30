import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";
import { useTheme } from "../contexts/ThemeContext";

// Character stats data - replace with actual data from your state/context
const characterData = {
  name: "Adventurer",
  level: 12,
  class: "Warrior",
  xp: 1240,
  nextLevelXp: 2000,
  stats: {
    strength: 75,
    agility: 60,
    intelligence: 45,
    vitality: 80,
    charisma: 55,
  },
  skills: [
    { name: "Sword Fighting", level: 4, progress: 70 },
    { name: "Leadership", level: 3, progress: 40 },
    { name: "Problem Solving", level: 5, progress: 90 },
    { name: "Time Management", level: 2, progress: 30 },
  ],
  achievements: {
    completed: 8,
    total: 24,
  },
  questsCompleted: 15,
};

// Simple avatar component that creates a colored circle with initials
const AvatarPlaceholder = ({ name, className }) => {
  // Generate a consistent color based on the name
  const getColorFromName = (name) => {
    const colors = [
      "#4F46E5", // indigo-600
      "#7C3AED", // violet-600
      "#8B5CF6", // purple-500
      "#EC4899", // pink-500
      "#3B82F6", // blue-500
      "#10B981", // emerald-500
      "#F59E0B", // amber-500
      "#EF4444", // red-500
    ];

    // Simple hash function to get consistent color from name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const bgColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div
      className={`flex items-center justify-center text-white font-bold text-4xl ${className}`}
      style={{
        backgroundColor: bgColor,
        height: "12rem",
        width: "12rem",
        borderRadius: "50%",
      }}
    >
      {initials}
    </div>
  );
};

const Character = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [viewMode, setViewMode] = useState("stats");

  const handleViewChange = (view) => {
    setViewMode(view);
  };

  // Function to calculate XP progress percentage
  const calculateXpPercentage = () => {
    return (characterData.xp / characterData.nextLevelXp) * 100;
  };

  return (
    <div className="w-full px-4 py-4">
      <PageHeader title="Character" variant="standard" size="large">
        <SettingsMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          darkMode={theme === "dark"}
          setDarkMode={toggleTheme}
        />
      </PageHeader>

      {/* View Selector */}
      <div className="flex justify-center gap-4 my-6 w-full">
        <button
          onClick={() => handleViewChange("stats")}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === "stats"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => handleViewChange("appearance")}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === "appearance"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => handleViewChange("inventory")}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === "inventory"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Inventory
        </button>
      </div>

      {/* Character Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 w-full">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-6 flex justify-center items-center">
            <div className="relative">
              {/* Replace the img with our AvatarPlaceholder component */}
              <AvatarPlaceholder
                name={characterData.name}
                className="border-4 border-indigo-500"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                {characterData.level}
              </div>
            </div>
          </div>

          <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="tracking-wide text-3xl text-indigo-800 dark:text-indigo-300 font-bold">
                {characterData.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {characterData.class}
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">
                  XP: {characterData.xp}/{characterData.nextLevelXp}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {calculateXpPercentage().toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${calculateXpPercentage()}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Quests Completed
                </div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {characterData.questsCompleted}
                </div>
              </div>
              <div className="text-center p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Achievements
                </div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {characterData.achievements.completed}/
                  {characterData.achievements.total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display content based on view mode */}
      {viewMode === "stats" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-8 w-full">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">
            Character Stats
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Core Stats */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Core Stats
              </h3>
              {Object.entries(characterData.stats).map(([stat, value]) => (
                <div key={stat} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {stat}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {value}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Skills
              </h3>
              {characterData.skills.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Lvl {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "appearance" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">
            Character Appearance
          </h2>
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Customize your character's appearance with different outfits and
                styles.
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Edit Appearance
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Hair", "Face", "Outfit", "Accessories"].map((item) => (
                <div
                  key={item}
                  className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg text-center"
                >
                  <div className="text-3xl mb-2">🎭</div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "inventory" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">
            Inventory
          </h2>
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              View and manage your items, equipment, and rewards.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Health Potion",
              "Magic Scroll",
              "Gold Coins",
              "Map",
              "Compass",
              "Badge of Honor",
              "Key",
              "Gem Stone",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg text-center"
              >
                <div className="text-3xl mb-2">🎒</div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {item}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 w-full">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/quests")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition"
        >
          View Quests
        </button>
      </div>
    </div>
  );
};

export default Character;
