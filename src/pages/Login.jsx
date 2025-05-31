import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Make sure this import exists

// Replacing actual images with placeholders
const placeholderLogo = "https://placehold.co/56x56";
const placeholderLogoText = "https://placehold.co/140x40?text=QuestLab";
const placeholderGoogleIcon = "https://placehold.co/24x24?text=G";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from your auth context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the actual login function from your auth context
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed demo login function with debugging
  const handleDemoLogin = async () => {
    console.log("Demo login initiated");
    setIsDemoLoading(true);
    setError("");
    
    try {
      // Use predefined demo credentials
      const demoEmail = "demo@example.com";
      const demoPassword = "demopassword";
      
      console.log("Attempting login with demo credentials");
      
      // Call the actual login function with demo credentials
      const success = await login(demoEmail, demoPassword);
      
      console.log("Demo login result:", success);
      
      if (success) {
        console.log("Demo login successful, navigating to dashboard");
        // Add a small delay to allow state updates to complete
        setTimeout(() => navigate("/dashboard"), 100);
      } else {
        setError("Demo login failed. Please try again or contact support.");
      }
    } catch (err) {
      console.error("Demo login error:", err);
      setError("An error occurred during demo login. Please try again.");
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="w-[1016px] h-[613.40px] left-[80%] top-[-30%] absolute origin-top-left rotate-[57.27deg] bg-gradient-to-b from-yellow-300 to-amber-200/30 blur-[52.75px] -z-10" />
      <div className="w-[829px] h-[983px] left-[-20%] top-[60%] absolute bg-gradient-to-b from-indigo-900 to-purple-700/60 blur-[50px] -z-10" />
      <div className="w-[802px] h-[1069px] left-[70%] top-[80%] absolute bg-gradient-to-b from-green-400 to-green-300/50 blur-[100px] -z-10" />

      {/* Section 1: Top logo section with large title area */}
      <header className="w-full py-8 px-4 relative bg-white bg-opacity-70 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Logo and app name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
              <img
                className="w-14 h-14 rounded-xl shadow-[1px_1px_3px_0px_rgba(38,33,110,0.64)]"
                src={placeholderLogo}
                alt="Logo"
              />
            </div>
            <img className="h-10" src={placeholderLogoText} alt="QuestLab" />
          </div>
        </div>
      </header>

      {/* Section 2: Two-column layout with tagline and form */}
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 py-8 md:py-16 gap-8 md:gap-16">
        {/* Left column: Tagline */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-6xl font-extrabold text-indigo-900 [text-shadow:_1px_2px_2px_rgb(23_18_92_/_0.44)]">
              Ready to slay <br />
              your next <span className="text-indigo-700">Quest</span>?
            </h2>
            <p className="text-xl font-medium text-indigo-900 mt-6">
              Sign in to continue your productivity adventure
            </p>
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
                <div
                  className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700"
                  role="alert"
                >
                  <p>{error}</p>
                </div>
              )}

              {/* Form fields */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-indigo-900 text-base font-normal"
                    >
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
                    <label
                      htmlFor="password"
                      className="text-indigo-900 text-base font-normal"
                    >
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
                    <label
                      htmlFor="remember-me"
                      className="text-indigo-900 text-base font-light"
                    >
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
                disabled={isLoading || isDemoLoading}
                className="h-11 px-5 py-2 bg-indigo-900 rounded-xl shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)] flex justify-center items-center transition-colors duration-200 hover:bg-indigo-800"
              >
                <span className="text-white text-base font-medium">
                  {isLoading ? "Signing in..." : "Sign in"}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-0.5 bg-zinc-200 flex-grow"></div>
                <p className="text-zinc-400 text-base font-bold">or</p>
                <div className="h-0.5 bg-zinc-200 flex-grow"></div>
              </div>

              {/* Social login options - Only Google now */}
              <div className="flex flex-col gap-4">
                <p className="text-center text-indigo-900 text-xs font-normal">
                  Sign in with
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading || isDemoLoading}
                  className="h-11 px-3 py-2 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center gap-2 hover:bg-gray-50"
                >
                  <img
                    className="w-6 h-6"
                    src={placeholderGoogleIcon}
                    alt="Google"
                  />
                  <span className="text-indigo-900 text-sm font-medium">
                    Google
                  </span>
                </button>
              </div>

              {/* Register link */}
              <p className="text-center">
                <span className="text-indigo-900 text-xs font-light">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className="text-indigo-900 text-xs font-bold"
                >
                  Register
                </Link>
              </p>

              {/* Demo login button with loading state */}
              <button
                onClick={handleDemoLogin}
                type="button"
                disabled={isLoading || isDemoLoading}
                className="h-11 px-5 py-2 bg-gray-100 rounded-xl flex justify-center items-center hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="text-indigo-900 text-sm font-medium">
                  {isDemoLoading ? "Logging in..." : "Log in as Demo User"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
