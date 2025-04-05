// // Import required modules
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoute from "./routes/userRoute.js";
// import mailRoute from "./routes/mailRoute.js";

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Define the port (default to 5000 if not specified in .env)
// const port = process.env.PORT || 5000;

// // Connect to MongoDB database
// connectDB();

// // Middleware setup
// app.use(express.json()); // Allows parsing of JSON request bodies
// app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)

// // Define API routes
// app.use("/api/users", userRoute); // Routes for user authentication and management
// app.use("/sendmail", mailRoute);
// // Root route to check if the server is running
// app.get("/", (req, res) => {
//   res.json("server started");
// });

// // Start the server and listen on the specified port
// app.listen(port, () => console.log(`server started at ${port}`));

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Agenda from "agenda";

import connectDB from "./config/db.js";
import sequenceRoutes from "./routes/sequence.js";
import leadRoutes from "./routes/Leads.js";
import defineJobs from "./job/agenda.js"; // ✅ Add this line (correct path to your job file)

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Agenda Setup
const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "jobs" },
  processEvery: process.env.AGENDA_PROCESS_EVERY || "1 minute",
});
app.locals.agenda = agenda;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ API Routes
app.use("/api/sequences", sequenceRoutes);
app.use("/api/leads", leadRoutes);

// ✅ Start Agenda & Server
agenda.on("ready", async () => {
  defineJobs(agenda); // ✅ Register your Agenda jobs
  await agenda.start(); // ✅ Start processing
  console.log("✅ Agenda is connected and ready!");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
