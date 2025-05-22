import React, { memo } from "react";

const Layer2 = memo(({ category, goal }) => (
    <div className="flex items-center justify-center w-full gap-3" style={{ fontFamily: "Typold" }}>
        <span className="text-base font-semibold" style={{ color: "#909090", fontFamily: "Typold" }}>{category}</span>
        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full inline-block" />
        <span className="text-base" style={{ color: "#909090", fontFamily: "Typold" }}>{goal}</span>
    </div>
));

export default Layer2;