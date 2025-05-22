import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import QuestBoard from '../components/Quest Board/QuestBoard';
import useLevelSystem from '../features/leveling/useLevelSystem';
import SettingsDots from '../assets/icons/SettingsDots.png';

const questsData = [
    {
        id: 1,
        name: 'Quest 1',
        category: 'Adventure',
        goal: 'Complete all tasks',
        dueDate: '2025-05-31',
        xp: 100,
        daysLeft: 5,
        level: 1,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 60,
    },
    {
        id: 2,
        name: 'Quest 2',
        category: 'Puzzle',
        goal: 'Solve the riddles',
        dueDate: '2025-06-05',
        xp: 80,
        daysLeft: 10,
        level: 2,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 30,
    },
    {
        id: 3,
        name: 'Quest 3',
        category: 'Battle',
        goal: 'Win the duel',
        dueDate: '2025-06-10',
        xp: 120,
        daysLeft: 15,
        level: 3,
        avatarUrl: 'https://placehold.co/23x23',
        progress: 90,
    },
];

const Quests = () => {
    const navigate = useNavigate();
    const { level, addXP } = useLevelSystem();
    const [completedQuests, setCompletedQuests] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [listView, setListView] = useState(false);
    const menuRef = useRef(null);

    const handleNavigate = (questId) => navigate(`/quests/${questId}`);

    const handleCompleteQuest = (quest) => {
        if (!completedQuests.includes(quest.id)) {
            addXP(quest.xp);
            setCompletedQuests((prev) => [...prev, quest.id]);
        }
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

    // Separate quests by status and level
    const availableQuests = questsData.filter(
        (q) => !completedQuests.includes(q.id) && q.progress < 100 && q.level === 2
    );
    const ongoingQuests = questsData.filter(
        (q) => !completedQuests.includes(q.id) && q.progress < 100 && q.level === 3
    );
    const completed = questsData.filter((q) => completedQuests.includes(q.id));

    const getBoardCount = (quests, showSubtasks = false) => (showSubtasks ? 1 + quests.length : 1);

    // Theme classes
    const themeClass = darkMode ? "bg-black text-white" : "bg-gray-50 text-indigo-900";

    return (
        <div className={`flex h-screen ${themeClass}`}>
            <Sidebar />
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
                                >
                                    <img
                                        className="w-10 h-10"
                                        src={SettingsDots}
                                        alt="Quest Board Settings Icon"
                                    />
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 text-black">
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setDarkMode((prev) => !prev);
                                                setShowMenu(false);
                                            }}
                                        >
                                            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setListView((prev) => !prev);
                                                setShowMenu(false);
                                            }}
                                        >
                                            {listView ? "Switch to Board View" : "Switch to List View"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 2nd row: Available header */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 p-3.5 relative flex justify-center items-center">
                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <div className="w-5 h-5 text-center flex justify-center items-center text-white text-xl font-bold font-['Typold']">
                                        {2 + (availableQuests[0] ? 1 : 0)}
                                    </div>
                                </div>
                                <div className="w-8 h-8 left-0 top-0 absolute shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
                                    <div className="w-8 h-8 bg-indigo-900 rounded-full" />
                                </div>
                            </div>
                            <span className="text-indigo-900 text-3xl font-bold font-['Typold']">
                                Available
                            </span>
                            <div className="flex-1 h-0 border-t-2 border-[#90909080] px-[5%]"></div>
                        </div>
                        {/* 3rd row: QuestBoards for Available */}
                        <div className={`flex ${listView ? "flex-col" : "justify-start gap-4"}`}>
                            <QuestBoard type="default" size="small" />
                            <QuestBoard type="default" size="small" />
                            {availableQuests[0] && (
                                <QuestBoard type="subtask" {...availableQuests[0]} />
                            )}
                            <QuestBoard type="add" />
                        </div>
                        {/* 4th row: Ongoing header */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 p-3.5 relative flex justify-center items-center">
                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <div className="w-5 h-5 text-center flex justify-center items-center text-white text-xl font-bold font-['Typold']">
                                        {2 + (ongoingQuests[0] ? 1 : 0)}
                                    </div>
                                </div>
                                <div className="w-8 h-8 left-0 top-0 absolute shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
                                    <div className="w-8 h-8 bg-indigo-900 rounded-full" />
                                </div>
                            </div>
                            <span className="text-indigo-900 text-3xl font-bold font-['Typold']">
                                Ongoing
                            </span>
                            <div className="flex-1 h-0 border-t-2 border-[#90909080] px-[5%]"></div>
                        </div>
                        {/* 5th row: QuestBoards for Ongoing */}
                        <div className="flex justify-start gap-4">
                            <QuestBoard type="default" size="small" />
                            <QuestBoard type="default" size="small" />
                            {ongoingQuests[0] && (
                                <QuestBoard type="subtask" {...ongoingQuests[0]} />
                            )}
                        </div>
                        {/* 6th row: Completed header */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 p-3.5 relative flex justify-center items-center">
                                <div className="absolute inset-0 flex justify-center items-center z-10">
                                    <div className="w-5 h-5 text-center flex justify-center items-center text-white text-xl font-bold font-['Typold']">
                                        {getBoardCount(completed, true)}
                                    </div>
                                </div>
                                <div className="w-8 h-8 left-0 toqqp-0 absolute shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
                                    <div className="w-8 h-8 bg-indigo-900 rounded-full" />
                                </div>
                            </div>
                            <span className="text-indigo-900 text-3xl font-bold font-['Typold']">
                                Completed
                            </span>
                            <div className="flex-1 h-0 border-t-2 border-[#90909080] px-[5%]"></div>
                        </div>
                        {/* 7th row: Default QuestBoard for Completed */}
                        <div className="flex justify-start">
                            <QuestBoard type="default" size="small" />
                            {/* {completed.map(q => (
                                <QuestBoard key={q.id} type="subtask" {...q} />
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quests;
