import { Request, Response, Router } from "express";
import { createTodo } from "../controller/todo.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createTodoSchema } from "../zod schema/todo.schema.js";

const router = Router();

router.post("/createTodo", validateRequest(createTodoSchema), createTodo);

export default router;
