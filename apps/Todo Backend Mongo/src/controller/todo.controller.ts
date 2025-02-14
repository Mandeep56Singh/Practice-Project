import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";
import {
  CreateTodoRequestType,
  deleteTodoParmamType,
} from "../validators/todo.schema.js";

export class TodoContoller {
  private todoService = new TodoService();

  createTodo = async (
    req: Request<{}, {}, CreateTodoRequestType["body"]>,
    res: Response
  ): Promise<void> => {
    try {
      const data = req.body;
      const todo = await this.todoService.createTodo(data);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internval Server Error" });
    }
  };
  deleteTodo = async (
    req: Request<deleteTodoParmamType["params"]>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // Prisma Error P2025: Record not found
        res.status(404).json({ error: "Todo not found" });
      } else {
        // General server error
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
