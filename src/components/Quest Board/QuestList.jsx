import React, { useState } from "react";

// Helper SVGs for dropdown arrows and plus icon
const DropdownOpenIcon = () => (
    <div className="w-7 h-4 relative flex-shrink-0">
        <div className="w-6 h-0 left-[17.71px] top-0 absolute origin-top-left rotate-[134.56deg] bg-neutral-400 rounded-lg" />
        <div className="w-6 h-0 left-[9.29px] top-[0.02px] absolute origin-top-left rotate-[45.44deg] bg-neutral-400 rounded-lg" />
    </div>
);

const DropdownClosedIcon = () => (
    <div className="w-0 h-4 relative origin-top-left -rotate-90 flex-shrink-0">
        <div className="w-0 h-6 left-[17.98px] top-[27px] absolute origin-top-left rotate-[134.56deg] bg-neutral-400 rounded-lg" />
        <div className="w-0 h-6 left-[18px] top-0 absolute origin-top-left rotate-[45.44deg] bg-neutral-400 rounded-lg" />
    </div>
);

const PlusIcon = () => (
    <>
        <div className="w-1.5 h-8 bg-neutral-400 rounded-[5px]" />
        <div className="w-1.5 h-8 origin-top-left rotate-90 bg-neutral-400 rounded-[5px]" />
    </>
);

// Quest List Item
function QuestListItem({
    quest,
    onToggleDropdown,
    dropdownOpen,
    hasDropdown,
    isSubtask,
}) {
    // Render for subtask with dropdown
    if (isSubtask && hasDropdown) { 
        return (
            <div className="w-[1016.33px] h-16 px-6 py-4 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-7">
                <div onClick={onToggleDropdown} className="cursor-pointer">
                    {dropdownOpen ? <DropdownOpenIcon /> : <DropdownClosedIcon />}
                </div>
                <div className="flex justify-center items-center gap-2.5 flex-wrap content-center">
                    <div className="w-7 h-7 bg-neutral-400 rounded-full" />
                </div>
                <div className="w-36 inline-flex flex-col justify-start items-start gap-1">
                    <div className="h-4 inline-flex justify-center items-center gap-2.5">
                        <div className="justify-center text-neutral-400 text-xl font-bold font-['Typold']">
                            {quest.name}
                        </div>
                    </div>
                    <div className="self-stretch h-3 inline-flex justify-start items-center gap-3">
                        <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                            {quest.category}
                        </div>
                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                        <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                            {quest.goal}
                        </div>
                    </div>
                </div>
                <div className="w-60 h-8 relative">
                    <div className="w-10 h-8 left-0 top-0 absolute inline-flex justify-center items-center gap-1 flex-wrap content-center">
                        <div className="justify-center text-neutral-400 text-2xl font-bold font-['Typold']">
                            {quest.progress || "0%"}
                        </div>
                    </div>
                    <div
                        data-none="false"
                        data-state="Default"
                        className="w-48 h-2 px-0.5 py-px left-[46px] top-[12.50px] absolute bg-neutral-400/75 rounded-[20px] inline-flex justify-center items-center gap-2.5 flex-wrap content-center"
                    />
                </div>
                <div
                    data-state="Available"
                    className="h-9 p-2.5 bg-red-200 rounded-lg flex justify-center items-center gap-1"
                >
                    <div className="text-center justify-center text-pink-800 text-xl font-bold font-['Typold']">
                        {quest.status || "Pending"}
                    </div>
                    <div className="w-5 h-3 relative">
                        <div className="w-2 h-2 left-[12.02px] top-[5.66px] absolute origin-top-left rotate-[135deg] bg-pink-800 rounded-lg" />
                        <div className="w-2 h-2 left-[11.96px] top-[0.01px] absolute origin-top-left rotate-45 bg-pink-800 rounded-lg" />
                    </div>
                </div>
                <div className="w-16 h-9 relative">
                    <div className="w-16 h-9 p-2 left-0 top-0 absolute bg-yellow-300 rounded-lg" />
                    <div className="w-4 h-4 left-[26px] top-[10px] absolute inline-flex justify-center items-center" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <img className="w-6 h-6" src={quest.icon || "https://placehold.co/23x23"} alt="" />
                    </div>
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <div className="text-center justify-center text-neutral-400 text-2xl font-bold font-['Typold']">
                            {quest.xp || "000 XP"}
                        </div>
                    </div>
                </div>
                <div className="w-1 flex justify-center items-center gap-1 flex-wrap content-center">
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                </div>
            </div>
        );
    }

    // Render for subtask without dropdown
    if (isSubtask && !hasDropdown) {
        return (
            <div className="w-[1016.33px] h-16 px-6 py-4 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-9">
                <div className="w-36 inline-flex flex-col justify-start items-start gap-1">
                    <div className="h-4 inline-flex justify-center items-center gap-2.5">
                        <div className="justify-center text-neutral-400 text-xl font-bold font-['Typold']">
                            {quest.name}
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-9">
                    <div
                        data-days-left=">15 Days"
                        className="px-2 py-0.5 bg-slate-300 rounded-2xl flex justify-center items-center"
                    >
                        <div className="justify-center">
                            <span className="text-blue-900 text-base font-bold font-['Typold']">
                                {quest.daysLeft || "n "}
                            </span>
                            <span className="text-blue-900 text-base font-bold font-['Typold']">
                                Day(s) Left
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                            {quest.date || "00/00/00"}
                        </div>
                    </div>
                </div>
                <div
                    data-state="Available"
                    className="h-9 p-2.5 bg-red-200 rounded-lg flex justify-center items-center gap-1"
                >
                    <div className="text-center justify-center text-pink-800 text-xl font-bold font-['Typold']">
                        {quest.status || "Pending"}
                    </div>
                    <div className="w-5 h-3 relative">
                        <div className="w-2 h-2 left-[12.02px] top-[5.66px] absolute origin-top-left rotate-[135deg] bg-pink-800 rounded-lg" />
                        <div className="w-2 h-2 left-[11.96px] top-[0.01px] absolute origin-top-left rotate-45 bg-pink-800 rounded-lg" />
                    </div>
                </div>
                <div className="w-16 h-9 relative">
                    <div className="w-16 h-9 p-2 left-0 top-0 absolute bg-yellow-300 rounded-lg" />
                    <div className="w-4 h-4 left-[26px] top-[10px] absolute inline-flex justify-center items-center" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <img className="w-6 h-6" src={quest.icon || "https://placehold.co/23x23"} alt="" />
                    </div>
                    <div className="flex justify-center items-center flex-wrap content-center">
                        <div className="text-center justify-center text-neutral-400 text-2xl font-bold font-['Typold']">
                            {quest.xp || "000 XP"}
                        </div>
                    </div>
                </div>
                <div className="w-1 flex justify-center items-center gap-1 flex-wrap content-center">
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                    <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                </div>
            </div>
        );
    }

    // Render for default quest
    return (
        <div className="w-[1016.33px] h-16 px-6 py-4 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-9">
            <div className="flex justify-center items-center gap-2.5 flex-wrap content-center">
                <div className="w-7 h-7 bg-neutral-400 rounded-full" />
            </div>
            <div className="w-36 inline-flex flex-col justify-start items-start gap-1">
                <div className="h-4 inline-flex justify-center items-center gap-2.5">
                    <div className="justify-center text-neutral-400 text-xl font-bold font-['Typold']">
                        {quest.name}
                    </div>
                </div>
                <div className="self-stretch h-3 inline-flex justify-start items-center gap-3">
                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                        {quest.category}
                    </div>
                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                        {quest.goal}
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-center gap-9">
                <div
                    data-days-left=">15 Days"
                    className="px-2 py-0.5 bg-slate-300 rounded-2xl flex justify-center items-center"
                >
                    <div className="justify-center">
                        <span className="text-blue-900 text-base font-bold font-['Typold']">
                            {quest.daysLeft || "n "}
                        </span>
                        <span className="text-blue-900 text-base font-bold font-['Typold']">
                            Day(s) Left
                        </span>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-wrap content-center">
                    <div className="justify-center text-neutral-400 text-base font-normal font-['Typold']">
                        {quest.date || "00/00/00"}
                    </div>
                </div>
            </div>
            <div
                data-state="Available"
                className="h-9 p-2.5 bg-red-200 rounded-lg flex justify-center items-center gap-1"
            >
                <div className="text-center justify-center text-pink-800 text-xl font-bold font-['Typold']">
                    {quest.status || "Pending"}
                </div>
                <div className="w-5 h-3 relative">
                    <div className="w-2 h-2 left-[12.02px] top-[5.66px] absolute origin-top-left rotate-[135deg] bg-pink-800 rounded-lg" />
                    <div className="w-2 h-2 left-[11.96px] top-[0.01px] absolute origin-top-left rotate-45 bg-pink-800 rounded-lg" />
                </div>
            </div>
            <div className="w-16 h-9 relative">
                <div className="w-16 h-9 p-2 left-0 top-0 absolute bg-yellow-300 rounded-lg" />
                <div className="w-4 h-4 left-[26px] top-[10px] absolute inline-flex justify-center items-center" />
            </div>
            <div className="flex justify-start items-center gap-2">
                <div className="flex justify-center items-center flex-wrap content-center">
                    <img className="w-6 h-6" src={quest.icon || "https://placehold.co/23x23"} alt="" />
                </div>
                <div className="flex justify-center items-center flex-wrap content-center">
                    <div className="text-center justify-center text-neutral-400 text-2xl font-bold font-['Typold']">
                        {quest.xp || "000 XP"}
                    </div>
                </div>
            </div>
            <div className="w-1 flex justify-center items-center gap-1 flex-wrap content-center">
                <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
                <div className="flex-1 h-1 bg-neutral-400 rounded-full" />
            </div>
        </div>
    );
}

// Add Quest Button
function AddQuestButton({ onClick }) {
    return (
        <div
            className="w-[1016.33px] h-16 px-6 py-4 bg-white rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-2px] outline-neutral-400 blur-[0.75px] inline-flex justify-center items-center gap-9 cursor-pointer"
            onClick={onClick}
            title="Add Quest"
        >
            <PlusIcon />
        </div>
    );
}

// Main QuestList component
export default function QuestList() {
    // Example data
    const [quests, setQuests] = useState([
        {
            id: 1,
            name: "Task Name",
            category: "Category",
            goal: "Goal",
            daysLeft: "15",
            date: "24/06/24",
            status: "Pending",
            icon: "https://placehold.co/23x23",
            xp: "100 XP",
            hasDropdown: true,
            isSubtask: false,
            subtasks: [
                {
                    id: 11,
                    name: "Subtask 1",
                    isSubtask: true,
                    hasDropdown: false,
                    daysLeft: "10",
                    date: "24/06/24",
                    status: "Pending",
                    icon: "https://placehold.co/23x23",
                    xp: "20 XP",
                },
            ],
        },
        {
            id: 2,
            name: "Another Task",
            category: "Category",
            goal: "Goal",
            daysLeft: "7",
            date: "25/06/24",
            status: "Pending",
            icon: "https://placehold.co/23x23",
            xp: "200 XP",
            hasDropdown: false,
            isSubtask: false,
        },
    ]);

    // Track which dropdowns are open
    const [openDropdowns, setOpenDropdowns] = useState({});

    // Toggle dropdown for a quest
    const handleToggleDropdown = (id) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Add quest handler (dummy)
    const handleAddQuest = () => {
        alert("Add Quest Clicked!");
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Render quests */}
            {quests.map((quest) => (
                <React.Fragment key={quest.id}>
                    <QuestListItem
                        quest={quest}
                        onToggleDropdown={() => handleToggleDropdown(quest.id)}
                        dropdownOpen={!!openDropdowns[quest.id]}
                        hasDropdown={quest.hasDropdown}
                        isSubtask={quest.isSubtask}
                    />
                    {/* Render subtasks if dropdown is open */}
                    {quest.hasDropdown &&
                        openDropdowns[quest.id] &&
                        quest.subtasks &&
                        quest.subtasks.map((subtask) => (
                            <div key={subtask.id} className="ml-12">
                                <QuestListItem
                                    quest={subtask}
                                    isSubtask={true}
                                    hasDropdown={false}
                                />
                            </div>
                        ))}
                </React.Fragment>
            ))}
            {/* Add Quest Button */}
            <AddQuestButton onClick={handleAddQuest} />
        </div>
    );
}