import React from 'react';
import PropTypes from 'prop-types';
import './StreaksCounter.css'; // Optional: Add styles for the counter

const StreaksCounter = ({ streakCount }) => {
    return (
        <div className="streaks-counter">
            <h2>🔥 Streak Counter</h2>
            <p>You are on a {streakCount}-day streak!</p>
        </div>
    );
};

StreaksCounter.propTypes = {
    streakCount: PropTypes.number.isRequired,
};

export default StreaksCounter;