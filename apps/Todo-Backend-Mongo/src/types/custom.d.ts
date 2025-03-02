import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Payloadtype } from "../dtos/todo.types.js";
declare global {
  namespace Express {
    interface Response {
      locals: {
        user: Payloadtype;
      };
    }
  }
}
