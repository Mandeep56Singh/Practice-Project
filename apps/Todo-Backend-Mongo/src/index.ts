import cors from "cors"; // <-- Enable CORS
import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler.js";
import httpLogger from "./middleware/httpLogger.js";
import { routeNotFound } from "./middleware/routeNotFound.js";
import todoRouter from "./routes/todo.routes.js";
import { healthCheck } from "./utils/heathCheck.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(httpLogger);

// Optional: Add a root route to avoid 404 errors on '/'
app.get("/", (_: Request, res: Response) => {
  res.status(200).send("Server is running");
});

// Routes
app.get("/health", healthCheck);
app.use("/api/todo", todoRouter);

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

// Graceful Shutdown: Handle Uncaught Exceptions & Unhandled Rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => process.exit(1));
});
