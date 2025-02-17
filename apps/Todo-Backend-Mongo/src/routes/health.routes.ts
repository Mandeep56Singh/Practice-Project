import { Router } from "express";
import { HealthController } from "../controller/health.controller.js";

const router = Router();
const healthController = new HealthController();
router.get("/server", healthController.healthCheckServer);
router.get("/db", healthController.healthCheckDB);

export default router;
