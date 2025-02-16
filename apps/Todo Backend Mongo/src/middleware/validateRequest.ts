import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.log.info(
        {
          requestId: req.headers["x-request-id"],
          url: req.url,
          method: req.method,
        },
        "Request validation passed"
      );

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        req.log.warn(
          {
            requestId: req.headers["x-request-id"],
            url: req.url,
            method: req.method,
            errors: err.errors,
          },
          "Request validation failed"
        );

        res.status(400).json({
          success: false,
          errors: err.errors,
        });
      } else {
        req.log.error(
          {
            requestId: req.headers["x-request-id"],
            url: req.url,
            method: req.method,
          },
          "Internal Server Error"
        );

        res.status(500).json({ message: "Internal Server Error" });
      }
      return;
    }
  };
