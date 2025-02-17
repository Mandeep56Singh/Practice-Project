import { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const healthCheck = async (req: Request, res: Response) => {
  await prisma.$runCommandRaw({ ping: 1 }); // Test DB connection
  req.log.info("✅ Database connection successful");

  res.status(200).json({ status: "✅ Healthy", db: "Connected" });
};
