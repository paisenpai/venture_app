import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { useTheme } from "../contexts/ThemeContext";
import AchievementCard from "../components/character/AchievementCard";
import { characterData } from "../utils/achievements/characterData";

// Avatar component with placeholder image
const AvatarPlaceholder = () => {
  return (
    <div className="w-25 h-25 rounded-full overflow-hidden border-2 border-pink-300">
      <img
        src="https://placehold.co/198x198"
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const Character = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="w-full pl-[5%] pr-0">
      <PageHeader
        title="Character"
        variant="standard"
        size="large"
        className="mb-2 pb-1 border-b border-gray-200 dark:border-gray-700"
      />

      {/* Character Profile Section */}
      <div className="mb-8 pb-3">
        <div className="flex items-start gap-4">
          <AvatarPlaceholder />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">
              {characterData.username}
            </h2>

            {/* Stats with reduced gap between labels and values */}
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center">
                <span className="text-grey-700 dark:text-grey-400 text-lg w-20">
                  Total XP
                </span>
                <span className="text-indigo-900 dark:text-indigo-300 text-lg font-bold">
                  {characterData.totalXP}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-grey-700 dark:text-grey-400 text-lg w-20">
                  Level
                </span>
                <span className="text-indigo-900 dark:text-indigo-300 text-lg font-bold">
                  {characterData.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mr-4">
            Achievements
          </h3>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {characterData.achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Character;
