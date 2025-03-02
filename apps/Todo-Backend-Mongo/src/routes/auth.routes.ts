import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import deserializeUser from "../middleware/deserailzeUser.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema } from "../validators/login.schema.js";
import { createUserSchema } from "../validators/user.schema.js";

const authRouter = Router();
const userController = new UserController();
authRouter.post(
  "/register",

  validateRequest(createUserSchema),
  userController.createUser
);

// Don't touch it
authRouter.use(deserializeUser);

authRouter.post("/login", validateRequest(loginSchema), userController.login);
authRouter.post("/logout", userController.logout);
export default authRouter;
