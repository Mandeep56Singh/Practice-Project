import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import NotFoundError from "../utils/NotFoundError.js";
import {
  todoDataType,
  todoIdType,
  UpdatePriorityType,
} from "../validators/todo.schema.js";

export class TodoContoller {
  private todoService = new TodoService();

  createTodo = async (
    req: Request<{}, {}, todoDataType["body"]>,
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
    req: Request<todoIdType["params"]>,
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

  toggleCompletion = async (
    req: Request<todoIdType["params"], TodoResponseTypes>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedTodo = await this.todoService.toggleCompletionTodo(id);
      res.status(200).json(updatedTodo);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
  updataPriority = async (
    req: Request<
      UpdatePriorityType["params"],
      TodoResponseTypes,
      UpdatePriorityType["body"]
    >,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { priority } = req.body;
      const todo = await this.todoService.updateTodoPriority(id, priority);
      res.status(200).json(todo);
    } catch (error) {
      if (error instanceof NotFoundError) {
      }
    }
  };
}
