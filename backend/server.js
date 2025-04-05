import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Agenda from "agenda";

import connectDB from "./config/db.js";
import sequenceRoutes from "./routes/sequence.js";
import leadRoutes from "./routes/Leads.js";
import defineJobs from "./job/agenda.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//  Connect to MongoDB
connectDB();

// Agenda Setup
const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: "jobs" },
  processEvery: process.env.AGENDA_PROCESS_EVERY || "1 minute",
});
app.locals.agenda = agenda;

//  Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/sequences", sequenceRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/users", userRoute);

// Start Agenda & Server
agenda.on("ready", async () => {
  defineJobs(agenda);
  await agenda.start();
  console.log("Agenda is connected and ready!");
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});
