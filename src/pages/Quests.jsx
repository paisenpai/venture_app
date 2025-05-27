import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QuestListView from "../components/quest/QuestList";
import QuestCalendarView from "../components/quest/QuestCalendar";
import QuestSection from "../components/quest/QuestSection";
import SettingsMenu from "../components/quest/SettingsMenu";
import useLevelSystem from "../features/leveling/useLevelSystem";
import useQuestHandlers from "../hooks/useQuestHandlers";
import { filterQuestsByStatus } from "../utils/QuestBoard/questFilters";
import { getThemeClass } from "../utils/themeUtils";

const Quests = () => {
  const navigate = useNavigate();
  const { level, addXP } = useLevelSystem(0);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("board");
  const [containerHeight, setContainerHeight] = useState("100vh");
  const contentRef = useRef(null);

  // Track viewport height changes for responsive design
  useEffect(() => {
    const updateHeight = () => {
      // Get visible viewport height
      const vh = window.innerHeight;
      setContainerHeight(`${vh}px`);
    };

    // Initial height set
    updateHeight();

    // Listen for resize and orientation change
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    // Listen for zoom changes
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || e.metaKey) {
        // Small delay to ensure zoom completes
        setTimeout(updateHeight, 100);
      }
    });

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
      window.removeEventListener("wheel", updateHeight);
    };
  }, []);

  // Initial quests data
  const initialQuests = [
    {
      id: 1,
      name: "Complete Project Documentation",
      category: "Work",
      goal: "Write and format all technical documentation",
      dueDate: "2023-12-15",
      xp: 100,
      daysLeft: 5,
      priority: 2,
      status: "available",
      progress: 20,
      subtasks: [
        { id: 1, name: "Create outline", progress: 100 },
        { id: 2, name: "Write first draft", progress: 60 },
        { id: 3, name: "Peer review", progress: 0 },
      ],
    },
    {
      id: 2,
      name: "Learn React Hooks",
      category: "Study",
      goal: "Master useEffect, useState, and useMemo",
      dueDate: "2023-12-10",
      xp: 75,
      daysLeft: 3,
      priority: 1,
      status: "ongoing",
      progress: 45,
      subtasks: [
        { id: 1, name: "Study useState", progress: 100 },
        { id: 2, name: "Practice useEffect", progress: 80 },
      ],
    },
    {
      id: 3,
      name: "Weekly Fitness Goal",
      category: "Fitness",
      goal: "Run 15km total this week",
      dueDate: "2023-12-07",
      xp: 50,
      daysLeft: 1,
      priority: 3,
      status: "completed",
      progress: 100,
      subtasks: [
        { id: 1, name: "Monday run (5km)", progress: 100 },
        { id: 2, name: "Wednesday run (5km)", progress: 100 },
        { id: 3, name: "Friday run (5km)", progress: 100 },
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
    handleChangeSubtaskStatus, // Make sure this is added
  } = useQuestHandlers(initialQuests);

  // Filter quests by status - memoized for performance
  const availableQuests = useMemo(
    () => filterQuestsByStatus(quests, "available"),
    [quests]
  );
  const ongoingQuests = useMemo(
    () => filterQuestsByStatus(quests, "ongoing"),
    [quests]
  );
  const completedQuests = useMemo(
    () => filterQuestsByStatus(quests, "completed"),
    [quests]
  );

  // Theme class for styling
  const themeClass = getThemeClass(darkMode);

  // Handler for completing quests and adding XP
  const handleCompleteQuest = useCallback(
    (questId) => {
      const quest = quests.find((q) => q.id === questId);
      if (quest) {
        addXP(quest.xp);
        handleChangeStatus(questId, "completed");
      }
    },
    [quests, addXP, handleChangeStatus]
  );

  // Render different views based on viewMode
  const renderContent = useCallback(() => {
    // Extract all subtasks for easier management at the same level
    const allSubtasks = quests
      .filter((quest) => quest.subtasks?.length > 0)
      .flatMap((quest) =>
        quest.subtasks.map((subtask) => ({
          ...subtask,
          parentId: quest.id,
          parentName: quest.name,
          // Ensure consistent styling by adding these properties if missing
          category: subtask.category || "Subtask",
          goal: subtask.goal || "",
          daysLeft: subtask.daysLeft || 0,
          priority: subtask.priority || 1,
          type: "subtask",
        }))
      );

    // Filter subtasks by status
    const availableSubtasks = allSubtasks.filter(
      (subtask) => subtask.status === "available" || !subtask.status
    );

    const ongoingSubtasks = allSubtasks.filter(
      (subtask) => subtask.status === "ongoing"
    );

    const completedSubtasks = allSubtasks.filter(
      (subtask) => subtask.status === "completed"
    );

    switch (viewMode) {
      case "board":
        return (
          <div className="space-y-12">
            {" "}
            {/* Increased spacing for better section separation */}
            <QuestSection
              title="Available"
              quests={availableQuests}
              subtasks={availableSubtasks}
              showAddButton={true}
              onAddQuest={handleAddQuest}
              onDeleteQuest={handleDeleteQuest}
              onEditQuest={handleEditQuest}
              onChangeStatus={handleChangeStatus}
              onAddSubtask={handleAddSubtask}
              onEditSubtask={handleEditSubtask}
              onDeleteSubtask={handleDeleteSubtask}
              onChangeSubtaskStatus={handleChangeSubtaskStatus}
            />
            <QuestSection
              title="Ongoing"
              quests={ongoingQuests}
              subtasks={ongoingSubtasks}
              onAddQuest={handleAddQuest}
              onDeleteQuest={handleDeleteQuest}
              onEditQuest={handleEditQuest}
              onChangeStatus={handleChangeStatus}
              onAddSubtask={handleAddSubtask}
              onEditSubtask={handleEditSubtask}
              onDeleteSubtask={handleDeleteSubtask}
              onChangeSubtaskStatus={handleChangeSubtaskStatus}
            />
            <QuestSection
              title="Completed"
              quests={completedQuests}
              subtasks={completedSubtasks}
              onAddQuest={handleAddQuest}
              onDeleteQuest={handleDeleteQuest}
              onEditQuest={handleEditQuest}
              onChangeStatus={handleChangeStatus}
              onAddSubtask={handleAddSubtask}
              onEditSubtask={handleEditSubtask}
              onDeleteSubtask={handleDeleteSubtask}
              onChangeSubtaskStatus={handleChangeSubtaskStatus}
            />
          </div>
        );

      case "list":
        return (
          <QuestListView
            quests={quests}
            onAddQuest={handleAddQuest}
            onEditQuest={handleEditQuest}
            onDeleteQuest={handleDeleteQuest}
            onChangeStatus={handleChangeStatus}
          />
        );

      case "calendar":
        return <QuestCalendarView quests={quests} />;

      default:
        return null;
    }
  }, [
    viewMode,
    availableQuests,
    ongoingQuests,
    completedQuests,
    quests, // Add quests to dependencies for subtask extraction
    handleAddQuest,
    handleEditQuest,
    handleDeleteQuest,
    handleChangeStatus,
    handleAddSubtask,
    handleEditSubtask,
    handleDeleteSubtask,
    handleChangeSubtaskStatus,
  ]);

  return (
    <div
      className={`flex flex-col ${themeClass}`}
      style={{ height: containerHeight, maxHeight: containerHeight }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
          <div className="flex flex-col px-4 sm:px-6 lg:px-8 pt-6 pb-10 gap-6">
            {/* Title and Settings Row */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-['Typold']">
                {viewMode === "board"
                  ? "Quest Board"
                  : viewMode === "list"
                  ? "Quest List"
                  : "Quest Calendar"}
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

            {/* View Content */}
            <div className="flex-1 min-h-0">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
