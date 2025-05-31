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
    })

    return () => subscription.unsubscribe()
  }, [])

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
      // Handle demo user logout
      if (user?.id === "demo-user-123") {
        setUser(null)
        setIsAuthenticated(false)
        return
      }

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
            username: userData.username,
            birthdate: userData.birthdate,
          },
        },
      })

      if (error) throw error

      // Check if user needs to confirm their email
      if (data?.user && !data?.session) {
        return {
          success: true,
          data,
          message: "Please check your email to confirm your account.",
        }
      }

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
