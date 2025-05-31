"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const placeholderLogo = "https://placehold.co/56x56"
const placeholderLogoText = "https://placehold.co/140x40?text=QuestLab"

function Login() {
  const navigate = useNavigate()
  const { login, signInWithGoogle, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login(email, password)
      if (result.success) {
        navigate("/dashboard")
      } else {
        setError(result.error || "Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError("")

    try {
      const result = await signInWithGoogle()
      if (!result.success) {
        setError(result.error || "Google sign in failed. Please try again.")
      }
      // Note: For OAuth, the redirect happens automatically
    } catch (err) {
      console.error("Google login error:", err)
      setError("An error occurred during Google sign in. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await login("demo@example.com", "demopassword")
      if (result.success) {
        navigate("/dashboard")
      } else {
        setError("Demo login failed. Please try again.")
      }
    } catch (err) {
      console.error("Demo login error:", err)
      setError("An error occurred during demo login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="w-[1016px] h-[613.40px] left-[80%] top-[-30%] absolute origin-top-left rotate-[57.27deg] bg-gradient-to-b from-yellow-300 to-amber-200/30 blur-[52.75px] -z-10" />
      <div className="w-[829px] h-[983px] left-[-20%] top-[60%] absolute bg-gradient-to-b from-indigo-900 to-purple-700/60 blur-[50px] -z-10" />
      <div className="w-[802px] h-[1069px] left-[70%] top-[80%] absolute bg-gradient-to-b from-green-400 to-green-300/50 blur-[100px] -z-10" />

      {/* Header */}
      <header className="w-full py-8 px-4 relative bg-white bg-opacity-70 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
              <img
                className="w-14 h-14 rounded-xl shadow-[1px_1px_3px_0px_rgba(38,33,110,0.64)]"
                src={placeholderLogo || "/placeholder.svg"}
                alt="Logo"
              />
            </div>
            <img className="h-10" src={placeholderLogoText || "/placeholder.svg"} alt="QuestLab" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 py-8 md:py-16 gap-8 md:gap-16">
        {/* Left column: Tagline */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-6xl font-extrabold text-indigo-900 [text-shadow:_1px_2px_2px_rgb(23_18_92_/_0.44)]">
              Ready to slay <br />
              your next <span className="text-indigo-700">Quest</span>?
            </h2>
            <p className="text-xl font-medium text-indigo-900 mt-6">Sign in to continue your productivity adventure</p>
          </div>
        </div>

        {/* Right column: Sign in form */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 bg-white bg-opacity-70 p-8 rounded-2xl shadow-lg"
            >
              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700" role="alert">
                  <p>{error}</p>
                </div>
              )}

              {/* Form fields */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-indigo-900 text-base font-normal">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 w-full"
                    />
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-indigo-900 text-base font-normal">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 w-full"
                    />
                  </div>
                </div>

                {/* Remember me and forgot password */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 bg-white rounded border border-zinc-300"
                    />
                    <label htmlFor="remember-me" className="text-indigo-900 text-base font-light">
                      Remember Me
                    </label>
                  </div>
                  <a href="#" className="text-indigo-900 text-base font-bold">
                    Forgot Password
                  </a>
                </div>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="h-11 px-5 py-2 bg-indigo-900 rounded-xl shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)] flex justify-center items-center transition-colors duration-200 hover:bg-indigo-800 disabled:opacity-50"
              >
                <span className="text-white text-base font-medium">{isLoading ? "Signing in..." : "Sign in"}</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-0.5 bg-zinc-200 flex-grow"></div>
                <p className="text-zinc-400 text-base font-bold">or</p>
                <div className="h-0.5 bg-zinc-200 flex-grow"></div>
              </div>

              {/* Google OAuth button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="h-11 px-3 py-2 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center gap-2 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-indigo-900 text-sm font-medium">
                  {isGoogleLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>

              {/* Demo login button */}
              <button
                onClick={handleDemoLogin}
                type="button"
                disabled={isLoading || isGoogleLoading}
                className="h-11 px-5 py-2 bg-gray-100 rounded-xl flex justify-center items-center hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
              >
                <span className="text-indigo-900 text-sm font-medium">
                  {isLoading ? "Logging in..." : "Try Demo Account"}
                </span>
              </button>

              {/* Register link */}
              <p className="text-center">
                <span className="text-indigo-900 text-xs font-light">Don't have an account? </span>
                <Link to="/register" className="text-indigo-900 text-xs font-bold">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
