import { Router } from "express";
import { TodoContoller } from "../controller/todo.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  todoIdSchema,
  todoSchema,
  updatePrioritySchema,
  updateTodoSchema,
} from "../validators/todo.schema.js";

const router = Router();
const todoController = new TodoContoller();

router.post(
  "/createTodo",
  validateRequest(todoSchema),
  todoController.createTodo
);

router.delete(
  "/deleteTodo/:id",
  validateRequest(todoIdSchema),
  todoController.deleteTodo
);
router.patch(
  "/toggleCompleteTodo/:id",
  validateRequest(todoIdSchema),
  todoController.toggleCompletion
);

router.patch(
  "/updateTodoPriority/:id",
  validateRequest(updatePrioritySchema),
  todoController.updataPriority
);
router.patch(
  "/updateTodo/:id",
  validateRequest(updateTodoSchema),
  todoController.updateTodo
);
router.get(
  "/getTodo/:id",
  validateRequest(todoIdSchema),
  todoController.getTodo
);
router.get("/getAllTodos", todoController.getAllTodo);
export default router;
