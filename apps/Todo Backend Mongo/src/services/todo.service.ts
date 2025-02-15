import { TodoResponse } from "../dtos/todo.types.js";
import { TodoRepository } from "../repositories/todo.repository.js";
import { todoDataType, UpdatePriorityType } from "../validators/todo.schema.js";

export class TodoService {
  private todoRepository = new TodoRepository();
  async createTodo(todoData: todoDataType["body"]): Promise<TodoResponse> {
    return await this.todoRepository.create(todoData);
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.todoRepository.delete(todoId);
  }
  async toggleCompletionTodo(todoId: string): Promise<TodoResponse> {
    const updatedTodo = await this.todoRepository.updateComplete(todoId);
    return updatedTodo;
  }
  async updateTodoPriority(
    todoId: string,
    priority: UpdatePriorityType["body"]["priority"]
  ): Promise<TodoResponse> {
    const updatedTodo = await this.todoRepository.updatePriority(
      todoId,
      priority
    );
    return updatedTodo;
  }
  async updateTodo(
    todoId: string,
    data: Partial<todoDataType["body"]>
  ): Promise<TodoResponse> {
    const updatedTodo = await this.todoRepository.updateTodo(todoId, data);
    return updatedTodo;
  }
  async getAllTodos(): Promise<TodoResponse[]> {
    const allTodos = await this.todoRepository.getAllTodos();
    return allTodos;
  }
  async getTodo(id: string): Promise<TodoResponse> {
    const todo = await this.todoRepository.getTodo(id);
    return todo;
  }
}
