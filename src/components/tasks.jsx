"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getTasks() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          setTasks(data)
        }
      } catch (error) {
        console.error("Error fetching tasks:", error)
        setError("Failed to fetch tasks")
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [])

  if (loading) return <div>Loading tasks...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="tasks-container">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span>Status: {task.status}</span>
                <span>XP Reward: {task.xp_reward}</span>
                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tasks
