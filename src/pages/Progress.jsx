"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "../components/ui/PageHeader"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"
import { useUserStats, useQuests } from "../hooks/useDatabase"
import ErrorBoundary from "../components/common/ErrorBoundary"
import settingsDots from "../assets/icons/settingsDots.png"
import XPBottleIcon from "../assets/icons/XPBottle.svg"
import StreakFlameIcon from "../assets/icons/StreakFlame.svg"
import SwordIcon from "../assets/icons/Sword.svg"
import AxeIcon from "../assets/icons/Axe.svg"
import WandIcon from "../assets/icons/Wand.svg"

// Demo data for demo user
const demoGoalData = [
  {
    name: "Complete Frontend Course",
    category: "Learning",
    progress: 65,
    daysLeft: 3,
    color: "yellow",
    tasksCompleted: 13,
    totalTasks: 20,
  },
  {
    name: "Build Portfolio Website",
    category: "Project",
    progress: 40,
    daysLeft: 7,
    color: "blue",
    tasksCompleted: 8,
    totalTasks: 20,
  },
]

const demoStatsData = {
  totalXP: "1,250",
  dailyGoals: 75,
  todayTasks: 3,
  thisWeekTasks: 5,
  thisMonthTasks: 12,
  streakCount: 7,
}

// SVG component for StreakFlame
const StreakFlame = ({ className, title, streakCount = 7 }) => (
  <div className={`relative ${className}`}>
    <svg width="48" height="48" viewBox="0 0 64 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 10C28 15 24 22 24 32C24 42 28 48 36 48L37 49C36 50 34 52 34 55C34 60 36 64 38 64C40 64 42 60 42 55C42 52 40 50 39 49L40 48C48 48 52 42 52 32C52 22 48 15 44 10C40 15 36 22 36 32C36 35 37 37 38 38C36 39 34 42 34 45C34 47 35 49 36 49C37 49 38 47 38 45C38 42 36 39 34 38C35 37 36 35 36 32C36 22 32 15 32 10Z"
        fill="#FF9500"
      />
      <path
        d="M38 10C36 15 34 22 34 32C34 37 36 40 38 41C37 42 36 44 36 46C36 48 37 50 38 50C39 50 40 48 40 46C40 44 39 42 38 41C40 40 42 37 42 32C42 22 40 15 38 10Z"
        fill="#FFC000"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">{streakCount}</div>
    <div className="absolute -right-1 bottom-0 bg-orange-500 h-5 w-5 rounded-full text-white flex items-center justify-center text-xs">
      n
    </div>
  </div>
)

const Progress = () => {
  const navigate = useNavigate()
  const { darkMode, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState(null)

  const settingsBtnRef = useRef(null)

  const isDemoUser = user?.id === "demo-user-123"
  const { stats, loading: statsLoading } = useUserStats()
  const { quests, loading: questsLoading } = useQuests()

  // Use demo data for demo user, real data for others
  const goalData = isDemoUser ? demoGoalData : []
  const statsData = isDemoUser
    ? demoStatsData
    : {
        totalXP: stats?.total_xp?.toLocaleString() || "0",
        dailyGoals: 0, // Calculate from quests
        todayTasks: 0, // Calculate from quests
        thisWeekTasks: 0, // Calculate from quests
        thisMonthTasks: 0, // Calculate from quests
        streakCount: stats?.current_streak || 0,
      }

  // Calculate real stats from quests for authenticated users
  useEffect(() => {
    if (!isDemoUser && quests.length > 0) {
      const today = new Date()
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

      const completedQuests = quests.filter((q) => q.status === "completed")

      const todayCompleted = completedQuests.filter((q) => {
        const completedDate = new Date(q.updated_at)
        return completedDate.toDateString() === today.toDateString()
      }).length

      const weekCompleted = completedQuests.filter((q) => {
        const completedDate = new Date(q.updated_at)
        return completedDate >= weekAgo
      }).length

      const monthCompleted = completedQuests.filter((q) => {
        const completedDate = new Date(q.updated_at)
        return completedDate >= monthAgo
      }).length

      const totalQuests = quests.length
      const dailyGoalsProgress = totalQuests > 0 ? Math.round((completedQuests.length / totalQuests) * 100) : 0

      statsData.todayTasks = todayCompleted
      statsData.thisWeekTasks = weekCompleted
      statsData.thisMonthTasks = monthCompleted
      statsData.dailyGoals = Math.min(100, dailyGoalsProgress)
    }
  }, [quests, isDemoUser])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Clean settings toggle function
  const handleSettingsToggle = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  // Simple line chart data
  const chartPoints = [
    { x: 0, y: 160 },
    { x: 50, y: 110 },
    { x: 100, y: 90 },
    { x: 150, y: 140 },
    { x: 200, y: 60 },
    { x: 250, y: 130 },
    { x: 300, y: 30 },
    { x: 350, y: 100 },
  ]

  const chartPath = chartPoints.map((point, index) => (index === 0 ? "M" : "L") + `${point.x},${point.y}`).join(" ")

  const handleMenuToggle = (index, e) => {
    if (e) e.stopPropagation()
    setActiveMenu(activeMenu === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeMenu !== null &&
        !event.target.closest(".goal-menu-container") &&
        !event.target.closest(".goal-menu-button")
      ) {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeMenu])

  useEffect(() => {
    const handleClickOutsideSettings = (event) => {
      if (
        showMenu &&
        !event.target.closest(".settings-menu-container") &&
        !event.target.closest(".settings-menu-button")
      ) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideSettings)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSettings)
    }
  }, [showMenu])

  const loading = !isDemoUser && (isLoading || statsLoading || questsLoading)

  return (
    <div className="container-fluid w-full pl-[5%] pr-0 py-6 min-h-screen flex flex-col">
      <PageHeader title="Progress" variant="standard" size="large">
        <div className="relative">
          <button
            ref={settingsBtnRef}
            className="text-gray-500 hover:text-gray-700 focus:outline-none settings-menu-button"
            onClick={handleSettingsToggle}
            aria-label="Settings"
          >
            <img src={settingsDots || "/placeholder.svg"} alt="Settings" className="w-6 h-6 object-contain" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 settings-menu-container"
              style={{ minWidth: "200px" }}
            >
              <SettingsMenu onClose={() => setShowMenu(false)} onToggleTheme={toggleTheme} isDarkMode={darkMode} />
            </div>
          )}
        </div>
      </PageHeader>

      <ErrorBoundary>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow">
            {goalData.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <h3 className="text-xl font-semibold mb-2">No Goals Set Yet</h3>
                <p>Create some quests to start tracking your progress!</p>
                <button
                  onClick={() => navigate("/quests")}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Your First Quest
                </button>
              </div>
            ) : (
              <section className="mb-8 w-full flex-shrink-0">
                <div className="flex items-center w-full mb-4">
                  <h2
                    className="text-xl font-bold whitespace-nowrap pr-3 dark:text-indigo-200"
                    style={{ color: darkMode ? undefined : "#1F168D" }}
                  >
                    Goals
                  </h2>
                  <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
                </div>

                <div className="relative">
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white dark:bg-gray-700 rounded-full shadow-md p-2 opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const container = document.getElementById("goals-container")
                      container.scrollBy({ left: -330, behavior: "smooth" })
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div
                    id="goals-container"
                    className="flex flex-nowrap overflow-x-auto gap-4 pb-4 w-full scrollbar-hide px-4"
                    style={{
                      scrollBehavior: "smooth",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {goalData.map((goal, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative flex-shrink-0"
                        style={{
                          width: 280,
                          height: 250,
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 goal-menu-button"
                          style={{ zIndex: 10 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMenuToggle(index, e)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {activeMenu === index && (
                          <div
                            className="absolute top-10 left-3 z-50 bg-white dark:bg-gray-700 rounded-lg shadow-xl py-2 w-48 goal-menu-container border border-gray-100 dark:border-gray-600"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log("Edit goal", goal.name)
                                setActiveMenu(null)
                              }}
                            >
                              <svg
                                className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit Goal
                            </button>

                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log("Mark as complete", goal.name)
                                setActiveMenu(null)
                              }}
                            >
                              <svg
                                className="h-4 w-4 mr-2 text-green-500 dark:text-green-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Mark as Complete
                            </button>

                            <div className="my-1 border-t border-gray-200 dark:border-gray-600"></div>

                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log("Delete goal", goal.name)
                                setActiveMenu(null)
                              }}
                            >
                              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}

                        <div className="w-full h-full flex flex-col p-6">
                          <div className="flex flex-col items-center mt-6 mb-auto">
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 text-center">
                              {goal.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1 text-center">
                              {goal.category}
                            </p>
                          </div>

                          <div className="flex-grow"></div>

                          <div className="w-full">
                            <div className="w-full flex flex-col mb-3">
                              <div className="w-full flex justify-between mb-0.5">
                                <span className="text-xs font-bold text-gray-400">{goal.progress}%</span>
                              </div>
                              <div className="relative w-full h-2 bg-gray-400/75 dark:bg-gray-600/75 rounded-full">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${goal.progress}%`,
                                    backgroundColor:
                                      goal.color === "yellow"
                                        ? "#F59E0B"
                                        : goal.color === "blue"
                                          ? "#60A5FA"
                                          : goal.color === "purple"
                                            ? "#A78BFA"
                                            : "#818CF8",
                                  }}
                                ></div>
                              </div>
                              <div className="w-full text-center mt-1 mb-3">
                                <span className="text-xs italic text-gray-500">
                                  {goal.tasksCompleted || 0} out of {goal.totalTasks || 5} tasks
                                </span>
                              </div>
                            </div>

                            <div className="w-full flex justify-center">
                              <div
                                className={`inline-block px-3 py-1 rounded-2xl text-center ${
                                  goal.daysLeft <= 7
                                    ? "bg-yellow-200 text-yellow-800"
                                    : goal.color === "blue"
                                      ? "bg-blue-100 text-blue-800"
                                      : goal.color === "purple"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-indigo-100 text-indigo-800"
                                }`}
                              >
                                <span className="font-bold">
                                  <span className="italic">{goal.daysLeft} </span>
                                  <span>Day{goal.daysLeft !== 1 ? "s" : ""} Left</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white dark:bg-gray-700 rounded-full shadow-md p-2 opacity-80 hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const container = document.getElementById("goals-container")
                      container.scrollBy({ left: 330, behavior: "smooth" })
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </section>
            )}

            <section className="w-full flex-grow flex flex-col">
              <div className="flex items-center w-full mb-6">
                <h2
                  className="text-2xl font-bold whitespace-nowrap pr-3 dark:text-indigo-200"
                  style={{ color: "#1F168D" }}
                >
                  Statistics
                </h2>
                <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all md:col-span-4">
                  <div className="h-60 relative mb-2">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <path
                        d={chartPath}
                        fill="none"
                        stroke="#4338ca"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 px-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-5">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={XPBottleIcon || "/placeholder.svg"}
                          alt="XP"
                          className="w-[27px] h-[37px] object-contain"
                        />
                        <div>
                          <div className="text-[#1F168D] dark:text-indigo-300 text-2xl font-medium">
                            {statsData.totalXP}
                          </div>
                          <div className="text-gray-300 dark:text-gray-400 text-sm">Total XP</div>
                        </div>
                      </div>
                      <div>
                        <img
                          src={StreakFlameIcon || "/placeholder.svg"}
                          alt="Streak"
                          className="w-[50px] h-[70px] object-contain"
                        />
                        <div className="text-center text-white text-lg font-medium -mt-10">{statsData.streakCount}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-center flex-grow">
                    <div className="w-32 h-32 relative">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#f0f0f0"
                          strokeWidth="3"
                          className="dark:opacity-10"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="3"
                          strokeDasharray={`${2 * Math.PI * 15 * (statsData.dailyGoals / 100)}, ${2 * Math.PI * 15}`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">
                          {statsData.dailyGoals}%
                        </div>
                        <div className="text-xs text-gray-400">Daily Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-5">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img src={SwordIcon || "/placeholder.svg"} alt="Task icon" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-indigo-900 dark:text-indigo-200 text-xl font-bold">
                        {statsData.todayTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">Slayed Today!</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img src={AxeIcon || "/placeholder.svg"} alt="Task icon" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-indigo-900 dark:text-indigo-200 text-xl font-bold">
                        {statsData.thisWeekTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">Slayed This Week!</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
                      <img src={WandIcon || "/placeholder.svg"} alt="Task icon" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-indigo-900 dark:text-indigo-200 text-xl font-bold">
                        {statsData.thisMonthTasks} Tasks
                      </div>
                      <div className="text-xs text-gray-500">Slayed This Month!</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default Progress

const SettingsMenu = ({ onClose, onToggleTheme, isDarkMode }) => {
  return (
    <div className="w-full">
      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
        onClick={onToggleTheme}
      >
        <svg
          className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isDarkMode ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
        onClick={onClose}
      >
        <svg className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Close
      </button>
    </div>
  )
}
