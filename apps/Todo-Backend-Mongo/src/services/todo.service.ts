import { TodoDataType, TodoResponse } from "../dtos/todo.types.js";
import { TodoRepository } from "../repositories/todo.repository.js";
import ApiError from "../utils/apiError.js";
import { createTodoDataType } from "../validators/todo.schema.js";

export class TodoService {
  private todoRepository = new TodoRepository();
  async createTodo(todoData: TodoDataType): Promise<TodoResponse> {
    return await this.todoRepository.create(todoData);
  }

  async deleteTodo(todoId: string, userId: string): Promise<void> {
    const todo = this.todoRepository.findTodo(userId, todoId);
    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }

    await this.todoRepository.deleteByUser(todoId, userId);
  }
  async togglecompletedTodo(
    todoId: string,
    userId: string
  ): Promise<TodoResponse> {
    const todo = await this.todoRepository.findTodo(userId, todoId);
    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }

    const updatedTodo = await this.todoRepository.updateComplete(
      todoId,
      userId,
      todo.completed
    );
    return updatedTodo;
  }

  async updateTodo(
    todoId: string,
    userId: string,
    data: Partial<createTodoDataType["body"]>
  ): Promise<TodoResponse> {
    const todo = await this.todoRepository.findTodo(userId, todoId);
    if (!todo) {
      throw new ApiError(404, "Todo Not Found");
    }

    const updatedTodo = await this.todoRepository.updateTodo(
      todoId,
      userId,
      data
    );
    return updatedTodo;
  }
  async getTodoByUser(userId: string): Promise<TodoResponse[]> {
    const allTodos = await this.todoRepository.findByUser(userId);
    return allTodos;
  }
  async getTodo(id: string, userId: string): Promise<TodoResponse | null> {
    const todo = await this.todoRepository.findTodo(id, userId);
    return todo;
  }
}
