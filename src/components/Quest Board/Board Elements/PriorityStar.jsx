import React, { memo } from "react";

const PriorityStar = memo(() => (
    <div className="relative w-[68px] h-9 flex items-center justify-center z-10" style={{ fontFamily: "Typold" }}>
        <div className="absolute inset-0 bg-[#FFD744] rounded-lg" />
        <div className="absolute left-1/2 top-1/2 flex items-center justify-center" style={{ transform: "translate(-50%, -50%)" }}>
            <svg width="16" height="16" fill="#FFF" viewBox="0 0 20 20" aria-hidden="true">
                <polygon points="10,2 12.09,7.36 18,7.64 13.5,11.47 15.18,17.02 10,13.77 4.82,17.02 6.5,11.47 2,7.64 7.91,7.36" />
            </svg>
        </div>
    </div>
));

export default PriorityStar;