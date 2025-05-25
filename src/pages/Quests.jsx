import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestBoard from "../components/quest/QuestBoard";
import useLevelSystem from "../features/leveling/useLevelSystem";
import SettingsDots from "../assets/icons/SettingsDots.png";
import { getThemeClass } from "../utils/themeUtils";
import { filterQuestsByStatus } from "../utils/QuestBoard/questFilters";

const Quests = () => {
    const navigate = useNavigate();
    const { level, addXP } = useLevelSystem();
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [quests, setQuests] = useState([
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
    ]);
    const menuRef = useRef(null);

    const handleNavigate = (questId) => navigate(`/quests/${questId}`);

    const handleDeleteQuest = (id) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== id));
    };

    const handleEditQuest = (id, updatedQuest) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === id
                    ? { ...quest, ...updatedQuest, subtasks: updatedQuest.subtasks || [] }
                    : quest
            )
        );
    };

    const handleChangeStatus = (id, status) => {
        setQuests((prev) =>
            prev.map((quest) => (quest.id === id ? { ...quest, status } : quest))
        );
    };

    const handleAddQuest = (newQuest) => {
        setQuests((prev) => [
            ...prev,
            {
                ...newQuest,
                id: prev.length + 1,
                subtasks: [],
                progress: 0,
                level: 1,
                status: "available",
            },
        ]);
    };

    const handleEditSubtask = (questId, subtaskId, updatedSubtask) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: quest.subtasks.map((subtask) =>
                              subtask.id === subtaskId ? { ...subtask, ...updatedSubtask } : subtask
                          ),
                      }
                    : quest
            )
        );
    };

    const handleAddSubtask = (questId, newSubtask) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: [
                              ...quest.subtasks,
                              { ...newSubtask, id: quest.subtasks.length + 1 },
                          ],
                      }
                    : quest
            )
        );
    };

    const handleDeleteSubtask = (questId, subtaskId) => {
        setQuests((prev) =>
            prev.map((quest) =>
                quest.id === questId
                    ? {
                          ...quest,
                          subtasks: quest.subtasks.filter((subtask) => subtask.id !== subtaskId),
                      }
                    : quest
            )
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                    <div className="flex flex-col h-full min-h-0 px-10 pt-10 pb-10 gap-6">
                        {/* 1st row: Title */}
                        <div className="flex flex-wrap justify-between items-center min-w-0 pb-4 relative">
                            <h1 className="truncate text-5xl font-extrabold font-['Typold'] max-w-full">
                                Quest Board
                            </h1>
                            <div className="relative" ref={menuRef}>
                                <button
                                    className="w-10 h-10 flex-shrink-0 focus:outline-none"
                                    onClick={() => setShowMenu((prev) => !prev)}
                                    aria-label="Quest Board Settings"
                                    aria-expanded={showMenu}
                                    tabIndex={0}
                                >
                                    <img
                                        className="w-10 h-10"
                                        src={SettingsDots}
                                        alt="Quest Board Settings Icon"
                                    />
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 text-black">
                                        {/* Toggle Dark Mode */}
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setDarkMode((prev) => !prev);
                                                setShowMenu(false);
                                            }}
                                        >
                                            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                        </button>
                                        {/* View Quest List */}
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                navigate("/quests/list");
                                                setShowMenu(false);
                                            }}
                                        >
                                            View Quest List
                                        </button>
                                        {/* View Quest Calendar */}
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                navigate("/quests/calendar");
                                                setShowMenu(false);
                                            }}
                                        >
                                            View Quest Calendar
                                        </button>
                                    </div>
                                )}
                            </div>
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
                                        onEditSubtask={(subtaskId, updatedSubtask) =>
                                            handleEditSubtask(quest.id, subtaskId, updatedSubtask)
                                        }
                                        onDeleteSubtask={(subtaskId) =>
                                            handleDeleteSubtask(quest.id, subtaskId)
                                        }
                                    />
                                    {/* Render Subtasks */}
                                    <div className="flex flex-row flex-wrap gap-4 mt-4">
                                        {quest.subtasks.map((subtask) => (
                                            <QuestBoard
                                                key={subtask.id}
                                                type="subtask"
                                                {...subtask}
                                                onEditQuest={(updatedSubtask) =>
                                                    handleEditSubtask(
                                                        quest.id,
                                                        subtask.id,
                                                        updatedSubtask
                                                    )
                                                }
                                                onDeleteQuest={() =>
                                                    handleDeleteSubtask(quest.id, subtask.id)
                                                }
                                            />
                                        ))}
                                    </div>
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
                                            onEditSubtask={(subtaskId, updatedSubtask) =>
                                                handleEditSubtask(quest.id, subtaskId, updatedSubtask)
                                            }
                                            onDeleteSubtask={(subtaskId) =>
                                                handleDeleteSubtask(quest.id, subtaskId)
                                            }
                                        />
                                        {/* Render Subtasks */}
                                        <div className="flex flex-row flex-wrap gap-4 mt-4">
                                            {quest.subtasks.map((subtask) => (
                                                <QuestBoard
                                                    key={subtask.id}
                                                    type="subtask"
                                                    {...subtask}
                                                    onEditQuest={(updatedSubtask) =>
                                                        handleEditSubtask(
                                                            quest.id,
                                                            subtask.id,
                                                            updatedSubtask
                                                        )
                                                    }
                                                    onDeleteQuest={() =>
                                                        handleDeleteSubtask(quest.id, subtask.id)
                                                    }
                                                />
                                            ))}
                                        </div>
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
                                            onEditSubtask={(subtaskId, updatedSubtask) =>
                                                handleEditSubtask(quest.id, subtaskId, updatedSubtask)
                                            }
                                            onDeleteSubtask={(subtaskId) =>
                                                handleDeleteSubtask(quest.id, subtaskId)
                                            }
                                        />
                                        {/* Render Subtasks */}
                                        <div className="flex flex-row flex-wrap gap-4 mt-4">
                                            {quest.subtasks.map((subtask) => (
                                                <QuestBoard
                                                    key={subtask.id}
                                                    type="subtask"
                                                    {...subtask}
                                                    onEditQuest={(updatedSubtask) =>
                                                        handleEditSubtask(
                                                            quest.id,
                                                            subtask.id,
                                                            updatedSubtask
                                                        )
                                                    }
                                                    onDeleteQuest={() =>
                                                        handleDeleteSubtask(quest.id, subtask.id)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quests;
