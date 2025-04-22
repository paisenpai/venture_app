// xpCalculator.js

/**
 * Calculates the XP required to reach the next level.
 * @param {number} currentLevel - The current level of the user.
 * @returns {number} - The XP required for the next level.
 */
export function calculateXpForNextLevel(currentLevel) {
    if (currentLevel < 1) {
        throw new Error("Level must be 1 or higher.");
    }
    // Example formula: XP required increases exponentially with level
    return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
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