import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { email, password });

      setMessage("Signup successful. Redirecting...");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Signup button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Signup
        </button>

        {/* Link to login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-500">
            Login
          </Link>
        </p>

        {/* Show signup message */}
        {message && (
          <p className="text-center mt-2 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
