import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestBoard from "../components/quest/QuestBoard";
import useLevelSystem from "../features/leveling/useLevelSystem";
import SettingsMenu from "../components/quest/SettingsMenu"; // Import the SettingsMenu component
import { getThemeClass } from "../utils/themeUtils";
import { filterQuestsByStatus } from "../utils/QuestBoard/questFilters";
import useQuestHandlers from "../hooks/useQuestHandlers";
import SubtaskList from "../components/quest/SubtaskList";
import QuestCalendarView from "../components/quest/QuestCalendar";

const Quests = () => {
    const navigate = useNavigate();
    const { level, addXP } = useLevelSystem();
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [viewMode, setViewMode] = useState("board");
    const initialQuests = [
        {
            id: 1,
            name: "Quest 1",
            category: "Adventure",
            goal: "Complete all tasks",
            dueDate: "2025-05-31",
            xp: 100,
            daysLeft: 5,
            level: 1,
            progress: 60,
            status: "available",
            subtasks: [
                { id: 1, name: "Subtask 1", progress: 50 },
                { id: 2, name: "Subtask 2", progress: 0 },
            ],
        },
    ];

    const {
        quests,
        handleAddQuest,
        handleEditQuest,
        handleDeleteQuest,
        handleChangeStatus,
        handleAddSubtask,
        handleEditSubtask,
        handleDeleteSubtask,
    } = useQuestHandlers(initialQuests);

    // Separate quests by status using the utility function
    const availableQuests = filterQuestsByStatus(quests, "available");
    const ongoingQuests = filterQuestsByStatus(quests, "ongoing");
    const completedQuestsList = filterQuestsByStatus(quests, "completed");

    // Theme classes
    const themeClass = getThemeClass(darkMode);

    // Section Header Component
    const SectionHeader = ({ title, count, bgColor, textColor }) => (
        <div className="flex items-center gap-3 mb-6">
            {/* Circle with Counter */}
            <div
                className={`w-8 h-8 ${bgColor} rounded-full shadow-md flex justify-center items-center`}
                aria-label={`Section count: ${count}`}
            >
                <span className="text-white text-xl font-bold font-['Typold']">
                    {count}
                </span>
            </div>
            {/* Section Title */}
            <h2
                className={`text-3xl font-bold font-['Typold'] ${textColor}`}
                aria-label={`Section title: ${title}`}
            >
                {title}
            </h2>
            {/* Horizontal Line */}
            <div className="flex-1">
                <hr className="border-t border-gray-300" />
            </div>
        </div>
    );

    return (
        <div className={`flex h-screen ${themeClass}`}>
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    {viewMode === "board" && (
                        <div className="flex flex-col h-full min-h-0 px-10 pt-10 pb-10 gap-6">
                            {/* Board View Content */}
                            {/* 1st row: Title */}
                            <div className="flex flex-wrap justify-between items-center min-w-0 pb-4 relative">
                                <h1 className="truncate text-5xl font-extrabold font-['Typold'] max-w-full">
                                    Quest Board
                                </h1>
                                {/* Use the SettingsMenu component */}
                                <SettingsMenu
                                    showMenu={showMenu}
                                    setShowMenu={setShowMenu}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    viewMode={viewMode}
                                    setViewMode={setViewMode}
                                />
                            </div>

                            {/* Available Quests */}
                            <SectionHeader
                                title="Available"
                                count={availableQuests.length}
                                bgColor="bg-indigo-900"
                                textColor="text-indigo-900"
                            />
                            <div className="flex flex-row flex-wrap gap-4">
                                <QuestBoard type="add" onAddQuest={handleAddQuest} />
                                {availableQuests.map((quest) => (
                                    <div key={quest.id} className="flex flex-col">
                                        <QuestBoard
                                            {...quest}
                                            onDeleteQuest={() => handleDeleteQuest(quest.id)}
                                            onEditQuest={(updatedQuest) =>
                                                handleEditQuest(quest.id, updatedQuest)
                                            }
                                            onChangeStatus={(status) =>
                                                handleChangeStatus(quest.id, status)
                                            }
                                            onAddSubtask={(newSubtask) =>
                                                handleAddSubtask(quest.id, newSubtask)
                                            }
                                        />
                                        {/* Render Subtasks */}
                                        <SubtaskList
                                            questId={quest.id}
                                            subtasks={quest.subtasks}
                                            onEditSubtask={handleEditSubtask}
                                            onDeleteSubtask={handleDeleteSubtask}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Ongoing Quests */}
                            <SectionHeader
                                title="Ongoing"
                                count={ongoingQuests.length}
                                bgColor="bg-indigo-900"
                                textColor="text-indigo-900"
                            />
                            {ongoingQuests.length === 0 ? (
                                <p className="text-gray-500">No ongoing quests available.</p>
                            ) : (
                                <div className="flex flex-row flex-wrap gap-4">
                                    {ongoingQuests.map((quest) => (
                                        <div key={quest.id} className="flex flex-col">
                                            <QuestBoard
                                                {...quest}
                                                onDeleteQuest={() => handleDeleteQuest(quest.id)}
                                                onEditQuest={(updatedQuest) =>
                                                    handleEditQuest(quest.id, updatedQuest)
                                                }
                                                onChangeStatus={(status) =>
                                                    handleChangeStatus(quest.id, status)
                                                }
                                                onAddSubtask={(newSubtask) =>
                                                    handleAddSubtask(quest.id, newSubtask)
                                                }
                                            />
                                            {/* Render Subtasks */}
                                            <SubtaskList
                                                questId={quest.id}
                                                subtasks={quest.subtasks}
                                                onEditSubtask={handleEditSubtask}
                                                onDeleteSubtask={handleDeleteSubtask}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Completed Quests */}
                            <SectionHeader
                                title="Completed"
                                count={completedQuestsList.length}
                                bgColor="bg-indigo-900"
                                textColor="text-indigo-900"
                            />
                            {completedQuestsList.length === 0 ? (
                                <p className="text-gray-500">No completed quests available.</p>
                            ) : (
                                <div className="flex flex-row flex-wrap gap-4">
                                    {completedQuestsList.map((quest) => (
                                        <div key={quest.id} className="flex flex-col">
                                            <QuestBoard
                                                {...quest}
                                                onDeleteQuest={() => handleDeleteQuest(quest.id)}
                                                onEditQuest={(updatedQuest) =>
                                                    handleEditQuest(quest.id, updatedQuest)
                                                }
                                                onChangeStatus={(status) =>
                                                    handleChangeStatus(quest.id, status)
                                                }
                                                onAddSubtask={(newSubtask) =>
                                                    handleAddSubtask(quest.id, newSubtask)
                                                }
                                            />
                                            {/* Render Subtasks */}
                                            <SubtaskList
                                                questId={quest.id}
                                                subtasks={quest.subtasks}
                                                onEditSubtask={handleEditSubtask}
                                                onDeleteSubtask={handleDeleteSubtask}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {viewMode === "list" && (
                        <div className="flex flex-col h-full min-h-0 px-10 pt-10 pb-10 gap-6">
                            {/* List View Content */}
                            {/* 1st row: Title */}
                            <div className="flex flex-wrap justify-between items-center min-w-0 pb-4 relative">
                                <h1 className="truncate text-5xl font-extrabold font-['Typold'] max-w-full">
                                    Quest List
                                </h1>
                                {/* Use the SettingsMenu component */}
                                <SettingsMenu
                                    showMenu={showMenu}
                                    setShowMenu={setShowMenu}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    viewMode={viewMode}
                                    setViewMode={setViewMode}
                                />
                            </div>

                            {/* Quest Items */}
                            <div className="flex flex-col gap-4">
                                {quests.map((quest) => (
                                    <div key={quest.id} className="bg-white rounded-lg shadow-md p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-semibold">{quest.name}</h3>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditQuest(quest.id)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuest(quest.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2">{quest.goal}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-sm bg-gray-200 rounded-full px-3 py-1">
                                                {quest.category}
                                            </span>
                                            <span className="text-sm bg-gray-200 rounded-full px-3 py-1">
                                                Due: {quest.dueDate}
                                            </span>
                                            <span className="text-sm bg-gray-200 rounded-full px-3 py-1">
                                                XP: {quest.xp}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => handleChangeStatus(quest.id, "ongoing")}
                                                className="flex-1 bg-indigo-600 text-white rounded-lg px-4 py-2 shadow-md hover:bg-indigo-700 transition"
                                            >
                                                Start Quest
                                            </button>
                                            <button
                                                onClick={() => handleAddSubtask(quest.id)}
                                                className="flex-1 bg-green-600 text-white rounded-lg px-4 py-2 shadow-md hover:bg-green-700 transition"
                                            >
                                                Add Subtask
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {viewMode === "calendar" && (
                        <div className="flex flex-col h-full min-h-0 px-10 pt-10 pb-10 gap-6">
                            {/* Title and Settings */}
                            <div className="flex flex-wrap justify-between items-center min-w-0 pb-4 relative">
                                <h1 className="truncate text-5xl font-extrabold font-['Typold'] max-w-full">
                                    Quest Calendar
                                </h1>
                                <SettingsMenu
                                    showMenu={showMenu}
                                    setShowMenu={setShowMenu}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                    viewMode={viewMode}
                                    setViewMode={setViewMode}
                                />
                            </div>

                            {/* Calendar View */}
                            <QuestCalendarView quests={quests} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quests;
