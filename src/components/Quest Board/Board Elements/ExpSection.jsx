import React, { memo } from "react";
import ExpLogo from "../../../assets/icons/ExpLogo.svg";

const ExpSection = memo(({ xp }) => (
    <div className="inline-flex items-center" style={{ fontFamily: "Typold" }}>
        <img className="w-6 h-6 mr-2" src={ExpLogo} alt="EXP Logo" />
        <div className="text-2xl font-bold" style={{ color: "#909090", fontFamily: "Typold" }}>
            {xp.toString().padStart(3, "0")} EXP
        </div>
    </div>
));

export default ExpSection;