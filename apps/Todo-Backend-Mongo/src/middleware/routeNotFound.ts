import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.js";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new ApiError(404, `Route not found - ${req.originalUrl}`));
};
