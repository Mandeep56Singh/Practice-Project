import prisma from "../config/prisma.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import { todoDataType } from "../validators/todo.schema.js";

export const createTodoHandler = async (
  todoData: todoDataType["body"]
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
