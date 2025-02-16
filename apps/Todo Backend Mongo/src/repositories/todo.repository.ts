import prisma from "../config/prisma.js";
import { TodoResponse } from "../dtos/todo.types.js";
import ApiError from "../utils/apiError.js";
import {
  todoDataType,
  TodoFilterType,
  todoIdType,
} from "../validators/todo.schema.js";

export class TodoRepository {
  async create(data: todoDataType["body"]): Promise<TodoResponse> {
    return prisma.todo.create({
      data: {
        text: data.text,
        completed: false,
        priority: data.priority || "LOW",
        date: new Date(),
      },
    });
  }

  async delete(todoId: todoIdType["params"]["id"]): Promise<void> {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
  async updateComplete(todoId: string): Promise<TodoResponse> {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        completed: !todo.completed,
      },
    });
    return updatedTodo;
  }
  async updateTodo(
    todoId: string,
    data: Partial<todoDataType["body"]>
  ): Promise<TodoResponse> {
    const id = todoId;
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...data,
        date: new Date(),
      },
    });

    return updatedTodo;
  }

  async getAllTodos(): Promise<TodoResponse[]> {
    const allTodos = await prisma.todo.findMany();
    return allTodos;
  }

  async getTodo(todoId: string): Promise<TodoResponse> {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }
    return todo;
  }
  async todoFilter(filters: TodoFilterType["query"]): Promise<TodoResponse[]> {
    const { completed, endDate, priority, startDate } = filters;
   
    const where: any = {
      completed,
      priority,
      date:
        startDate || endDate
          ? {
              ...(startDate && { gte: new Date(startDate) }),
              ...(endDate && { lte: new Date(endDate) }),
            }
          : undefined,
    };
    // Remove undefined values to help debugging
    Object.keys(where).forEach(
      (key) => where[key] === undefined && delete where[key]
    );
    const filteredTodos = await prisma.todo.findMany({
      where,
    });

    return filteredTodos;
  }
}
