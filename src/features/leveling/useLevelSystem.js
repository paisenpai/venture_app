import { useState } from "react";

const useLevelSystem = (initialXP = 0) => {
    const levelThresholds = [0, 100, 300, 600, 1000]; // Example thresholds for levels

    const calculateLevelFromXP = (xp) => {
        if (xp < 0) {
            throw new Error("XP cannot be negative");
        }

        let level = 0;
        for (let i = 0; i < levelThresholds.length; i++) {
            if (xp >= levelThresholds[i]) {
                level = i + 1;
            } else {
                break;
            }
        }
        return level;
    };

    const getXPForNextLevel = (currentXP) => {
        const currentLevel = calculateLevelFromXP(currentXP);
        if (currentLevel >= levelThresholds.length) {
            return null; // Max level reached
        }
        // Return the XP required for the next level threshold
        return levelThresholds[currentLevel] - currentXP;
    };

    const [xp, setXP] = useState(initialXP);
    const [level, setLevel] = useState(calculateLevelFromXP(initialXP));

    const addXP = (amount) => {
        if (amount < 0) {
            throw new Error("XP amount cannot be negative");
        }
        setXP(prevXP => {
            const newXP = prevXP + amount;
            setLevel(calculateLevelFromXP(newXP));
            return newXP;
        });
    };

    return {
        xp,
        level,
        xpForNextLevel: getXPForNextLevel(xp),
        addXP,
    };
};

export default useLevelSystem;
