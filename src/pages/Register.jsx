"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import FullLogo from "../assets/icons/FullLogo.svg"
import ViewIcon from "../assets/icons/view.svg"
import CalendarIcon from "../assets/icons/calendar.svg"

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { success, error } = await register({
        email: form.email,
        password: form.password,
        username: form.username,
        birthdate: form.birthdate,
      })

      if (success) {
        navigate("/dashboard")
      } else {
        setError(error || "Registration failed. Please try again.")
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="w-[1124px] h-[1242px] left-[30%] top-[-90%] absolute bg-gradient-to-b from-green-400 to-green-300/50 blur-[100px] -z-20" />
      <div className="w-[1072px] h-[1143px] left-[30%] top-[80%] absolute bg-gradient-to-b from-indigo-900 to-purple-700/60 blur-[50px] -z-10" />
      <div className="w-[1016px] h-[613px] left-[130%] top-[20%] absolute origin-top-left rotate-[57.27deg] bg-gradient-to-b from-yellow-300 to-amber-200/30 blur-[53px] -z-10" />

      {/* Section 1: Top logo section with large title area */}
      <header className="w-full py-8 px-4 relative z-10">
        {/* Blurred frame with low opacity */}
        <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm shadow-md"></div>

        {/* Content container */}
        <div className="max-w-7xl w-full px-6 flex items-center relative">
          {/* Logo positioned to left side with padding */}
          <div className="pl-2">
            <img src={FullLogo || "/placeholder.svg"} alt="QuestLab" className="h-12 md:h-16" />
          </div>
        </div>
      </header>

      {/* Left side white overlay */}
      <div className="w-[60%] h-full left-0 top-0 absolute opacity-60 bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.42)] blur -z-10" />

      {/* Two column layout - left column (hero text) */}
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mt-32">
          <div className="max-w-[629px] mb-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 leading-tight [text-shadow:_1px_2px_2px_rgb(23_18_92_/_0.44)]">
              Ready to Begin
            </h1>
            <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 leading-tight mt-2">Your Adventure?</h1>
            <p className="mt-6 text-xl font-medium text-indigo-900">
              Create your adventurer profile and start conquering your tasks
            </p>
          </div>
        </div>

        {/* Right column (registration form) */}
        <div className="w-full md:w-2/5 mt-8 md:mt-32">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/80 p-6 rounded-xl shadow-md">
            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-indigo-900 text-base font-normal">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            {/* Password field with toggle icon */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-indigo-900 text-base font-normal">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••••"
                  className="w-full h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10"
                >
                  <img className="w-5 h-5" src={ViewIcon || "/placeholder.svg"} alt="Toggle password" />
                </button>
              </div>
            </div>
            {/* Username field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-indigo-900 text-base font-normal">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            {/* Birthdate field with calendar icon */}
            <div className="flex flex-col gap-2">
              <label htmlFor="birthdate" className="text-indigo-900 text-base font-normal">
                Birthdate
              </label>
              <div className="relative">
                <input
                  id="birthdate"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text"
                  }}
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleChange}
                  required
                  placeholder="MM/DD/YYYY"
                  className="w-full h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 pr-12 appearance-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center justify-center w-10 pointer-events-none">
                  <img src={CalendarIcon || "/placeholder.svg"} alt="Calendar" className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 px-5 py-2 bg-indigo-900 text-white rounded-xl shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)] font-medium hover:bg-indigo-800 transition-colors duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Register"
                )}
              </button>

              <p className="text-center">
                <span className="text-indigo-900 text-xs font-light">Already have an account? </span>
                <Link to="/login" className="text-indigo-900 text-xs font-bold hover:text-indigo-700">
                  Sign-in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
