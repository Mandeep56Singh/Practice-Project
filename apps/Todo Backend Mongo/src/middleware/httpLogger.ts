import { Request } from "express";
import { IncomingMessage, ServerResponse } from "http";
import { pino } from "pino";
import { pinoHttp } from "pino-http";
import logger from "../utils/logger.js";

const httpLogger = pinoHttp({
  logger,
  genReqId: (req: IncomingMessage): string =>
    (req.headers["x-request-id"] as string) || Date.now().toString(),

  customLogLevel: (
    req: IncomingMessage,
    res: ServerResponse,
    error?: Error
  ): pino.Level => {
    if (error) return "error";
    if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
    if (res.statusCode >= 500) return "error";
    return "info";
  },

  serializers: {
    req: (req: IncomingMessage) => ({
      method: req.method,
      url: req.url,
      headers: {
        ...req.headers,
        authorization: "[REDACTED]", // Redact sensitive headers
      },
    }),
    res: (res: ServerResponse) => ({
      statusCode: res.statusCode,
    }),
  },
});

export default httpLogger;
