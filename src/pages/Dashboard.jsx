import React, { useState } from "react";
import useLevelSystem from "../features/leveling/useLevelSystem";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";
import { useTheme } from "../contexts/ThemeContext";
// Import the sword SVG
import SwordIcon from "../assets/icons/Sword2.svg";
// Import additional required icons
import XPBottleIcon from "../assets/icons/XPBottle.svg";
import StreakFlameIcon from "../assets/icons/StreakFlame.svg";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { level, xp, xpForNextLevel, addXP } = useLevelSystem(0);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [completedTasks, setCompletedTasks] = useState(3);
  const [totalDailyTasks, setTotalDailyTasks] = useState(4);
  const [slayedQuests, setSlayedQuests] = useState(5);

  // Mock data for stats (XP and streak)
  const statsData = {
    totalXP: "0000",
    streakCount: "7",
    dailyGoals: 75, // Percentage completion
  };

  // Other mock data remains the same
  const weeklyActivity = [
    { day: "Sun", value: 30, color: "bg-green-400" },
    { day: "Mon", value: 80, color: "bg-yellow-300" },
    { day: "Tue", value: 45, color: "bg-purple-500" },
    { day: "Wed", value: 90, color: "bg-purple-400" },
    { day: "Thu", value: 60, color: "bg-green-400" },
    { day: "Fri", value: 75, color: "bg-yellow-300" },
    { day: "Sat", value: 40, color: "bg-purple-500" },
  ];

  const pendingQuests = [
    { id: 1, name: "Task Name", daysLeft: 2 },
    { id: 2, name: "Task Name", daysLeft: 1 },
    { id: 3, name: "Task Name", daysLeft: 3 },
    { id: 4, name: "Task Name", daysLeft: 0 },
  ];

  const urgentTasks = [
    { id: 1, name: "Task Name", timeIndicator: "Time Indicator" },
    { id: 2, name: "Task Name", timeIndicator: "Time Indicator" },
  ];

  const generateCalendarDays = () => {
    const daysInMonth = 35; // 5 weeks view
    const days = [];
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(0); // Placeholder for day value
      }
      days.push(weekDays);
    }
    // Mark active day (example)
    days[2][6] = 1; // Matching the blue dot position in the image (3rd row, last column)
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Enhanced slate card styling with more prominent borders/outlines
  const cardStyle =
    "bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all";

  return (
    <div className="w-full px-4 py-4 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300 pb-4 border-b border-gray-200 dark:border-gray-800">
        Welcome Back, Adventurer!
      </h1>

      {/* ==================== SECTION 1: Activity Chart and Calendar ==================== */}
      <section className="my-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Weekly Activity Chart - with adjusted height */}
          <div className={`${cardStyle} p-4 md:p-6 lg:col-span-2`}>
            <div
              className="flex justify-between items-end pt-8 md:pt-12 pb-8 md:pb-12 px-2 md:px-6"
              style={{
                minHeight: "300px", // Reduced from 350px
                height: "calc(35vh + 60px)", // Reduced from 40vh
                maxHeight: "450px", // Reduced from 500px
              }}
            >
              {weeklyActivity.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: "13%" }}
                >
                  {/* Pill-shaped bar container with reduced height */}
                  <div className="relative w-full flex justify-center mb-4 md:mb-8">
                    <div
                      className="relative"
                      style={{
                        width: "40px",
                        height: "calc(32vh)", // Reduced from 38vh
                        maxHeight: "320px", // Reduced from 400px
                        minHeight: "200px", // Reduced from 240px
                        borderRadius: "24px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Background pill */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backgroundColor: "#E5E7EB",
                          borderRadius: "24px",
                        }}
                      />

                      {/* Colored fill pill */}
                      <div
                        className="absolute bottom-0 w-full"
                        style={{
                          height: `${day.value}%`,
                          backgroundColor:
                            day.color === "bg-green-400"
                              ? "#4ADE80"
                              : day.color === "bg-yellow-300"
                              ? "#FCD34D"
                              : day.color === "bg-purple-500"
                              ? "#A855F7"
                              : day.color === "bg-purple-400"
                              ? "#A855F7"
                              : "#818CF8",
                          borderRadius: "24px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Day label below the bar */}
                  <div className="text-center w-full">
                    <div className="text-gray-400 dark:text-gray-300 text-xs sm:text-sm font-medium">
                      {day.day}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Calendar - with responsive sizing */}
          <div className={`${cardStyle} p-4 md:p-6`}>
            <div className="flex justify-between items-center mb-4">
              <button className="w-5 h-5 text-gray-500 cursor-pointer flex items-center justify-center">
                &larr;
              </button>
              <h3 className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
                Month
              </h3>
              <button className="w-5 h-5 text-gray-500 cursor-pointer flex items-center justify-center">
                &rarr;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}

              {calendarDays.flat().map((value, index) => (
                <div
                  key={index}
                  className={`text-center py-1 md:py-2 text-xs sm:text-sm ${
                    value === 1
                      ? "bg-indigo-900 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center mx-auto"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  0
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Stats, Quests and Tasks ==================== */}
      <section className="mt-6 md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Column 1: XP and Progress Circle - with reduced width */}
          <div className="h-full flex flex-col md:col-span-3">
            {/* XP and Streak Card */}
            <div className={`${cardStyle} p-4 md:p-5 mb-4 md:mb-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={XPBottleIcon}
                    alt="XP"
                    className="w-[18px] h-[28px] md:w-[22px] md:h-[32px] object-contain"
                  />
                  <div>
                    <div className="text-[#1F168D] dark:text-indigo-300 text-lg md:text-xl font-medium">
                      {statsData.totalXP}
                    </div>
                    <div className="text-gray-300 dark:text-gray-400 text-xs">
                      Total XP
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={StreakFlameIcon}
                    alt="Streak"
                    className="w-[36px] h-[56px] md:w-[45px] md:h-[65px] object-contain"
                  />
                  <div className="text-center text-white text-sm md:text-base font-medium -mt-10">
                    {statsData.streakCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Tasks Progress Circle - with reduced width */}
            <div
              className={`${cardStyle} p-3 md:p-4 flex items-center justify-center flex-grow`}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
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
                  <div className="text-xl md:text-2xl font-bold text-indigo-900 dark:text-indigo-200">
                    {statsData.dailyGoals}%
                  </div>
                  <div className="text-xs text-gray-400">Daily Tasks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Pending Quests - adjusted to maintain balance */}
          <div className={`${cardStyle} p-6 h-full md:col-span-5`}>
            <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-400 mb-4">
              Pending Quests
            </h3>
            <div className="space-y-4">
              {pendingQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-400 mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {quest.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mr-2">
                      n Day(s) Left
                    </div>
                    <button className="text-gray-500 cursor-pointer">⋮</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button className="w-6 h-6 text-gray-500 cursor-pointer flex items-center justify-center">
                ▼
              </button>
            </div>
          </div>

          {/* Column 3: Urgent Tasks and Quests Slayed - adjusted to balance */}
          <div className="space-y-6 md:col-span-4">
            {/* Urgent Tasks */}
            <div className={`${cardStyle} p-6`}>
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
                Urgent
              </h3>
              <div className="space-y-2">
                {urgentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg"
                  >
                    <div className="text-red-700 dark:text-red-300">
                      {task.name}
                    </div>
                    <div className="text-red-600 dark:text-red-400 text-sm">
                      {task.timeIndicator}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="w-6 h-6 text-gray-500 cursor-pointer flex items-center justify-center">
                  ▼
                </button>
              </div>
            </div>

            {/* Quests Slayed Card */}
            <div className={`${cardStyle} p-6 flex items-center`}>
              <div className="flex items-center w-full">
                <img src={SwordIcon} alt="Sword" className="w-12 h-12 mr-3" />
                <div>
                  <div className="flex items-center">
                    <span className="text-indigo-900 dark:text-indigo-400 text-2xl font-bold italic">
                      n
                    </span>
                    <span className="text-indigo-900 dark:text-indigo-400 text-2xl font-bold">
                      {" "}
                      Quests
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    have been slayed today!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
