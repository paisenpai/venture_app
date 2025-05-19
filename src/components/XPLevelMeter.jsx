// Xp Level Meter Component "Not Done Yet"
// This component displays the user's XP level and progress towards the next level.
// It uses the UserContext to get the user's XP and calculates the level based on a simple formula.
// The level is displayed along with a progress bar indicating the user's progress towards the next level.


import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const XPLevelMeter = () => {
    const { user } = useContext(UserContext);

    const calculateLevel = (xp) => {
        const level = Math.floor(xp / 1000); // Example: 1000 XP per level
        const progress = (xp % 1000) / 1000; // Progress within the current level
        return { level, progress };
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const { level, progress } = calculateLevel(user.xp);

    return (
        <div className="xp-level-meter">
            <div className="level-info">
                <span>Level: {level}</span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${progress * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default XPLevelMeter;
