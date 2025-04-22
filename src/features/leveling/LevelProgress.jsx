import React from 'react';
import './LevelProgress.css'; // Create a CSS file for styling

const LevelProgress = ({ currentExp, maxExp, level }) => {
    const progressPercentage = (currentExp / maxExp) * 100;

    return (
        <div className="level-progress">
            <div className="level-info">
                <span>Level: {level}</span>
                <span>
                    {currentExp} / {maxExp} EXP
                </span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LevelProgress;