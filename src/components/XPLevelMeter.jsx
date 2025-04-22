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
