import express from "express";
import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import jobRoutes from "./routes/job.routes";
import chatRoutes from "./routes/chatbot.routes";
import applicationRoutes from "./routes/application.routes";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI || "";

const allowedOrigins = ["http://localhost:5173", "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);

// Add body parser middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err: Error) => console.error("Couldn't connect to MongoDB", err));

// Routes
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/applications", applicationRoutes);

// Start the server
server.listen(port, () => {
  console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
});
