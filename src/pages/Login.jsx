import { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">{isLogin ? "Login" : "Register"}</h2>
      <form>
        <input
          placeholder="Email"
          className="block border p-2 mb-2 w-full"
        />
        <input
          placeholder="Password"
          type="password"
          className="block border p-2 mb-2 w-full"
        />
        {!isLogin && (
          <input
            placeholder="Confirm Password"
            type="password"
            className="block border p-2 mb-2 w-full"
          />
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-blue-500 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Login;