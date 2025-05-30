import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import { useNavigate } from "react-router-dom";
import QuestBoard from "../components/quest/board/QuestBoard";
import SettingsMenu from "../components/quest/settings/SettingsMenu";
import AddQuestForm from "../components/forms/AddQuestForm";
import useLevelSystem from "../features/leveling/useLevelSystem";
import useQuestHandlers from "../hooks/useQuestHandlers";
import { useTheme } from "../contexts/ThemeContext";
import PageHeader from "../components/ui/PageHeader";

const QuestListView = lazy(() => import("../components/quest/list/QuestList"));
const QuestCalendarView = lazy(() =>
  import("../components/quest/calendar/QuestCalendar")
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded">
          <p className="font-medium">Something went wrong.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const calculateDaysLeft = (dueDate) => {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const Quests = () => {
  const navigate = useNavigate();
  const { level, addXP } = useLevelSystem(0);
  const [showMenu, setShowMenu] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState("board");
  const contentRef = useRef(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    questData: null,
    parentId: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    quests,
    handleAddQuest: baseHandleAddQuest,
    handleEditQuest: baseHandleEditQuest,
    handleDeleteQuest,
    handleChangeStatus,
    handleAddSubtask: baseHandleAddSubtask,
    handleEditSubtask: baseHandleEditSubtask,
    handleDeleteSubtask,
    handleChangeSubtaskStatus,
    updateQuestProgress,
  } = useQuestHandlers();

  const handleAddQuest = useCallback(
    (questData) => {
      const enhancedData = {
        ...questData,
        daysLeft: calculateDaysLeft(questData.dueDate),
      };
      baseHandleAddQuest(enhancedData);
    },
    [baseHandleAddQuest]
  );

  const handleEditQuest = useCallback(
    (questId, questData) => {
      const enhancedData = {
        ...questData,
        daysLeft: calculateDaysLeft(questData.dueDate),
      };
      baseHandleEditQuest(questId, enhancedData);
    },
    [baseHandleEditQuest]
  );

  const handleAddSubtask = useCallback(
    (parentId, subtaskData) => {
      const enhancedData = {
        ...subtaskData,
        daysLeft: calculateDaysLeft(subtaskData.dueDate),
      };
      baseHandleAddSubtask(parentId, enhancedData);
    },
    [baseHandleAddSubtask]
  );

  const handleEditSubtask = useCallback(
    (parentId, subtaskId, subtaskData) => {
      const enhancedData = {
        ...subtaskData,
        daysLeft: calculateDaysLeft(subtaskData.dueDate),
      };
      baseHandleEditSubtask(parentId, subtaskId, enhancedData);
    },
    [baseHandleEditSubtask]
  );

  const questByStatus = useMemo(() => {
    const available = [];
    const ongoing = [];
    const completed = [];

    quests.forEach((quest) => {
      const status = quest.status || "available";
      if (status === "available") available.push(quest);
      else if (status === "ongoing") ongoing.push(quest);
      else if (status === "completed") completed.push(quest);
    });

    return { available, ongoing, completed };
  }, [quests]);

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

  const processedSubtasks = useMemo(() => {
    try {
      return quests
        .filter(
          (quest) => Array.isArray(quest.subtasks) && quest.subtasks.length > 0
        )
        .flatMap((quest) =>
          quest.subtasks.map((subtask) => ({
            ...subtask,
            parentId: quest.id,
            parentName: quest.name,
            category: subtask.category || "Subtask",
            goal: subtask.goal || `Part of: ${quest.name}`,
            daysLeft: subtask.daysLeft ?? calculateDaysLeft(subtask.dueDate),
            dueDate: subtask.dueDate || quest.dueDate,
            priority: subtask.priority || 1,
            type: "subtask",
            xp: subtask.xp || Math.floor((quest.xp || 0) / 4),
            status: subtask.status || "available",
          }))
        );
    } catch (err) {
      console.error("Error processing subtasks:", err);
      return [];
    }
  }, [quests]);

  const subtasksByStatus = useMemo(() => {
    const available = [];
    const ongoing = [];
    const completed = [];

    processedSubtasks.forEach((subtask) => {
      const status = subtask.status || "available";
      if (status === "available") available.push(subtask);
      else if (status === "ongoing") ongoing.push(subtask);
      else if (status === "completed") completed.push(subtask);
    });

    return { available, ongoing, completed };
  }, [processedSubtasks]);

  const questData = useMemo(
    () => ({
      quests,
      allSubtasks: processedSubtasks,
      availableQuests: questByStatus.available,
      ongoingQuests: questByStatus.ongoing,
      completedQuests: questByStatus.completed,
      availableSubtasks: subtasksByStatus.available,
      ongoingSubtasks: subtasksByStatus.ongoing,
      completedSubtasks: subtasksByStatus.completed,
    }),
    [quests, processedSubtasks, questByStatus, subtasksByStatus]
  );

  const openAddQuestModal = useCallback(() => {
    setError(null);
    setModalState({
      isOpen: true,
      mode: "add",
      questData: null,
      parentId: null,
    });
  }, []);

  const openEditQuestModal = useCallback(
    (questId) => {
      setError(null);
      const questToEdit = quests.find((q) => q.id === questId);
      if (questToEdit) {
        const formattedQuest = {
          ...questToEdit,
          dueDate: questToEdit.dueDate
            ? formatDateForInput(questToEdit.dueDate)
            : "",
        };

        setModalState({
          isOpen: true,
          mode: "edit",
          questData: formattedQuest,
          parentId: null,
        });
      }
    },
    [quests]
  );

  const openAddSubtaskModal = useCallback(
    (parentId) => {
      setError(null);
      const parentQuest = quests.find((q) => q.id === parentId);
      if (parentQuest) {
        setModalState({
          isOpen: true,
          mode: "addSubtask",
          questData: {
            category: "Subtask",
            dueDate: parentQuest.dueDate
              ? formatDateForInput(parentQuest.dueDate)
              : "",
          },
          parentId,
        });
      }
    },
    [quests]
  );

  const openEditSubtaskModal = useCallback(
    (parentId, subtaskId) => {
      setError(null);
      const parentQuest = quests.find((q) => q.id === parentId);
      if (parentQuest) {
        const subtaskToEdit = parentQuest.subtasks?.find(
          (s) => s.id === subtaskId
        );
        if (subtaskToEdit) {
          const formattedSubtask = {
            ...subtaskToEdit,
            isSubtask: true,
            parentId,
            parentName: parentQuest.name,
            category: subtaskToEdit.category || "Subtask",
            dueDate: subtaskToEdit.dueDate
              ? formatDateForInput(subtaskToEdit.dueDate)
              : "",
            priority: subtaskToEdit.priority || 1,
            xp: subtaskToEdit.xp || Math.floor((parentQuest.xp || 0) / 4),
          };

          setModalState({
            isOpen: true,
            mode: "edit",
            questData: formattedSubtask,
            parentId,
          });
        }
      }
    },
    [quests]
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setError(null);

    const timer = setTimeout(() => {
      setModalState({
        isOpen: false,
        mode: "add",
        questData: null,
        parentId: null,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleModalSubmit = useCallback(
    async (data) => {
      setSubmitting(true);
      setError(null);

      try {
        switch (modalState.mode) {
          case "add":
            await handleAddQuest(data);
            break;
          case "edit":
            if (modalState.questData?.isSubtask) {
              await handleEditSubtask(
                modalState.parentId,
                modalState.questData.id,
                { ...data, isSubtask: true }
              );
            } else {
              await handleEditQuest(modalState.questData.id, data);
            }
            break;
          case "addSubtask":
            await handleAddSubtask(modalState.parentId, {
              ...data,
              isSubtask: true,
            });
            break;
          default:
            throw new Error("Unknown modal mode");
        }
        closeModal();
      } catch (err) {
        console.error("Form submission error:", err);
        setError(err.message || "Failed to save quest");
      } finally {
        setSubmitting(false);
      }
    },
    [
      modalState,
      handleAddQuest,
      handleEditQuest,
      handleEditSubtask,
      handleAddSubtask,
      closeModal,
    ]
  );

  const renderContent = useCallback(() => {
    switch (viewMode) {
      case "board":
        return (
          <div className="space-y-4">
            <ErrorBoundary>
              <QuestBoard
                title="Available"
                quests={questData.availableQuests.map((quest) => ({
                  ...quest,
                  daysLeft: quest.daysLeft ?? calculateDaysLeft(quest.dueDate),
                  status: quest.status || "available",
                }))}
                subtasks={questData.availableSubtasks}
                showAddButton={true}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handleDeleteSubtask}
                onChangeSubtaskStatus={handleChangeSubtaskStatus}
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <QuestBoard
                title="Ongoing"
                quests={questData.ongoingQuests}
                subtasks={questData.ongoingSubtasks}
                showAddButton={false}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handleDeleteSubtask}
                onChangeSubtaskStatus={handleChangeSubtaskStatus}
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <QuestBoard
                title="Completed"
                quests={questData.completedQuests}
                subtasks={questData.completedSubtasks}
                showAddButton={false}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handleDeleteSubtask}
                onChangeSubtaskStatus={handleChangeSubtaskStatus}
              />
            </ErrorBoundary>
          </div>
        );

      case "list":
        return (
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="p-8 text-center">Loading list view...</div>
              }
            >
              <QuestListView
                quests={questData.quests}
                subtasks={questData.allSubtasks}
                onAddQuest={openAddQuestModal}
                onEditQuest={openEditQuestModal}
                onDeleteQuest={handleDeleteQuest}
                onChangeStatus={handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handleDeleteSubtask}
                onChangeSubtaskStatus={handleChangeSubtaskStatus}
              />
            </Suspense>
          </ErrorBoundary>
        );

      case "calendar":
        return (
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="p-8 text-center">Loading calendar view...</div>
              }
            >
              <QuestCalendarView
                quests={questData.quests}
                subtasks={questData.allSubtasks}
                onAddQuest={openAddQuestModal}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handleChangeStatus}
                onDeleteQuest={handleDeleteQuest}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handleDeleteSubtask}
                onChangeSubtaskStatus={handleChangeSubtaskStatus}
              />
            </Suspense>
          </ErrorBoundary>
        );

      default:
        return <div>Unknown view mode: {viewMode}</div>;
    }
  }, [
    viewMode,
    questData,
    openAddQuestModal,
    openEditQuestModal,
    openAddSubtaskModal,
    openEditSubtaskModal,
    handleDeleteQuest,
    handleChangeStatus,
    handleDeleteSubtask,
    handleChangeSubtaskStatus,
  ]);

  return (
    <div className="w-full px-4 py-6">
      <PageHeader
        title={
          viewMode === "board"
            ? "Quest Board"
            : viewMode === "list"
            ? "Quest List"
            : "Quest Calendar"
        }
        variant="standard"
        size="large"
      >
        <SettingsMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          darkMode={darkMode}
          setDarkMode={toggleTheme}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </PageHeader>

      <div className="mt-4" ref={contentRef}>
        {renderContent()}
      </div>

      <AddQuestForm
        onSubmit={handleModalSubmit}
        onClose={closeModal}
        initialData={modalState.questData || {}}
        isSubtask={
          modalState.mode === "addSubtask" ||
          (modalState.mode === "edit" && modalState.questData?.isSubtask)
        }
        isOpen={modalState.isOpen}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  );
};

export default Quests;
