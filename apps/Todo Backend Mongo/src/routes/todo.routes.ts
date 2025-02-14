import { Router } from "express";
import { TodoContoller } from "../controller/todo.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createTodoSchema,
  deleteTodoSchema,
} from "../validators/todo.schema.js";

const router = Router();
const todoController = new TodoContoller();

router.post(
  "/createTodo",
  validateRequest(createTodoSchema),
  todoController.createTodo
);

router.delete(
  "/deleteTodo/:id",
  validateRequest(deleteTodoSchema),
  todoController.deleteTodo
);

export default router;
