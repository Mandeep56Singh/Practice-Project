import prisma from "../config/prisma.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import {
  CreateTodoRequestType,
  deleteTodoParmamType,
} from "../validators/todo.schema.js";

export class TodoRepository {
  async create(
    data: CreateTodoRequestType["body"]
  ): Promise<TodoResponseTypes> {
    return prisma.todo.create({
      data: {
        text: data.text,
        completed: false,
        priority: data.priority || "LOW",
        date: new Date(),
      },
    });
  }

  async delete(todoId: deleteTodoParmamType["params"]["id"]): Promise<void> {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}

