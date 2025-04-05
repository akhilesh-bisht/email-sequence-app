import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });

      // Store token
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");

      // Navigate to main app
      navigate("/flow");
    } catch (err) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition"
        >
          Login
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-red-600">{message}</p>
        )}

        {/* Link to Signup */}
        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
