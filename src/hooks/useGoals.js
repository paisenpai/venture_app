"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../contexts/AuthContext"
import { goalService } from "../services/goalService"

const useGoals = () => {
  const { user } = useAuth()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load goals from database
  const loadGoals = useCallback(async () => {
    if (!user?.id) {
      setGoals([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const goalsData = await goalService.getUserGoals(user.id)
      setGoals(goalsData)
    } catch (err) {
      console.error("Error loading goals:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Load goals when user changes
  useEffect(() => {
    loadGoals()
  }, [loadGoals])

  // Add a new goal
  const handleAddGoal = useCallback(
    async (goalData) => {
      if (!user?.id) {
        setError("User not authenticated")
        return
      }

      try {
        setError(null)
        await goalService.createGoal({ ...goalData, user_id: user.id })
        await loadGoals()
      } catch (err) {
        console.error("Error adding goal:", err)
        setError(err.message)
        throw err
      }
    },
    [user?.id, loadGoals],
  )

  // Update a goal
  const handleUpdateGoal = useCallback(
    async (goalId, updates) => {
      if (!user?.id) {
        setError("User not authenticated")
        return
      }

      try {
        setError(null)
        await goalService.updateGoal(goalId, updates)
        await loadGoals()
      } catch (err) {
        console.error("Error updating goal:", err)
        setError(err.message)
        throw err
      }
    },
    [user?.id, loadGoals],
  )

  // Delete a goal
  const handleDeleteGoal = useCallback(
    async (goalId) => {
      if (!user?.id) {
        setError("User not authenticated")
        return
      }

      try {
        setError(null)
        await goalService.deleteGoal(goalId)
        await loadGoals()
      } catch (err) {
        console.error("Error deleting goal:", err)
        setError(err.message)
        throw err
      }
    },
    [user?.id, loadGoals],
  )

  // Complete a goal
  const handleCompleteGoal = useCallback(
    async (goalId) => {
      if (!user?.id) {
        setError("User not authenticated")
        return
      }

      try {
        setError(null)
        await goalService.completeGoal(goalId)
        await loadGoals()
      } catch (err) {
        console.error("Error completing goal:", err)
        setError(err.message)
        throw err
      }
    },
    [user?.id, loadGoals],
  )

  // Refresh goals
  const refreshGoals = useCallback(async () => {
    await loadGoals()
  }, [loadGoals])

  return {
    goals,
    loading,
    error,
    handleAddGoal,
    handleUpdateGoal,
    handleDeleteGoal,
    handleCompleteGoal,
    refreshGoals,
  }
}

export default useGoals
