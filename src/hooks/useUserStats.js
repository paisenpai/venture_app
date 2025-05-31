"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../contexts/AuthContext"
import { userService } from "../services/userService"

const useUserStats = () => {
  const { user } = useAuth()
  const [userStats, setUserStats] = useState(null)
  const [characterStats, setCharacterStats] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [dailyActivity, setDailyActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load all user data
  const loadUserData = useCallback(async () => {
    if (!user?.id) {
      setUserStats(null)
      setCharacterStats(null)
      setAchievements([])
      setDailyActivity([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Load user stats, character stats, achievements, and daily activity in parallel
      const [statsData, characterData, achievementsData, activityData] = await Promise.all([
        userService.getUserStats(user.id),
        userService.getCharacterStats(user.id),
        userService.getUserAchievements(user.id),
        userService.getDailyActivity(user.id, 30), // Last 30 days
      ])

      setUserStats(statsData)
      setCharacterStats(characterData)
      setAchievements(achievementsData)
      setDailyActivity(activityData)
    } catch (err) {
      console.error("Error loading user data:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Load data when user changes
  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Update character stats
  const updateCharacterStats = useCallback(
    async (updates) => {
      if (!user?.id) return

      try {
        setError(null)
        const updatedStats = await userService.updateCharacterStats(user.id, updates)
        setCharacterStats(updatedStats)
      } catch (err) {
        console.error("Error updating character stats:", err)
        setError(err.message)
        throw err
      }
    },
    [user?.id],
  )

  // Refresh all data
  const refreshData = useCallback(async () => {
    await loadUserData()
  }, [loadUserData])

  return {
    userStats,
    characterStats,
    achievements,
    dailyActivity,
    loading,
    error,
    updateCharacterStats,
    refreshData,
  }
}

export default useUserStats
