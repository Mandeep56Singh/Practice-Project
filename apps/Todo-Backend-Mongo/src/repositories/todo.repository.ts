import prisma from "../config/prisma.js";
import { TodoDataType, TodoResponse } from "../dtos/todo.types.js";
import {
  createTodoDataType,
  todoIdType,
} from "../validators/todo.schema.js";

export class TodoRepository {
  async create(data: TodoDataType): Promise<TodoResponse> {
    return prisma.todo.create({
      data: {
        userId: data.userId,
        text: data.text,
        completed: false,
        priority: data.priority || "LOW",
        date: new Date(),
      },
    });
  }
  async findTodo(userId: string, todoId: string): Promise<TodoResponse | null > {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId, userId },
    });
    return todo;
  }
  async findByUser(userId: string): Promise<TodoResponse[]> {
    const allTodos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    return allTodos;
  }

  async deleteByUser(
    todoId: todoIdType["params"]["id"],
    userId: string
  ): Promise<void> {
    await prisma.todo.delete({
      where: {
        id: todoId,
        userId,
      },
    });
  }
  async updateComplete(
    todoId: string,
    userId: string,
    toggleVal: boolean
  ): Promise<TodoResponse> {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
        userId,
      },
      data: {
        completed: !toggleVal,
      },
    });
    return updatedTodo;
  }
  async updateTodo(todoId: string, userId: string, data: Partial<createTodoDataType["body"]>): Promise<TodoResponse> {
    
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        ...data,
        date: new Date(),
      },
    });

    return updatedTodo;
  }

 
}
