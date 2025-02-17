import "dotenv/config";
import express, { Request, Response } from "express";
import "express-async-errors";
import todoRouter from "./routes/todo.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import httpLogger from "./middleware/httpLogger.js";
import { routeNotFound } from "./middleware/routeNotFound.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(httpLogger);

// Health check endpoint
app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "Ok" });
});

// Routes
app.use("/api/todo", todoRouter);

// Error handling
app.use(routeNotFound);
app.use(errorHandler);


// Start server
const host =
  process.env.NODE_ENV === "production"
    ? process.env.RENDER_EXTERNAL_HOSTNAME || "your-deployed-url.com"
    : `localhost:${PORT}`;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://${host}`);
});

// Graceful Shutdown: Handle Uncaught Exceptions & Unhandled Rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  server.close(() => process.exit(1)); // Close server, then exit
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => process.exit(1)); // Close server, then exit
});