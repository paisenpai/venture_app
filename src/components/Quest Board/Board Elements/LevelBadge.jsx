import React, { memo } from "react";

const LevelBadge = memo(({ level = 1 }) => (
    <div className="w-7 h-7 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-lg shadow" style={{ color: "#909090", fontFamily: "Typold" }}>
        {level}
    </div>
));

export default LevelBadge;