import prisma from "../config/prisma.js";
import { TodoRequestTypes, TodoResponseTypes } from "../types/todo.types.js";

export const createTodoHandler = async (
  todoData: TodoRequestTypes["body"]
): Promise<TodoResponseTypes> => {
  try {
    const todo = await prisma.todo.create({
      data: {
        text: todoData.text,
        completed: false,
        priority: todoData.priority || "LOW",
        date: new Date(),
      },
    });
    console.log("createTodoHanlder success: ", todo);
    return todo;
  } catch (error) {
    throw new Error("Failed to create todo");
  }
};
