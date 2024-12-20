import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import jobRoutes from "./routes/job.routes";
import chatRoutes from "./routes/chatbot.routes";
import applicationRoutes from "./routes/application.routes";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI || "";

// Add CORS middleware before routes
app.use(
  cors({
    origin: "https://job-portal-three-bice.vercel.app", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add body parser middleware
app.use(express.json());

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err: Error) => console.error("Couldn't connect to MongoDB", err));

// Start the server
server.listen(port, () => {
  console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Add after your middleware setup
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/applications", applicationRoutes);
