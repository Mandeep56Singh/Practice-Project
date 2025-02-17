import { pino } from "pino";

// Create a Pino logger instance
const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          },
        }
      : undefined, // Use JSON logs in production
});

export default logger;
