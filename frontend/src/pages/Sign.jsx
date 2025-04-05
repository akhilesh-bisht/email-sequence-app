import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup({ email, password });
      setMessage("Signup successful. Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded transition"
        >
          Signup
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-green-600">{message}</p>
        )}

        {/* Link to Login */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
