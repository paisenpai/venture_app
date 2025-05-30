import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import PageHeader from "../components/ui/PageHeader";
import SettingsMenu from "../components/quest/settings/SettingsMenu";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  // Determine if dark mode is active
  const darkMode = theme === "dark";

  return (
    <div className="w-full px-4 py-4">
      <PageHeader title="Settings" variant="standard" size="large">
        <SettingsMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          darkMode={darkMode}
          setDarkMode={toggleTheme}
        />
      </PageHeader>

      <div className="mt-8 max-w-3xl mx-auto">
        {/* Settings cards */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-xl font-semibold mb-6 text-indigo-800 dark:text-indigo-300">
            Appearance
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
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

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-200">
                  Font Size
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Adjust text size throughout the app
                </p>
              </div>
              <select className="form-select rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow mb-6">
          <h2 className="text-xl font-semibold mb-6 text-indigo-800 dark:text-indigo-300">
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-200">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates about quests and achievements
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none bg-indigo-600`}
                role="switch"
                aria-checked="true"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-200">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email updates about your progress
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none bg-gray-200`}
                role="switch"
                aria-checked="false"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6 text-indigo-800 dark:text-indigo-300">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <label className="block font-medium text-gray-900 dark:text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder="your@email.com"
              />
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <label className="block font-medium text-gray-900 dark:text-gray-200 mb-2">
                Password
              </label>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Change Password
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
