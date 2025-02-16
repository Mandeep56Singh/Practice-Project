import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../utils/apiError.js";

type ErrorResponse = {
  success: false;
  message: string;
  details?: any;
  stack?: string;
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let details: any = undefined;

  // Handle different error types
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    details = err.errors;
  } else if (err instanceof PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = `Duplicate field value: ${err.meta?.target}`;
        break;
      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;
      default:
        message = "Database error";
        break;
    }
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log using the request logger
  req.log.error({
    err,
    statusCode,
    url: req.originalUrl,
    method: req.method,
  }, message);

  res.status(statusCode).json({
    success: false,
    message,
    details,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
