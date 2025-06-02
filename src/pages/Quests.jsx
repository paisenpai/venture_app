"use client"

import React, { useState, useRef, useCallback, useMemo, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import QuestBoard from "../components/quest/board/QuestBoard"
import SettingsMenu from "../components/quest/settings/SettingsMenu"
import AddQuestForm from "../components/forms/AddQuestForm"
import useLevelSystem from "../features/leveling/useLevelSystem"
import { useQuests } from "../hooks/useDatabase"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import PageHeader from "../components/ui/PageHeader"

const QuestListView = lazy(() => import("../components/quest/list/QuestList"))
const QuestCalendarView = lazy(() => import("../components/quest/calendar/QuestCalendar"))

// Demo data for demo user
const getDemoData = () => [
  {
    id: "demo-q1",
    name: "Complete Project Documentation",
    category: "Work",
    goal: "Write comprehensive docs for the API",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    xp: 250,
    priority: 3,
    status: "available",
    progress: 0,
    daysLeft: 7,
    subtasks: [
      {
        id: "demo-st1-1",
        name: "API Endpoints Documentation",
        category: "Subtask",
        goal: "Document all API endpoints",
        due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        xp: 60,
        priority: 2,
        status: "available",
        progress: 0,
        daysLeft: 3,
      },
    ],
  },
  {
    id: "demo-q2",
    name: "Learn React Hooks",
    category: "Education",
    goal: "Master all essential React hooks",
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    xp: 300,
    priority: 2,
    status: "ongoing",
    progress: 45,
    daysLeft: 14,
    subtasks: [],
  },
]

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
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
      )
    }
    return this.props.children
  }
}

const calculateDaysLeft = (dueDate) => {
  if (!dueDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)

  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

const formatDateForInput = (date) => {
  if (!date) return ""
  return new Date(date).toISOString().split("T")[0]
}

const Quests = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { level, addXP } = useLevelSystem(0)
  const [showMenu, setShowMenu] = useState(false)
  const { darkMode, toggleTheme } = useTheme()
  const [viewMode, setViewMode] = useState("board")
  const contentRef = useRef(null)
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    questData: null,
    parentId: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Use demo data for demo user, real data for authenticated users
  const isDemoUser = user?.id === "demo-user-123"
  const [demoQuests, setDemoQuests] = useState(getDemoData())

  const {
    quests: realQuests,
    subtasks: realSubtasks,
    loading,
    error: dbError,
    addQuest,
    updateQuest,
    deleteQuest,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    completeQuest,
  } = useQuests()

  // Use demo data for demo user, real data for others
  const quests = isDemoUser ? demoQuests : realQuests
  const allSubtasks = isDemoUser
    ? demoQuests.flatMap((q) => q.subtasks?.map((s) => ({ ...s, parentId: q.id, parentName: q.name })) || [])
    : realSubtasks

  // Demo handlers for demo user
  const handleDemoAddQuest = useCallback((questData) => {
    const newQuest = {
      id: `demo-q${Date.now()}`,
      ...questData,
      daysLeft: calculateDaysLeft(questData.due_date),
      subtasks: [],
    }
    setDemoQuests((prev) => [...prev, newQuest])
  }, [])

  const handleDemoUpdateQuest = useCallback((questId, updates) => {
    setDemoQuests((prev) =>
      prev.map((q) =>
        q.id === questId ? { ...q, ...updates, daysLeft: calculateDaysLeft(updates.due_date || q.due_date) } : q,
      ),
    )
  }, [])

  const handleDemoDeleteQuest = useCallback((questId) => {
    setDemoQuests((prev) => prev.filter((q) => q.id !== questId))
  }, [])

  const handleDemoAddSubtask = useCallback((parentId, subtaskData) => {
    const newSubtask = {
      id: `demo-st${Date.now()}`,
      ...subtaskData,
      daysLeft: calculateDaysLeft(subtaskData.due_date),
    }
    setDemoQuests((prev) =>
      prev.map((q) => (q.id === parentId ? { ...q, subtasks: [...(q.subtasks || []), newSubtask] } : q)),
    )
  }, [])

  // Choose handlers based on user type
  const handlers = isDemoUser
    ? {
        handleAddQuest: handleDemoAddQuest,
        handleEditQuest: handleDemoUpdateQuest,
        handleDeleteQuest: handleDemoDeleteQuest,
        handleChangeStatus: handleDemoUpdateQuest,
        handleAddSubtask: handleDemoAddSubtask,
        handleEditSubtask: (parentId, subtaskId, updates) => {
          setDemoQuests((prev) =>
            prev.map((q) =>
              q.id === parentId
                ? {
                    ...q,
                    subtasks: q.subtasks?.map((s) => (s.id === subtaskId ? { ...s, ...updates } : s)) || [],
                  }
                : q,
            ),
          )
        },
        handleDeleteSubtask: (parentId, subtaskId) => {
          setDemoQuests((prev) =>
            prev.map((q) =>
              q.id === parentId
                ? {
                    ...q,
                    subtasks: q.subtasks?.filter((s) => s.id !== subtaskId) || [],
                  }
                : q,
            ),
          )
        },
        handleChangeSubtaskStatus: (parentId, subtaskId, status) => {
          setDemoQuests((prev) =>
            prev.map((q) =>
              q.id === parentId
                ? {
                    ...q,
                    subtasks: q.subtasks?.map((s) => (s.id === subtaskId ? { ...s, status } : s)) || [],
                  }
                : q,
            ),
          )
        },
      }
    : {
        handleAddQuest: addQuest,
        handleEditQuest: updateQuest,
        handleDeleteQuest: deleteQuest,
        handleChangeStatus: (questId, status) => updateQuest(questId, { status }),
        handleAddSubtask: addSubtask,
        handleEditSubtask: (parentId, subtaskId, updates) => updateSubtask(subtaskId, updates),
        handleDeleteSubtask: (parentId, subtaskId) => deleteSubtask(subtaskId),
        handleChangeSubtaskStatus: (parentId, subtaskId, status) => updateSubtask(subtaskId, { status }),
      }

  const questByStatus = useMemo(() => {
    const available = []
    const ongoing = []
    const completed = []

    quests.forEach((quest) => {
      const status = quest.status || "available"
      if (status === "available") available.push(quest)
      else if (status === "ongoing") ongoing.push(quest)
      else if (status === "completed") completed.push(quest)
    })

    return { available, ongoing, completed }
  }, [quests])

  const subtasksByStatus = useMemo(() => {
    const available = []
    const ongoing = []
    const completed = []

    allSubtasks.forEach((subtask) => {
      const status = subtask.status || "available"
      if (status === "available") available.push(subtask)
      else if (status === "ongoing") ongoing.push(subtask)
      else if (status === "completed") completed.push(subtask)
    })

    return { available, ongoing, completed }
  }, [allSubtasks])

  const questData = useMemo(
    () => ({
      quests,
      allSubtasks,
      availableQuests: questByStatus.available,
      ongoingQuests: questByStatus.ongoing,
      completedQuests: questByStatus.completed,
      availableSubtasks: subtasksByStatus.available,
      ongoingSubtasks: subtasksByStatus.ongoing,
      completedSubtasks: subtasksByStatus.completed,
    }),
    [quests, allSubtasks, questByStatus, subtasksByStatus],
  )

  const openAddQuestModal = useCallback(() => {
    setError(null)
    setModalState({
      isOpen: true,
      mode: "add",
      questData: null,
      parentId: null,
    })
  }, [])

  const openEditQuestModal = useCallback(
    (questId) => {
      setError(null)
      const questToEdit = quests.find((q) => q.id === questId)
      if (questToEdit) {
        const formattedQuest = {
          ...questToEdit,
          dueDate: questToEdit.due_date ? formatDateForInput(questToEdit.due_date) : "",
        }

        setModalState({
          isOpen: true,
          mode: "edit",
          questData: formattedQuest,
          parentId: null,
        })
      }
    },
    [quests],
  )

  const openAddSubtaskModal = useCallback(
    (parentId) => {
      setError(null)
      const parentQuest = quests.find((q) => q.id === parentId)
      if (parentQuest) {
        setModalState({
          isOpen: true,
          mode: "addSubtask",
          questData: {
            category: "Subtask",
            dueDate: parentQuest.due_date ? formatDateForInput(parentQuest.due_date) : "",
          },
          parentId,
        })
      }
    },
    [quests],
  )

  const openEditSubtaskModal = useCallback(
    (parentId, subtaskId) => {
      setError(null)
      const parentQuest = quests.find((q) => q.id === parentId)
      if (parentQuest) {
        const subtaskToEdit = parentQuest.subtasks?.find((s) => s.id === subtaskId)
        if (subtaskToEdit) {
          const formattedSubtask = {
            ...subtaskToEdit,
            isSubtask: true,
            parentId,
            parentName: parentQuest.name,
            category: subtaskToEdit.category || "Subtask",
            dueDate: subtaskToEdit.due_date ? formatDateForInput(subtaskToEdit.due_date) : "",
            priority: subtaskToEdit.priority || 1,
            xp: subtaskToEdit.xp || Math.floor((parentQuest.xp || 0) / 4),
          }

          setModalState({
            isOpen: true,
            mode: "edit",
            questData: formattedSubtask,
            parentId,
          })
        }
      }
    },
    [quests],
  )

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
    setError(null)

    const timer = setTimeout(() => {
      setModalState({
        isOpen: false,
        mode: "add",
        questData: null,
        parentId: null,
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleModalSubmit = useCallback(
    async (data) => {
      setSubmitting(true)
      setError(null)

      try {
        // Convert form data to database format
        const dbData = {
          ...data,
          due_date: data.dueDate,
          deadline: data.deadline,
        }
        delete dbData.dueDate

        switch (modalState.mode) {
          case "add":
            await handlers.handleAddQuest(dbData)
            break
          case "edit":
            if (modalState.questData?.isSubtask) {
              await handlers.handleEditSubtask(modalState.parentId, modalState.questData.id, {
                ...dbData,
                isSubtask: true,
              })
            } else {
              await handlers.handleEditQuest(modalState.questData.id, dbData)
            }
            break
          case "addSubtask":
            await handlers.handleAddSubtask(modalState.parentId, {
              ...dbData,
              isSubtask: true,
            })
            break
          default:
            throw new Error("Unknown modal mode")
        }
        closeModal()
      } catch (err) {
        console.error("Form submission error:", err)
        setError(err.message || "Failed to save quest")
      } finally {
        setSubmitting(false)
      }
    },
    [modalState, handlers, closeModal],
  )

  const renderContent = useCallback(() => {
    if (!isDemoUser && loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )
    }

    switch (viewMode) {
      case "board":
        return (
          <div className="space-y-4">
            <ErrorBoundary>
              <QuestBoard
                title="Available"
                quests={questData.availableQuests.map((quest) => ({
                  ...quest,
                  daysLeft: quest.daysLeft ?? calculateDaysLeft(quest.due_date),
                  status: quest.status || "available",
                }))}
                subtasks={questData.availableSubtasks}
                showAddButton={true}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handlers.handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handlers.handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handlers.handleDeleteSubtask}
                onChangeSubtaskStatus={handlers.handleChangeSubtaskStatus}
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <QuestBoard
                title="Ongoing"
                quests={questData.ongoingQuests}
                subtasks={questData.ongoingSubtasks}
                showAddButton={false}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handlers.handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handlers.handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handlers.handleDeleteSubtask}
                onChangeSubtaskStatus={handlers.handleChangeSubtaskStatus}
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <QuestBoard
                title="Completed"
                quests={questData.completedQuests}
                subtasks={questData.completedSubtasks}
                showAddButton={false}
                onAddQuest={openAddQuestModal}
                onDeleteQuest={handlers.handleDeleteQuest}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handlers.handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handlers.handleDeleteSubtask}
                onChangeSubtaskStatus={handlers.handleChangeSubtaskStatus}
              />
            </ErrorBoundary>
          </div>
        )

      case "list":
        return (
          <ErrorBoundary>
            <Suspense fallback={<div className="p-8 text-center">Loading list view...</div>}>
              <QuestListView
                quests={questData.quests}
                subtasks={questData.allSubtasks}
                onAddQuest={openAddQuestModal}
                onEditQuest={openEditQuestModal}
                onDeleteQuest={handlers.handleDeleteQuest}
                onChangeStatus={handlers.handleChangeStatus}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handlers.handleDeleteSubtask}
                onChangeSubtaskStatus={handlers.handleChangeSubtaskStatus}
              />
            </Suspense>
          </ErrorBoundary>
        )

      case "calendar":
        return (
          <ErrorBoundary>
            <Suspense fallback={<div className="p-8 text-center">Loading calendar view...</div>}>
              <QuestCalendarView
                quests={questData.quests}
                subtasks={questData.allSubtasks}
                onAddQuest={openAddQuestModal}
                onEditQuest={openEditQuestModal}
                onChangeStatus={handlers.handleChangeStatus}
                onDeleteQuest={handlers.handleDeleteQuest}
                onAddSubtask={openAddSubtaskModal}
                onEditSubtask={openEditSubtaskModal}
                onDeleteSubtask={handlers.handleDeleteSubtask}
                onChangeSubtaskStatus={handlers.handleChangeSubtaskStatus}
              />
            </Suspense>
          </ErrorBoundary>
        )

      default:
        return <div>Unknown view mode: {viewMode}</div>
    }
  }, [
    isDemoUser,
    loading,
    viewMode,
    questData,
    openAddQuestModal,
    openEditQuestModal,
    openAddSubtaskModal,
    openEditSubtaskModal,
    handlers,
  ])

  return (
    <div className="w-full px-4 py-6">
      <PageHeader
        title={viewMode === "board" ? "Quest Board" : viewMode === "list" ? "Quest List" : "Quest Calendar"}
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
        isSubtask={modalState.mode === "addSubtask" || (modalState.mode === "edit" && modalState.questData?.isSubtask)}
        isOpen={modalState.isOpen}
        isSubmitting={submitting}
        error={error}
      />
    </div>
  )
}

export default Quests
