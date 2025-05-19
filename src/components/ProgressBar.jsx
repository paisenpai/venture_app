/**
 * "NOT DONE YET"
 * Shows task, XP, or level progress.
 *
 * This function is responsible for displaying the progress of a task,
 * experience points (XP), or the current level in a user interface.
 * It provides a visual representation of the progress made.
 */

import React from 'react';
import PropTypes from 'prop-types';
function ProgressBar({ value, maxValue }) {
    const percentage = (value / maxValue) * 100;

    return (
        <div className="progress-container w-full bg-gray-200 rounded h-2">
            <div
                className="progress-fill bg-blue-500 h-2 rounded"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}

ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
    value: 0,
    maxValue: 100,
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
