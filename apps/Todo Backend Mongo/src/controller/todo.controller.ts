import { Request, Response } from "express";
import { TodoResponse } from "../dtos/todo.types.js";
import { TodoService } from "../services/todo.service.js";
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
    const data = req.body;
    const todo = await this.todoService.createTodo(data);
    res.status(201).json(todo);
  };

  deleteTodo = async (
    req: Request<todoIdType["params"]>,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    await this.todoService.deleteTodo(id);
    res.status(204).send();
  };

  toggleCompletion = async (
    req: Request<todoIdType["params"], TodoResponse>,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const updatedTodo = await this.todoService.toggleCompletionTodo(id);
    res.status(200).json(updatedTodo);
  };
  updataPriority = async (
    req: Request<
      UpdatePriorityType["params"],
      TodoResponse,
      UpdatePriorityType["body"]
    >,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { priority } = req.body;
    const todo = await this.todoService.updateTodoPriority(id, priority);
    res.status(200).json(todo);
  };
  updateTodo = async (
    req: Request<todoIdType["params"], {}, Partial<todoDataType["body"]>>,
    res: Response
  ): Promise<void> => {
    const data = req.body;
    const { id } = req.params;
    const updatedTodo = await this.todoService.updateTodo(id, data);
    res.status(200).json(updatedTodo);
  };
  getAllTodo = async (_: Request, res: Response): Promise<void> => {
    const allTodos = await this.todoService.getAllTodos();
    res.status(200).json(allTodos);
  };
  getTodo = async (
    req: Request<todoIdType["params"]>,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const todo = await this.todoService.getTodo(id);
    res.status(200).send(todo);
  };
}
