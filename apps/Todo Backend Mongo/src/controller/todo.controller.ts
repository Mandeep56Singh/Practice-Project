import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { TodoResponse } from "../dtos/todo.types.js";
import { TodoService } from "../services/todo.service.js";
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
    req: Request<todoIdType["params"], TodoResponse>,
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
      TodoResponse,
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
  updateTodo = async (
    req: Request<todoIdType["params"], {}, Partial<todoDataType["body"]>>,
    res: Response
  ): Promise<void> => {
    try {
      const data = req.body;
      const { id } = req.params;
      const updatedTodo = await this.todoService.updateTodo(id, data);
      res.status(200).json(updatedTodo);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
      }
      res.status(500).send("Internal server error");
    }
  };
  getAllTodo = async (_: Request, res: Response): Promise<void> => {
    try {
      const allTodos = await this.todoService.getAllTodos();
      res.status(200).json(allTodos);
    } catch (error) {
      console.error("Error fetching all todos:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  getTodo = async (
    req: Request<todoIdType["params"]>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getTodo(id);
      res.status(200).send(todo);
    } catch (error) {
      console.error("Error fetching todo");
      if (error instanceof NotFoundError) {
        res.status(404).send({ error: error.message });
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  };
}
