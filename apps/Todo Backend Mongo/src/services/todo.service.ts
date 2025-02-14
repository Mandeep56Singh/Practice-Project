import { TodoRepository } from "../repositories/todo.repository.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import { todoDataType, UpdatePriorityType } from "../validators/todo.schema.js";

export class TodoService {
  private todoRepository = new TodoRepository();
  async createTodo(todoData: todoDataType["body"]): Promise<TodoResponseTypes> {
    return await this.todoRepository.create(todoData);
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.todoRepository.delete(todoId);
  }
  async toggleCompletionTodo(todoId: string): Promise<TodoResponseTypes> {
    const updatedTodo = await this.todoRepository.updateComplete(todoId);
    return updatedTodo
  }
  async updateTodoPriority(
    todoId: string,
    priority: UpdatePriorityType["body"]["priority"]
  ): Promise<TodoResponseTypes> {
    const updatedTodo = await this.todoRepository.updatePriority(
      todoId,
      priority
    );
    return updatedTodo;
  }
}
