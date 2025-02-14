import prisma from "../config/prisma.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import { CreateTodoRequestType } from "../validators/todo.schema.js";

export const createTodoHandler = async (
  todoData: CreateTodoRequestType["body"]
): Promise<TodoResponseTypes> => {
  try {
    return await prisma.todo.create({
      data: {
        text: todoData.text,
        completed: false,
        priority: todoData.priority || "LOW",
        date: new Date(),
      },
    });
  } catch (error) {
    throw new Error("Failed to create todo");
  }
};
