import { Request, Response } from "express";
import prisma from "../config/prisma.js";

export class HealthController {
  healthCheckServer = async (req: Request, res: Response) => {
    res.status(200).json({ status: "Ok" });
  };
  healthCheckDB = async (req: Request, res: Response) => {
    await prisma.$runCommandRaw({ ping: 1 }); // Test DB connection
    req.log.info("✅ Database connection successful");
    res.status(200).json({ status: "✅ Healthy", db: "Connected" });
  };
}
