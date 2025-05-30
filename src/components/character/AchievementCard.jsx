import React from "react";
import PropTypes from "prop-types";

// Star rating component
const StarRating = ({ rating, maxStars = 3 }) => {
  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-400" : "text-gray-200"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const AchievementCard = ({ achievement }) => {
  const { name, stars, unlocked, icon } = achievement;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex flex-col items-center border border-gray-100 dark:border-gray-700">
      <div className="mb-1 text-xl">{unlocked ? icon : "❓"}</div>
      <div className="text-xs text-center text-gray-700 dark:text-gray-300 mb-1.5">
        {name}
      </div>
      <div className={`${!unlocked && "opacity-30"}`}>
        <StarRating rating={unlocked ? stars : 0} />
      </div>
    </div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    unlocked: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default AchievementCard;
