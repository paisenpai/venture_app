"use client"

import { useState, useEffect } from "react"
import { useStreaks } from "./useDatabase"

export const useStreakChart = () => {
  const { streakData, currentStreak, loading } = useStreaks()
  const [chartPoints, setChartPoints] = useState([])
  const [chartPath, setChartPath] = useState("")

  useEffect(() => {
    if (streakData && streakData.length > 0) {
      // Convert streak data to chart points
      const points = streakData.map((entry, index) => {
        // Scale the tasks completed to a reasonable height (0-160)
        const y = 160 - Math.min(entry.tasks * 40, 160)
        // Space points evenly
        const x = index * (300 / (streakData.length - 1))
        return { x, y, date: entry.date, tasks: entry.tasks }
      })

      setChartPoints(points)

      // Create SVG path
      const path = points.map((point, index) => (index === 0 ? "M" : "L") + `${point.x},${point.y}`).join(" ")

      setChartPath(path)
    } else {
      // Default chart if no data
      const defaultPoints = [
        { x: 0, y: 160 },
        { x: 50, y: 110 },
        { x: 100, y: 90 },
        { x: 150, y: 140 },
        { x: 200, y: 60 },
        { x: 250, y: 130 },
        { x: 300, y: 30 },
        { x: 350, y: 100 },
      ]

      setChartPoints(defaultPoints)

      const defaultPath = defaultPoints
        .map((point, index) => (index === 0 ? "M" : "L") + `${point.x},${point.y}`)
        .join(" ")

      setChartPath(defaultPath)
    }
  }, [streakData])

  return {
    chartPoints,
    chartPath,
    currentStreak,
    loading,
  }
}
