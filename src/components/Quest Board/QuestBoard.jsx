import { useState } from "react";
import PropTypes from "prop-types";

// Import board elements
import QuestBoardLayout from "./Board Elements/QuestBoardLayout";
import DaysLeftBadge from "./Board Elements/DaysLeftBadge";
import LevelBadge from "./Board Elements/LevelBadge";
import SettingsButton from "./Board Elements/SettingsButton";
import PriorityStar from "./Board Elements/PriorityStar";
import CategoryCircle from "./Board Elements/CategoryCircle";
import Layer2 from "./Board Elements/Layer2";
import ExpSection from "./Board Elements/ExpSection";
// import ProgressBar from "./Board Elements/ProgressBar"; // Uncomment if you have a ProgressBar component

const QuestBoard = ({
    type = "default",
    level = 1,
    daysLeft = "n",
    name = "Task Name",
    category = "Other",
    goal = "Goal",
    dueDate = "00/00/00",
    xp = 0,
    progress = 0,
    avatarUrl = "https://placehold.co/23x23",
    onAdd,
    onClick,
    priority = false,
}) => {
    const [showForm, setShowForm] = useState(false);

    // --- ADD BOARD VIEW ---
    if (type === "add") {
        return (
            <>
                <div
                    className="w-80 h-52 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center cursor-pointer px-10 py-8 relative"
                    style={{ backgroundColor: "#FFF", fontFamily: "Typold" }}
                    onClick={() => setShowForm(true)}
                    aria-label="Add Quest"
                >
                    {/* Dashed SVG outline for add board */}
                    <svg
                        className="absolute inset-0 pointer-events-none"
                        width="100%" height="100%" viewBox="0 0 320 208"
                        style={{ borderRadius: "0.75rem" }}
                        aria-hidden="true"
                    >
                        <rect
                            x="6" y="6"
                            width="308" height="196"
                            rx="24" ry="24"
                            fill="none"
                            stroke="#ACACAC"
                            strokeWidth="6"
                            strokeDasharray="48 32"
                            strokeDashoffset="0"
                        />
                    </svg>
                    {/* Plus icon */}
                    <div className="w-14 h-14 relative flex items-center justify-center z-10" style={{ fontFamily: "Typold" }}>
                        {/* Vertical bar of plus */}
                        <div
                            className="absolute left-1/2 top-1/2"
                            style={{
                                width: "16%",
                                height: "90%",
                                backgroundColor: "#909090",
                                borderRadius: "999px",
                                transform: "translate(-50%, -50%)",
                                fontFamily: "Typold"
                            }}
                        />
                        {/* Horizontal bar of plus */}
                        <div
                            className="absolute left-1/2 top-1/2"
                            style={{
                                width: "90%",
                                height: "16%",
                                backgroundColor: "#909090",
                                borderRadius: "999px",
                                transform: "translate(-50%, -50%)",
                                fontFamily: "Typold"
                            }}
                        />
                    </div>
                </div>
                {/* Add Quest Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ fontFamily: "Typold" }}>
                        <div className="bg-white rounded-xl p-8 w-[350px] flex flex-col gap-4 shadow-lg" style={{ fontFamily: "Typold" }}>
                            <h2 className="text-xl font-bold mb-2" style={{ color: "#909090", fontFamily: "Typold" }}>Add Quest</h2>
                            {/* TODO: Add form fields here */}
                            <button
                                className="mt-4 px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
                                onClick={() => setShowForm(false)}
                                style={{ fontFamily: "Typold" }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // --- SUBTASK BOARD VIEW ---
    if (type === "subtask") {
        return (
            <QuestBoardLayout priority={priority} xp={xp}>
                <div className="flex items-center w-full gap-5" style={{ fontFamily: "Typold" }}>
                    <CategoryCircle category={category} />
                    <span className="ml-5 text-xl font-bold flex-1" style={{ color: "#909090", fontFamily: "Typold" }}>{name}</span>
                    <SettingsButton />
                </div>
                <Layer2 category={category} goal={goal} />
                <div className="flex items-center justify-center w-full gap-8" style={{ fontFamily: "Typold" }}>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2" style={{ fontFamily: "Typold" }}>
                        <span className="text-2xl font-bold" style={{ color: "#909090", fontFamily: "Typold" }}>{progress}%</span>
                        <div className="w-32 h-2 bg-neutral-200 rounded-[20px] overflow-hidden" style={{ fontFamily: "Typold" }}>
                            <div
                                className="h-full bg-yellow-400 rounded-[20px]"
                                style={{ width: `${Math.max(0, Math.min(progress, 100))}%`, fontFamily: "Typold" }}
                            />
                        </div>
                    </div>
                </div>
            </QuestBoardLayout>
        );
    }

    // --- DEFAULT BOARD VIEW ---
    return (
        <QuestBoardLayout priority={priority} xp={xp} showPriorityBox>
            <div className="flex items-center w-full gap-5" style={{ fontFamily: "Typold" }}>
                <CategoryCircle category={category} />
                <span className="ml-5 text-xl font-bold flex-1" style={{ color: "#909090", fontFamily: "Typold" }}>{name}</span>
                <SettingsButton />
            </div>
            <Layer2 category={category} goal={goal} />
            <div className="flex items-center justify-center w-full gap-8" style={{ fontFamily: "Typold" }}>
                <DaysLeftBadge days={daysLeft} />
                <span className="bg-neutral-200 rounded-lg px-3 py-1 text-base font-bold" style={{ color: "#909090", fontFamily: "Typold" }}>{dueDate}</span>
            </div>
        </QuestBoardLayout>
    );
};

QuestBoard.propTypes = {
    type: PropTypes.oneOf(["default", "add", "subtask"]),
    level: PropTypes.number,
    daysLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    goal: PropTypes.string,
    dueDate: PropTypes.string,
    xp: PropTypes.number,
    progress: PropTypes.number,
    avatarUrl: PropTypes.string,
    onAdd: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.bool,
};

export default QuestBoard;