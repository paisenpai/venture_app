export const questTypeVariants = {
    Adventure: "bg-blue-300 text-blue-900",
    Puzzle: "bg-green-300 text-green-900",
    Battle: "bg-yellow-200 text-yellow-700",
    Study: "bg-blue-300 text-blue-900",
    Fitness: "bg-green-300 text-green-900",
    Work: "bg-yellow-200 text-yellow-700",
    Hobby: "bg-pink-200 text-pink-700",
    Other: "bg-gray-200 text-gray-700",
};

export function getDaysLeftVariant(type) {
    return questTypeVariants[type] || questTypeVariants.Other;
}

export const daysLeftBgColors = {
    blue: "#163A8D",
    purple: "#1F168D",
    red: "#8D1616",
    yellow: "#CAA004",
};