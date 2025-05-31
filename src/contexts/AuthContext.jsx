"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing auth on initial load
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsAuthenticated(!!session?.user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setIsAuthenticated(!!session?.user)
      setLoading(false)

      // Create user profile if it's a new user
      if (event === "SIGNED_IN" && session?.user) {
        await createUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Create user profile and stats when they first sign up
  const createUserProfile = async (user) => {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .single()

      if (!existingProfile) {
        // Create profile
        await supabase.from("profiles").insert({
          user_id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "New User",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        // Create user stats
        await supabase.from("user_stats").insert({
          user_id: user.id,
          current_xp: 0,
          level: 1,
          current_streak: 0,
          max_streak: 0,
          tasks_completed: 0,
          total_xp_gained: 0,
          last_active_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
        })

        // Create character stats
        await supabase.from("character_stats").insert({
          user_id: user.id,
          strength: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
          agility: 1,
          endurance: 1,
          available_stat_points: 0,
          total_stat_points: 6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        // Create user avatar
        await supabase.from("user_avatars").insert({
          user_id: user.id,
          current_theme: "default",
          unlocked_themes: ["default"],
          last_updated: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error creating user profile:", error)
    }
  }

  // Google OAuth login
  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Google sign in error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Email/password login
  const login = async (email, password) => {
    try {
      setLoading(true)

      // Special handling for demo user
      if (email === "demo@example.com" && password === "demopassword") {
        // For demo, we'll create a mock session
        const demoUser = {
          id: "demo-user-123",
          email: "demo@example.com",
          user_metadata: { full_name: "Demo User" },
        }

        setUser(demoUser)
        setIsAuthenticated(true)
        return { success: true }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.username || userData.email.split("@")[0],
          },
        },
      })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
