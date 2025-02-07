"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const chatbot_routes_1 = __importDefault(require("./routes/chatbot.routes"));
const application_routes_1 = __importDefault(
  require("./routes/application.routes")
);
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI || "";
const allowedOrigins = ["http://localhost:5173", "http://localhost:5173"];
app.use(
  (0, cors_1.default)({
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
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Couldn't connect to MongoDB", err));
// Routes
app.use("/api", user_routes_1.default);
app.use("/api", job_routes_1.default);
app.use("/api/chat", chatbot_routes_1.default);
app.use("/api/applications", application_routes_1.default);
// Start the server
server.listen(port, () => {
  console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
});
//# sourceMappingURL=App.js.map
