import { Request, Response } from "express";
import { createTodoHandler } from "../services/createTodo.service.js";
import { TodoRequestTypes, TodoResponseTypes } from "../types/todo.types.js";

export const createTodo = async (req: TodoRequestTypes, res: Response) => {
  try {
    const todo = await createTodoHandler(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internval Server Error" });
  }
};
