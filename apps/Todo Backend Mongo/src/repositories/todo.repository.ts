import prisma from "../config/prisma.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import NotFoundError from "../utils/NotFoundError.js";
import {
  todoDataType,
  todoIdType,
  UpdatePriorityType,
} from "../validators/todo.schema.js";

export class TodoRepository {
  async create(data: todoDataType["body"]): Promise<TodoResponseTypes> {
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
  async updateComplete(todoId: string): Promise<TodoResponseTypes> {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
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
  async updatePriority(
    todoId: string,
    priority: UpdatePriorityType["body"]["priority"]
  ): Promise<TodoResponseTypes> {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      throw new NotFoundError("Todo Not Found");
    }
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        priority: priority,
      },
    });
    return updatedTodo;
  }
}
