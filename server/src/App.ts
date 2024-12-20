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

// Define CORS options
const corsOptions = {
  origin: [
    'https://job-portal-three-bice.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 
};

// Add CORS middleware before routes
app.use(cors(corsOptions));

// Add OPTIONS handling for preflight requests
app.options('*', cors(corsOptions));

// Add security headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

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

// Add error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/applications", applicationRoutes);

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