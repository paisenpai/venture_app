import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Determine if dark mode is active
  const darkMode = theme === "dark";

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full px-4 py-4 md:px-6 lg:px-8">
      <PageHeader title="Settings" variant="standard" size="large">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-3 py-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm font-medium"
          >
            Options
          </button>
          <SettingsMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            darkMode={darkMode}
            setDarkMode={toggleTheme}
          />
        </div>
      </PageHeader>

      <div className="mt-6 max-w-4xl mx-auto">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">
              Appearance
            </h2>
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
              Visual Settings
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-200">
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  darkMode ? "bg-indigo-600" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={darkMode}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-200">
                  Font Size
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Adjust text size throughout the app
                </p>
              </div>
              <select className="py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">
              Account Settings
            </h2>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              Profile
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <label className="block font-medium text-gray-900 dark:text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <label className="block font-medium text-gray-900 dark:text-gray-200 mb-2">
                Password
              </label>
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm">
                Change Password
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Logout Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Account Action
            </h2>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
              Security
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/20">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-200">
                  Sign Out
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Log out of your account. You will need to sign in again to
                  access your quests and progress.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">
              Data & Privacy
            </h2>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              Protection
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <h3 className="font-medium text-gray-900 dark:text-gray-200">
                Data Export
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Download all your personal data and quest history.
              </p>
              <button className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Export Data
              </button>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/80">
              <h3 className="font-medium text-gray-900 dark:text-gray-200">
                Privacy Settings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Manage how your information is used and shared.
              </p>
              <button className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Privacy Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
