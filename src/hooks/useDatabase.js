"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  questService,
  subtaskService,
  userStatsService,
  profileService,
  achievementService,
  streakService,
} from "../services/database"

export const useQuests = () => {
  const { user } = useAuth()
  const [quests, setQuests] = useState([])
  const [subtasks, setSubtasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuests = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const [questsData, subtasksData] = await Promise.all([
        questService.getQuests(user.id),
        subtaskService.getSubtasks(user.id),
      ])

      // Calculate days left for each quest
      const questsWithDays = questsData.map((quest) => ({
        ...quest,
        daysLeft: calculateDaysLeft(quest.due_date),
      }))

      // Group subtasks by quest_id and add to quests
      const subtasksByQuest = subtasksData.reduce((acc, subtask) => {
        if (!acc[subtask.quest_id]) acc[subtask.quest_id] = []
        acc[subtask.quest_id].push({
          ...subtask,
          daysLeft: calculateDaysLeft(subtask.due_date),
        })
        return acc
      }, {})

      const questsWithSubtasks = questsWithDays.map((quest) => ({
        ...quest,
        subtasks: subtasksByQuest[quest.id] || [],
      }))

      setQuests(questsWithSubtasks)
      setSubtasks(
        subtasksData.map((subtask) => ({
          ...subtask,
          daysLeft: calculateDaysLeft(subtask.due_date),
        })),
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuests()
  }, [user?.id])

  const calculateDaysLeft = (dueDate) => {
    if (!dueDate) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    const diffTime = due - today
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const addQuest = async (questData) => {
    try {
      await questService.createQuest(user.id, questData)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateQuest = async (questId, updates) => {
    try {
      await questService.updateQuest(questId, updates)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteQuest = async (questId) => {
    try {
      await questService.deleteQuest(questId)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const addSubtask = async (questId, subtaskData) => {
    try {
      await subtaskService.createSubtask(user.id, questId, subtaskData)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateSubtask = async (subtaskId, updates) => {
    try {
      await subtaskService.updateSubtask(subtaskId, updates)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteSubtask = async (subtaskId) => {
    try {
      await subtaskService.deleteSubtask(subtaskId)
      await fetchQuests()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const completeQuest = async (questId) => {
    try {
      const quest = quests.find((q) => q.id === questId)
      if (quest) {
        await Promise.all([
          questService.updateQuest(questId, { status: "completed", progress: 100 }),
          userStatsService.addXP(user.id, quest.xp),
          streakService.updateStreak(user.id),
        ])
        await fetchQuests()
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    quests,
    subtasks,
    loading,
    error,
    addQuest,
    updateQuest,
    deleteQuest,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    completeQuest,
    refetch: fetchQuests,
  }
}

export const useUserStats = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const data = await userStatsService.getUserStats(user.id)
      setStats(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [user?.id])

  return { stats, loading, error, refetch: fetchStats }
}

export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const data = await profileService.getProfile(user.id)
      setProfile(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user?.id])

  const updateProfile = async (updates) => {
    try {
      const data = await profileService.updateProfile(user.id, updates)
      setProfile(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}

export const useAchievements = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState([])
  const [userAchievements, setUserAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAchievements = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const [allAchievements, userAchievementsData] = await Promise.all([
        achievementService.getAllAchievements(),
        achievementService.getUserAchievements(user.id),
      ])

      setAchievements(allAchievements)
      setUserAchievements(userAchievementsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [user?.id])

  return { achievements, userAchievements, loading, error, refetch: fetchAchievements }
}
