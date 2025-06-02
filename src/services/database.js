import { supabase } from "../lib/supabase"

// Quest operations
export const questService = {
  async getQuests(userId) {
    const { data, error } = await supabase
      .from("quests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async createQuest(userId, questData) {
    const { data, error } = await supabase
      .from("quests")
      .insert([{ ...questData, user_id: userId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateQuest(questId, updates) {
    const { data, error } = await supabase.from("quests").update(updates).eq("id", questId).select().single()

    if (error) throw error
    return data
  },

  async deleteQuest(questId) {
    const { error } = await supabase.from("quests").delete().eq("id", questId)

    if (error) throw error
  },
}

// Subtask operations
export const subtaskService = {
  async getSubtasks(userId) {
    const { data, error } = await supabase
      .from("subtasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async createSubtask(userId, questId, subtaskData) {
    const { data, error } = await supabase
      .from("subtasks")
      .insert([{ ...subtaskData, user_id: userId, quest_id: questId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateSubtask(subtaskId, updates) {
    const { data, error } = await supabase.from("subtasks").update(updates).eq("id", subtaskId).select().single()

    if (error) throw error
    return data
  },

  async deleteSubtask(subtaskId) {
    const { error } = await supabase.from("subtasks").delete().eq("id", subtaskId)

    if (error) throw error
  },
}

// User stats operations
export const userStatsService = {
  async getUserStats(userId) {
    const { data, error } = await supabase.from("user_stats").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  },

  async updateUserStats(userId, updates) {
    const { data, error } = await supabase.from("user_stats").update(updates).eq("id", userId).select().single()

    if (error) throw error
    return data
  },

  async addXP(userId, xpAmount) {
    const stats = await this.getUserStats(userId)
    const newTotalXP = stats.total_xp + xpAmount
    const newCurrentXP = stats.current_xp + xpAmount

    // Calculate new level (simple formula: level = floor(totalXP / 100) + 1)
    const newLevel = Math.floor(newTotalXP / 100) + 1

    return await this.updateUserStats(userId, {
      current_xp: newCurrentXP,
      total_xp: newTotalXP,
      level: newLevel,
      tasks_completed: stats.tasks_completed + 1,
    })
  },
}

// Profile operations
export const profileService = {
  async getProfile(userId) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

    if (error) throw error
    return data
  },
}

// Achievement operations
export const achievementService = {
  async getAllAchievements() {
    const { data, error } = await supabase.from("achievements").select("*").order("category", { ascending: true })

    if (error) throw error
    return data || []
  },

  async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from("user_achievements")
      .select(`
        *,
        achievements (*)
      `)
      .eq("user_id", userId)

    if (error) throw error
    return data || []
  },

  async unlockAchievement(userId, achievementId) {
    const { data, error } = await supabase
      .from("user_achievements")
      .insert([{ user_id: userId, achievement_id: achievementId }])
      .select()
      .single()

    if (error && error.code !== "23505") throw error // Ignore duplicate key errors
    return data
  },
}

// Streak operations
export const streakService = {
  async updateStreak(userId, date = new Date(), category = null) {
    const dateStr = date.toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("user_streaks")
      .upsert(
        [
          {
            user_id: userId,
            date: dateStr,
            tasks_completed: 1,
            category,
          },
        ],
        {
          onConflict: "user_id,date,category",
        },
      )
      .select()

    if (error) throw error
    return data
  },

  async getCurrentStreak(userId) {
    const { data, error } = await supabase
      .from("user_streaks")
      .select("date")
      .eq("user_id", userId)
      .order("date", { ascending: false })

    if (error) throw error

    if (!data || data.length === 0) return 0

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < data.length; i++) {
      const streakDate = new Date(data[i].date)
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)

      if (streakDate.getTime() === expectedDate.getTime()) {
        streak++
      } else {
        break
      }
    }

    return streak
  },
}
