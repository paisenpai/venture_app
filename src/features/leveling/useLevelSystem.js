import { useState, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { xpRequiredForNextLevel } from '../../utils/xpCalculator';

// File: /e:/CODE/Venture Web App/venture/src/features/levels/useLevelSystem.js

export function useLevelSystem(initialXP = 0) {
    const { user, updateUser } = useContext(UserContext); // Access UserContext

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
        return xpRequiredForNextLevel(currentXP, levelThresholds[currentLevel]);
    };

    const [xp, setXP] = useState(initialXP);
    const [level, setLevel] = useState(calculateLevelFromXP(initialXP));

    const addXP = (amount) => {
        if (amount < 0) {
            throw new Error("XP amount cannot be negative");
        }
        const newXP = xp + amount;
        setXP(newXP);
        const newLevel = calculateLevelFromXP(newXP);
        setLevel(newLevel);

        // Optionally update user data in UserContext
        updateUser({ ...user, xp: newXP, level: newLevel });
    };

    return {
        xp,
        level,
        xpForNextLevel: getXPForNextLevel(xp),
        addXP,
    };
}
