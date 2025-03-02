import { Request, Response } from "express";
import { TodoDataType, TodoResponse } from "../dtos/todo.types.js";
import { TodoService } from "../services/todo.service.js";
import { createTodoDataType, todoIdType } from "../validators/todo.schema.js";

export class TodoContoller {
  private todoService = new TodoService();

  createTodo = async (
    req: Request<{}, {}, createTodoDataType["body"]>,
    res: Response
  ): Promise<void> => {
    const userId = res.locals.user.userId;

    const data = req.body;

    const todoData: TodoDataType = {
      ...data,
      userId,
    };
    req.log.debug({ body: data }, "Creating new todo");
    const todo = await this.todoService.createTodo(todoData);
    req.log.info(`Todo created successfully with ID: ${todo!.id}`);
    res.status(201).json(todo);
  };

  deleteTodo = async (
    req: Request<todoIdType["params"]>,
    res: Response
  ): Promise<void> => {
    const userId = res.locals.user.userId;
    const { id } = req.params;
    req.log.debug(`Deleting todo with ${id}`);
    await this.todoService.deleteTodo(id, userId);
    req.log.info(`Todo deleted successfully with ID: ${id}`);
    res.status(204).send();
  };

  togglecompleted = async (
    req: Request<todoIdType["params"], TodoResponse>,
    res: Response
  ): Promise<void> => {
    const userId = res.locals.user.userId;
    const { id } = req.params;
    req.log.debug(`Toggling completed of todo with id: ${id}`);
    const updatedTodo = await this.todoService.togglecompletedTodo(id, userId);
    req.log.info({ todoId: id }, "Todo completed toggled");
    res.status(200).json(updatedTodo);
  };

  updateTodo = async (
    req: Request<todoIdType["params"], {}, Partial<createTodoDataType["body"]>>,
    res: Response
  ): Promise<void> => {
    const userId = res.locals.user.userId;
    const data = req.body;
    const { id } = req.params;
    req.log.debug({ todoId: id, data: data }, "Updating Todo");
    const updatedTodo = await this.todoService.updateTodo(id, userId, data);
    req.log.info({ todoId: id }, "Todo completed toggled");
    res.status(200).json(updatedTodo);
  };

  getAllTodo = async (req: Request, res: Response): Promise<void> => {
    req.log.debug("Retrieving all Todos...");
    const userId = res.locals.user.userId;

    const allTodos = await this.todoService.getTodoByUser(userId);
    req.log.info(`All Todos Retrieved`);
    res.status(200).json(allTodos);
  };

  getTodo = async (
    req: Request<todoIdType["params"]>,
    res: Response
  ): Promise<void> => {
     const userId = res.locals.user.userId;
    const { id } = req.params;
    req.log.debug(`Retrieving Todo with ${id}`);
    const todo = await this.todoService.getTodo(id, userId);
    req.log.info(`Retrieved Todo with ID: ${id}`);
    res.status(200).send(todo);
  };
}
