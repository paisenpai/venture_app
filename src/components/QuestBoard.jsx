// Helper component for Days Left badge by level
const DaysLeftBadge = ({ level = 1, days = "n" }) => {
    const levels = [
        { bg: "bg-slate-300", text: "text-blue-900" },
        { bg: "bg-violet-300", text: "text-indigo-900" },
        { bg: "bg-amber-200", text: "text-yellow-600" },
        { bg: "bg-red-200", text: "text-red-800" },
    ];
    const { bg, text } = levels[(level - 1) % levels.length];
    return (
        <div className={`px-2 py-0.5 ${bg} rounded-2xl inline-flex items-center`}>
            <span className={`${text} text-base font-bold font-['Typold']`}>{days} </span>
            <span className={`${text} text-base font-bold font-['Typold']`}>Day(s) Left</span>
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
    // ADD BOARD VIEW (updated to match provided slate)
    if (type === "add") {
        return (
            <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-4 outline-offset-[-4px] outline-neutral-400 blur-[1.55px] inline-flex justify-center items-center gap-12 flex-wrap content-center">
                <div className="w-3 h-14 bg-neutral-400 rounded-[5px]" />
                <div className="w-3 h-14 origin-top-left rotate-90 bg-neutral-400 rounded-[5px]" />
            </div>
        );
    }

    // SUBTASK BOARD VIEW
    if (type === "subtask") {
        return (
            <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-md flex flex-col justify-between items-center gap-4">
                <div className="flex w-full justify-between items-start">
                    <div className="flex items-center gap-3">
                        <img className="w-7 h-7 rounded-full" src={avatarUrl} alt="Avatar" />
                        <div>
                            <div className="text-neutral-400 text-xl font-bold font-['Typold']">{taskName}</div>
                            <div className="flex items-center gap-2 text-neutral-400 text-base font-normal font-['Typold']">
                                <span>{category}</span>
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full inline-block" />
                                <span>{goal}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                        <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                    </div>
                </div>
                <div className="w-full flex items-center gap-4">
                    <div className="text-neutral-400 text-2xl font-bold font-['Typold']">{progress}%</div>
                    <div className="flex-1 h-2 bg-neutral-400/75 rounded-[20px] overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 rounded-[20px]"
                            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src={avatarUrl} alt="XP" />
                    <span className="text-neutral-400 text-2xl font-bold font-['Typold']">{xp} XP</span>
                </div>
            </div>
        );
    }

    // DEFAULT BOARD VIEW
    return (
        <div className="w-80 h-52 px-10 py-8 bg-white rounded-xl shadow-md flex flex-col justify-between items-center gap-4">
            <div className="flex w-full justify-between items-start">
                <div className="flex items-center gap-3">
                    <img className="w-7 h-7 rounded-full" src={avatarUrl} alt="Avatar" />
                    <div>
                        <div className="text-neutral-400 text-xl font-bold font-['Typold']">{taskName}</div>
                        <div className="flex items-center gap-2 text-neutral-400 text-base font-normal font-['Typold']">
                            <span>{category}</span>
                            <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full inline-block" />
                            <span>{goal}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full w-2" />
                </div>
            </div>
            <div className="flex w-full justify-between items-center">
                <DaysLeftBadge level={level} days={daysLeft} />
                <span className="text-neutral-400 text-base font-normal font-['Typold']">{dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
                <img className="w-6 h-6" src={avatarUrl} alt="XP" />
                <span className="text-neutral-400 text-2xl font-bold font-['Typold']">{xp} XP</span>
            </div>
        </div>
    );
};

export default QuestBoard;