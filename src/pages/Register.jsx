import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Replacing actual images with placeholders
const placeholderLogo = "https://placehold.co/56x56";
const placeholderLogoText = "https://placehold.co/140x40?text=QuestLab";
const placeholderCalendarIcon = "https://placehold.co/20x20?text=📅";
const placeholderPasswordIcon = "https://placehold.co/20x20?text=👁️";
const placeholderHeroImage = "https://placehold.co/592x592";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Replace backend registration with frontend-only simulation
    setTimeout(() => {
      // Simply navigate to dashboard after a delay to simulate successful registration
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="left-[80%] top-[60%] absolute origin-top-left rotate-[10.10deg] opacity-50 blur -z-10">
        <img
          className="w-[592px] h-[592px]"
          src={placeholderHeroImage}
          alt="Hero"
        />
      </div>
      <div className="w-[1124px] h-[1242px] left-[30%] top-[-90%] absolute bg-gradient-to-b from-green-400 to-green-300/50 blur-[100px] -z-20" />
      <div className="w-[1072px] h-[1143px] left-[30%] top-[80%] absolute bg-gradient-to-b from-indigo-900 to-purple-700/60 blur-[50px] -z-10" />
      <div className="w-[1016px] h-[613px] left-[130%] top-[20%] absolute origin-top-left rotate-[57.27deg] bg-gradient-to-b from-yellow-300 to-amber-200/30 blur-[53px] -z-10" />

      {/* Header divider */}
      <div className="w-full h-px left-0 top-[168px] absolute outline outline-1 outline-offset-[-0.5px] outline-black/40 blur-[2px]"></div>

      {/* Left side white overlay */}
      <div className="w-[60%] h-full left-0 top-0 absolute opacity-60 bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.42)] blur -z-10" />

      {/* Logo area */}
      <div className="left-[101px] top-[54px] absolute inline-flex items-center gap-5">
        <div className="rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
          <img
            className="w-14 h-14 rounded-xl shadow-[1px_1px_3px_0px_rgba(38,33,110,0.64)]"
            src={placeholderLogo}
            alt="Logo"
          />
        </div>
        <div className="w-36 h-14 flex items-center">
          <img className="h-10" src={placeholderLogoText} alt="QuestLab" />
        </div>
      </div>

      {/* Two column layout - left column (hero text) */}
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 mt-32">
          <div className="max-w-[629px] mb-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 leading-tight [text-shadow:_1px_2px_2px_rgb(23_18_92_/_0.44)]">
              Ready to Begin Your Adventure?
            </h1>
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <label
                htmlFor="password"
                className="text-indigo-900 text-base font-normal"
              >
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
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <img
                    className="w-5 h-5"
                    src={placeholderPasswordIcon}
                    alt="Toggle password"
                  />
                </button>
              </div>
            </div>

            {/* Username field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-indigo-900 text-base font-normal"
              >
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
              <label
                htmlFor="birthdate"
                className="text-indigo-900 text-base font-normal"
              >
                Birthdate
              </label>
              <div className="relative">
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <img
                    className="w-5 h-5"
                    src={placeholderCalendarIcon}
                    alt="Calendar"
                  />
                </div>
              </div>
            </div>

            {/* Register button and sign-in link */}
            <div className="mt-6 flex flex-col items-center gap-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 px-5 py-2 bg-indigo-900 text-white rounded-xl shadow-[0px_2px_3px_0px_rgba(0,0,0,0.25)] font-medium hover:bg-indigo-800 transition-colors duration-200"
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>

              <p className="text-center">
                <span className="text-indigo-900 text-xs font-light">
                  Already have an account?{" "}
                </span>
                <Link to="/login" className="text-indigo-900 text-xs font-bold">
                  Sign-in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
