"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          navigate("/login?error=auth_callback_failed")
          return
        }

        if (data.session) {
          console.log("Auth callback successful, redirecting to dashboard")
          navigate("/dashboard")
        } else {
          console.log("No session found, redirecting to login")
          navigate("/login")
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        navigate("/login?error=unexpected_error")
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}

export default AuthCallback
