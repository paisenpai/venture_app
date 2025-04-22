// badgeUtils.js

/**
 * Helper logic for badge rules and metadata
 */

// Badge rules configuration
const badgeRules = {
    newUser: {
        description: "Awarded to new users who sign up.",
        criteria: (user) => user.accountAge < 7, // Account age in days
    },
    activeUser: {
        description: "Awarded to users who log in daily for a week.",
        criteria: (user) => user.consecutiveLogins >= 7,
    },
    contributor: {
        description: "Awarded to users who contribute content.",
        criteria: (user) => user.contributions >= 10,
    },
    topPerformer: {
        description: "Awarded to users with the highest score in a month.",
        criteria: (user, leaderboard) =>
            leaderboard[0]?.userId === user.id && leaderboard[0]?.score > 0,
    },
};

/**
 * Get metadata for a specific badge
 * @param {string} badgeName - The name of the badge
 * @returns {object|null} - Metadata for the badge or null if not found
 */
function getBadgeMetadata(badgeName) {
    return badgeRules[badgeName] || null;
}

/**
 * Check if a user qualifies for a specific badge
 * @param {string} badgeName - The name of the badge
 * @param {object} user - The user object
 * @param {array} [leaderboard] - Optional leaderboard data for specific badges
 * @returns {boolean} - True if the user qualifies, false otherwise
 */
function qualifiesForBadge(badgeName, user, leaderboard = []) {
    const badge = badgeRules[badgeName];
    if (!badge) return false;
    return badge.criteria(user, leaderboard);
}

/**
 * Get all badges a user qualifies for
 * @param {object} user - The user object
 * @param {array} [leaderboard] - Optional leaderboard data for specific badges
 * @returns {array} - List of badge names the user qualifies for
 */
function getQualifiedBadges(user, leaderboard = []) {
    return Object.keys(badgeRules).filter((badgeName) =>
        qualifiesForBadge(badgeName, user, leaderboard)
    );
}

module.exports = {
    getBadgeMetadata,
    qualifiesForBadge,
    getQualifiedBadges,
};