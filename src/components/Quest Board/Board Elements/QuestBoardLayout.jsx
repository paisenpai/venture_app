import React, { memo } from "react";
import ExpSection from "./ExpSection";
import PriorityStar from "./PriorityStar";

const QuestBoardLayout = memo(({
    children,
    priority,
    xp,
    showPriorityBox = false,
    ...props
}) => (
    <div
        className="w-80 h-52 bg-white rounded-xl shadow-md flex flex-col justify-center gap-4 px-10 py-8"
        style={{ fontFamily: "Typold" }}
        {...props}
    >
        <div className="flex flex-col justify-center h-full w-full gap-4" style={{ fontFamily: "Typold" }}>
            {children}
        </div>
        <div className="flex items-center w-full mt-auto" style={{ fontFamily: "Typold" }}>
            {showPriorityBox ? (
                <div className="flex items-center bg-neutral-200 rounded-lg px-3 py-1" style={{ fontFamily: "Typold" }}>
                    {priority && <PriorityStar />}
                </div>
            ) : (
                priority && <PriorityStar />
            )}
            <div className="flex-1" />
            <div className="flex items-center" style={{ marginLeft: 52, fontFamily: "Typold" }}>
                <ExpSection xp={xp} />
            </div>
        </div>
    </div>
));

export default QuestBoardLayout;