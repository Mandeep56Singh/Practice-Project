import cookieParser from "cookie-parser";
import cors from "cors"; // <-- Enable CORS
import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler.js";
import httpLogger from "./middleware/httpLogger.js";
import { routeNotFound } from "./middleware/routeNotFound.js";
import authRouter from "./routes/auth.routes.js";
import healthRouter from "./routes/health.routes.js";
import todoRouter from "./routes/todo.routes.js";
import logger from "./utils/logger.js";
import deserializeUser from "./middleware/deserailzeUser.js";
import requireAuth from "./middleware/requireAuth.js";
const app = express();
const PORT = process.env.PORT || 3000;
import agenda from "./jobs/agenda.js";

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(httpLogger);
app.use(cookieParser());


// Optional: Add a root route to avoid 404 errors on '/'
app.get("/", (_: Request, res: Response) => {
  res.status(200).send("Server is running");
});

// Routes
app.use("/health", healthRouter);
app.use("/api/auth",  authRouter);
app.use("/api/todo", deserializeUser, requireAuth ,todoRouter);


// Error handling
app.use(routeNotFound);
app.use(errorHandler);

// Start server
const host =
  process.env.NODE_ENV === "production"
    ? process.env.RENDER_EXTERNAL_HOSTNAME ||
      "https://todo-backend-mongo.onrender.com"
    : `localhost:${PORT}`;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://${host}`);
});

// scheduly delete the refresh tokens
(async () => {
  try {
    await agenda.start();
    logger.info("📅 Agenda jobs started successfully!");
  } catch (error) {
    logger.error("❌ Failed to start Agenda:", error);
  }
})();

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => process.exit(1));
});
