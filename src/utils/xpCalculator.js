// xpCalculator.js

/**
 * Calculates the XP required to reach the next level.
 * @param {number} currentLevel - The current level of the user.
 * @returns {number} - The XP required for the next level.
 */
export function calculateXpForNextLevel(currentLevel) {
    if (currentLevel < 1) {
        throw new Error("Level must be 1 or higher.")
    }
    return Math.floor(100 * Math.pow(1.5, currentLevel - 1)); // XP increases exponentially
}

/**
 * Calculates the total XP required to reach a specific level.
 * @param {number} targetLevel - The target level.
 * @returns {number} - The total XP required to reach the target level.
 */
export function calculateTotalXp(targetLevel) {
    if (targetLevel < 1) {
        throw new Error("Level must be 1 or higher.");
    }

    let totalXp = 0;
    for (let level = 1; level < targetLevel; level++) {
        totalXp += calculateXpForNextLevel(level);
    }
    return totalXp;
}

/**
 * Determines the user's current level based on their total XP.
 * @param {number} totalXp - The user's total XP.
 * @returns {number} - The user's current level.
 */
export function getCurrentLevel(totalXp) {
    if (totalXp < 0) {
        throw new Error("Total XP cannot be negative.");
    }

    let level = 1;
    while (totalXp >= calculateXpForNextLevel(level)) {
        totalXp -= calculateXpForNextLevel(level);
        level++;
    }
    return level;
}

/**
 * Calculates the XP awarded for completing a task based on its difficulty.
 * @param {string} difficulty - The difficulty of the task ('easy', 'medium', 'hard').
 * @returns {number} - The XP awarded for the task.
 */
export function calculateXpPerTask(difficulty) {
    const difficultyMap = {
        easy: 50,
        medium: 100,
        hard: 200,
    };

    const xp = difficultyMap[difficulty.toLowerCase()];
    if (xp === undefined) {
        throw new Error("Invalid difficulty. Must be 'easy', 'medium', or 'hard'.");
    }

    return xp;
}

