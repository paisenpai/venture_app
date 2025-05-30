import React, { useState } from "react";
import useLevelSystem from "../features/leveling/useLevelSystem";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";
import { useTheme } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  // For demonstration, you can set a default XP value here
  const { level, xp, xpForNextLevel, addXP } = useLevelSystem(0);

  return (
    <div className="w-full px-4 py-4">
      <PageHeader title="Dashboard" variant="standard" size="large">
        <SettingsMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          darkMode={theme === "dark"}
          setDarkMode={toggleTheme}
        />
      </PageHeader>

      <div className="flex gap-5 mt-5">
        <div className="flex-1 p-5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold dark:text-white">Summary</h2>
          <p className="dark:text-gray-300">Total Users: 120</p>
          <p className="dark:text-gray-300">Total Sales: $15,000</p>
          <p className="dark:text-gray-300">Active Sessions: 45</p>
        </div>
        <div className="flex-1 p-5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold dark:text-white">Stats</h2>
          <p className="dark:text-gray-300">Daily Visitors: 1,200</p>
          <p className="dark:text-gray-300">Monthly Revenue: $45,000</p>
          <p className="dark:text-gray-300">Conversion Rate: 5%</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold dark:text-white">User Progress</h2>
        <div className="flex gap-5 mt-5">
          <div className="flex-1 p-5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-medium dark:text-white">Level</h3>
            <p className="dark:text-gray-300">Level: {level}</p>
            <p className="dark:text-gray-300">XP: {xp}</p>
            <p className="dark:text-gray-300">
              XP for next level: {xpForNextLevel ?? "Max level reached"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
