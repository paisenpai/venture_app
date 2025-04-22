import React from 'react';
import useStreakTracker from '../features/streaks/useStreakTracker';

const StreakDisplay = () => {
    const { streakCount, lastUpdated } = useStreakTracker();

    return (
        <div className="streak-display">
            <h2>Current Streak</h2>
            <p>Days: {streakCount}</p>
            <p>Last Updated: {new Date(lastUpdated).toLocaleDateString()}</p>
        </div>
    );
};

export default StreakDisplay;
