// Import required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Define the port (default to 5000 if not specified in .env)
const port = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();

// Middleware setup
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)

// Define API routes
app.use("/api/users", userRoute); // Routes for user authentication and management

// Root route to check if the server is running
app.get("/", (req, res) => {
  res.json("server started");
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`server started at ${port}`));
