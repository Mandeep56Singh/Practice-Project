import { Request, Response, Router } from "express";
import { createTodo } from "../controller/todo.controller.js";

const router = Router();

router.post("/createTodo", createTodo);

export default router;
