import React from "react";
import PropTypes from "prop-types";

// Star rating component
const StarRating = ({ rating, maxStars = 3 }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <span
          key={i}
          className={`text-xl ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ unlocked }) => {
  return (
    <div className="self-stretch h-1 px-0.5 py-px bg-neutral-400 rounded-[20px] flex">
      <div
        className={`h-full rounded-[20px] ${
          unlocked ? "bg-indigo-600 w-full" : "bg-gray-200 w-1/4"
        }`}
      />
    </div>
  );
};

const AchievementCard = ({ achievement }) => {
  const { name, stars, unlocked, icon } = achievement;

  return (
    <div className="w-52 h-60 px-7 bg-white dark:bg-gray-800 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-center items-center gap-4">
      {/* Icon and Title Section */}
      <div className="self-stretch flex flex-col justify-center items-center gap-1">
        <div className="w-14 h-14 relative flex items-center justify-center">
          <div className={`text-4xl ${!unlocked && "opacity-40"}`}>
            {unlocked ? icon : "❓"}
          </div>
        </div>
        <div className="self-stretch h-3.5 inline-flex justify-center items-center">
          <div className="w-40 h-3.5 text-center justify-center text-indigo-900 dark:text-indigo-300 text-base font-bold">
            {name}
          </div>
        </div>
      </div>

      {/* Rating and Progress Section */}
      <div className="self-stretch flex flex-col justify-center items-center gap-5">
        <div
          className={`inline-flex justify-center items-center ${
            !unlocked && "opacity-30"
          }`}
        >
          <StarRating rating={unlocked ? stars : 0} />
        </div>
        <ProgressBar unlocked={unlocked} />
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
