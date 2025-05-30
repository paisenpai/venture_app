import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProgressStats from "../features/Progress/useProgressStats";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";
import { useTheme } from "../contexts/ThemeContext";
import ErrorBoundary from "../components/common/ErrorBoundary";
import settingsDots from "../assets/icons/SettingsDots.png";
import XPBottleIcon from "../assets/icons/XPBottle.svg";
import StreakFlameIcon from "../assets/icons/StreakFlame.svg";

// Create SVG component for StreakFlame
const StreakFlame = ({ className, title, streakCount = 7 }) => (
  <div className={`relative ${className}`}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 10C28 15 24 22 24 32C24 42 28 48 36 48L37 49C36 50 34 52 34 55C34 60 36 64 38 64C40 64 42 60 42 55C42 52 40 50 39 49L40 48C48 48 52 42 52 32C52 22 48 15 44 10C40 15 36 22 36 32C36 35 37 37 38 38C36 39 34 42 34 45C34 47 35 49 36 49C37 49 38 47 38 45C38 42 36 39 34 38C35 37 36 35 36 32C36 22 32 15 32 10Z"
        fill="#FF9500"
      />
      <path
        d="M38 10C36 15 34 22 34 32C34 37 36 40 38 41C37 42 36 44 36 46C36 48 37 50 38 50C39 50 40 48 40 46C40 44 39 42 38 41C40 40 42 37 42 32C42 22 40 15 38 10Z"
        fill="#FFC000"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
      {streakCount}
    </div>
    <div className="absolute -right-1 bottom-0 bg-orange-500 h-5 w-5 rounded-full text-white flex items-center justify-center text-xs">
      n
    </div>
  </div>
);

const goalData = [
  {
    name: "Goal Name",
    category: "Category",
    progress: 65,
    daysLeft: 3,
    color: "yellow",
  },
  {
    name: "Goal Name",
    category: "Category",
    progress: 40,
    daysLeft: 7,
    color: "blue",
  },
  {
    name: "Goal Name",
    category: "Category",
    progress: 75,
    daysLeft: 8,
    color: "purple",
  },
  {
    name: "Goal Name",
    category: "Category",
    progress: 25,
    daysLeft: 5,
    color: "indigo",
  },
];

const statsData = {
  totalXP: "0000",
  dailyGoals: 75,
  todayTasks: 3,
  thisWeekTasks: 5,
  thisMonthTasks: 12,
  streakCount: 7,
};

const Progress = () => {
  const navigate = useNavigate();
  const { stats, loading, error } = useProgressStats();
  const { darkMode, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSettingsToggle = () => {
    setShowMenu(!showMenu);
  };

  // Simple line chart data
  const chartPoints = [
    { x: 0, y: 160 },
    { x: 50, y: 110 },
    { x: 100, y: 90 },
    { x: 150, y: 140 },
    { x: 200, y: 60 },
    { x: 250, y: 130 },
    { x: 300, y: 30 },
    { x: 350, y: 100 },
  ];

  const chartPath = chartPoints
    .map((point, index) => (index === 0 ? "M" : "L") + `${point.x},${point.y}`)
    .join(" ");

  // Main container - Add min-height to ensure it takes full screen height
  return (
    <div className="container-fluid w-full px-4 py-6 min-h-screen flex flex-col">
      {/* PageHeader remains the same */}
      <PageHeader title="Progress" variant="standard" size="large">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleSettingsToggle}
        >
          <img
            src={settingsDots}
            alt="Settings"
            className="w-6 h-6 object-contain"
          />
        </button>
      </PageHeader>

      {/* Settings Menu */}
      {showMenu && (
        <div className="absolute right-4 top-16 z-50">
          <SettingsMenu
            onClose={() => setShowMenu(false)}
            onToggleTheme={toggleTheme}
            isDarkMode={darkMode}
          />
        </div>
      )}

      <ErrorBoundary>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          // Add flex-grow to ensure content takes available height
          <div className="flex flex-col flex-grow">
            {/* Goals Section - Add flex-shrink-0 to prevent unwanted shrinking */}
            <section className="mb-8 w-full flex-shrink-0">
              <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                Goals
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {goalData.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow relative"
                  >
                    {/* Menu dots - simplified to match design */}
                    <button className="absolute top-4 right-4 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {goal.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {goal.category}
                    </p>

                    {/* Progress bar - simplified to match design */}
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded mb-3">
                      <div
                        className="h-1.5 rounded"
                        style={{
                          width: `${goal.progress}%`,
                          backgroundColor:
                            goal.color === "yellow"
                              ? "#F59E0B"
                              : goal.color === "blue"
                              ? "#60A5FA"
                              : goal.color === "purple"
                              ? "#A78BFA"
                              : "#818CF8", // indigo
                        }}
                      ></div>
                    </div>

                    {/* Days left pill - styled to match screenshot */}
                    <div
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                        goal.color === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : goal.color === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : goal.color === "purple"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {goal.daysLeft} Day{goal.daysLeft !== 1 ? "s" : ""} Left
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Statistics Section - Updated to true 3-column layout */}
            <section className="w-full flex-grow flex flex-col">
              <h2 className="text-lg font-medium mb-4 text-indigo-900 dark:text-indigo-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                Statistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[280px] w-full flex-grow">
                {/* Left Column - Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-6 h-full flex flex-col w-full">
                  <div className="h-60 relative mb-4 flex-grow">
                    <div className="absolute inset-0 flex flex-col justify-between px-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="border-t border-gray-100 dark:border-gray-700"
                        ></div>
                      ))}
                    </div>

                    <svg
                      className="w-full h-full relative z-10"
                      viewBox="0 0 400 200"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={chartPath}
                        fill="none"
                        stroke="#4338ca"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 px-2 pt-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Middle Column - XP/Streak and Circle Progress */}
                <div className="md:col-span-3 flex flex-col gap-5">
                  {/* XP and Streak Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={XPBottleIcon}
                        alt="XP"
                        className="w-[27px] h-[37px] object-contain"
                      />
                      <div className="flex flex-col">
                        <div className="text-indigo-900 dark:text-indigo-300 text-2xl font-bold">
                          {statsData.totalXP}
                        </div>
                        <div className="text-gray-400 text-sm">Total XP</div>
                      </div>
                    </div>

                    <div className="relative w-12 h-16">
                      <img
                        src={StreakFlameIcon}
                        alt="Streak"
                        className="w-[60px] h-[84px] object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center mt-3">
                        <div className="text-white text-sm font-medium">
                          {statsData.streakCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Goals Progress - Circle */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex items-center justify-center">
                    <div className="w-28 h-28 relative">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#f0f0f0"
                          strokeWidth="3"
                          className="dark:opacity-10"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="3"
                          strokeDasharray={`${
                            2 * Math.PI * 15 * (statsData.dailyGoals / 100)
                          }, ${2 * Math.PI * 15}`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-200">
                          {statsData.dailyGoals}%
                        </div>
                        <div className="text-xs text-gray-400">Daily Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Task stats cards stacked vertically */}
                <div className="md:col-span-3 flex flex-col gap-5">
                  {/* Today's Tasks */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img
                        src="/path/to/sword-icon.svg"
                        alt="Task icon"
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                        {statsData.todayTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">Slayed Today!</div>
                    </div>
                  </div>

                  {/* Week's Tasks */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img
                        src="/path/to/axe-icon.svg"
                        alt="Task icon"
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                        {statsData.thisWeekTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">
                        Slayed Last Week!
                      </div>
                    </div>
                  </div>

                  {/* Month's Tasks */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img
                        src="/path/to/shield-icon.svg"
                        alt="Task icon"
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
                        {statsData.thisMonthTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">
                        Slayed Last Month!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Progress;
