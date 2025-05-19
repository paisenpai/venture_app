import React from "react";

// Helper component for Days Left badge by level
const DaysLeftBadge = ({ level = 1, days = "n" }) => {
    const levels = [
        {
            bg: "bg-slate-300",
            text: "text-blue-900",
        },
        {
            bg: "bg-violet-300",
            text: "text-indigo-900",
        },
        {
            bg: "bg-amber-200",
            text: "text-yellow-600", 
        },
        {
            bg: "bg-red-200",
            text: "text-red-800",
        },
    ];
    const { bg, text } = levels[(level - 1) % levels.length];
    return (
        <div className={`px-2 py-0.5 ${bg} rounded-2xl inline-flex justify-center items-center`}>
            <div className="justify-center">
                <span className={`${text} text-base font-bold font-['Typold']`}>{days} </span>
                <span className={`${text} text-base font-bold font-['Typold']`}>Day(s) Left</span>
            </div>
        </div>
    );
};
 
// QuestBoard component with three variants: Add, Default, and SubTask
const QuestBoard = ({
    type = "default",
    level = 1,
    daysLeft = "n",
    taskName = "Task Name",
    category = "Category",
    goal = "Goal",
    dueDate = "00/00/00",
    xp = 0,
    progress = 0,
    avatarUrl = "https://placehold.co/23x23",
}) => {
    // -------------------- ADD BOARD VIEW --------------------
    if (type === "add") {
        return (
            <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-4 outline-offset-[-4px] outline-neutral-a400 blur-[1.55px] inline-flex justify-center items-center gap-12 flex-wrap content-center">
                <div className="w-3 h-14 bg-neutral-400 rounded-[5px]" />
                <div className="w-3 h-14 origin-top-left rotate-90 bg-neutral-400 rounded-[5px]" />
            </div>
        );
    }

    // -------------------- SUBTASK BOARD VIEW --------------------
    if (type === "subtask") {
        return (
            <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-12 flex-wrap content-center">
                <div className="w-60 inline-flex flex-col justify-center items-center gap-4">
                    <div className="self-stretch inline-flex justify-end items-start gap-12">
                        <div className="flex justify-start items-start gap-5 flex-wrap content-start">
                            <div className="flex justify-center items-center gap-2.5 flex-wrap content-center">
                                <img className="w-7 h-7 rounded-full" src={avatarUrl} alt="Avatar" />
                            </div>
                            <div className="w-36 inline-flex flex-col justify-start items-start gap-3">
                                <div className="h-4 inline-flex justify-center items-center gap-2.5">
                                    <div className="justify-center text-neutral-400 text-xl font-bold font-['Typold']">{taskName}</div>
                                </div>
                                <div className="self-stretch h-3 inline-flex justify-start items-center gap-3">
                                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">{category}</div>
                                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">{goal}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1 flex justify-center items-center gap-1 flex-wrap content-center">
                            <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                            <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                            <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                        </div>
                    </div>
                    <div className="self-stretch h-8 relative">
                        <div className="w-10 h-8 left-0 top-0 absolute inline-flex justify-center items-center gap-1 flex-wrap content-center">
                            <div className="justify-center text-neutral-400 text-2xl font-bold font-['Typold']">{progress}%</div>
                        </div>
                        <div className="w-48 h-2 px-0.5 py-px left-[46px] top-[12.50px] absolute bg-neutral-400/75 rounded-[20px] inline-flex justify-center items-center">
                            <div
                                className="h-1 rounded-[20px] bg-yellow-400"
                                style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-16 h-9 relative">
                    <div className="w-16 h-9 p-2 left-0 top-0 absolute bg-yellow-300 rounded-lg" />
                    <div className="w-4 h-4 left-[26px] top-[10px] absolute inline-flex justify-center items-center" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <img className="w-6 h-6" src={avatarUrl} alt="XP" />
                    </div>
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <div className="text-center justify-center text-neutral-400 text-2xl font-bold font-['Typold']">{xp} XP</div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------- DEFAULT BOARD VIEW --------------------
    return (
        <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-12 flex-wrap content-center">
            <div className="w-60 inline-flex flex-col justify-center items-center gap-4">
                <div className="self-stretch inline-flex justify-end items-start gap-12">
                    <div className="flex justify-start items-start gap-5 flex-wrap content-start">
                        <div className="flex justify-center items-center gap-2.5 flex-wrap content-center">
                            <img className="w-7 h-7 rounded-full" src={avatarUrl} alt="Avatar" />
                        </div>
                        <div className="w-36 inline-flex flex-col justify-start items-start gap-3">
                            <div className="h-4 inline-flex justify-center items-center gap-2.5">
                                <div className="justify-center text-neutral-400 text-xl font-bold font-['Typold']">{taskName}</div>
                            </div>
                            <div className="self-stretch h-3 inline-flex justify-start items-center gap-3">
                                <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">{category}</div>
                                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                                <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">{goal}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1 flex justify-center items-center gap-1 flex-wrap content-center">
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                    </div>
                </div>
            </div>
            {/* Days left and due date */}
            <div className="flex justify-start items-center gap-8">
                <DaysLeftBadge level={level} days={daysLeft} />
                <div className="flex justify-center items-center flex-wrap content-center">
                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">{dueDate}</div>
                </div>
            </div>
            <div className="w-16 h-9 relative">
                <div className="w-16 h-9 p-2 left-0 top-0 absolute bg-yellow-300 rounded-lg" />
                <div className="w-4 h-4 left-[26px] top-[10px] absolute inline-flex justify-center items-center" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <div className="flex justify-center items-center flex-wrap content-center">
                    <img className="w-6 h-6" src={avatarUrl} alt="XP" />
                </div>
                <div className="flex justify-center items-center flex-wrap content-center">
                    <div className="text-center justify-center text-neutral-400 text-2xl font-bold font-['Typold']">{xp} XP</div>
                </div>
            </div>
        </div>
    );
};

export default QuestBoard;