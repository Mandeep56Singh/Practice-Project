import { TodoRepository } from "../repositories/todo.repository.js";
import { TodoResponseTypes } from "../types/todo.types.js";
import { CreateTodoRequestType } from "../validators/todo.schema.js";

export class TodoService {
  private todoRepository = new TodoRepository();
  async createTodo(
    todoData: CreateTodoRequestType["body"]
  ): Promise<TodoResponseTypes> {
    return await this.todoRepository.create(todoData);
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.todoRepository.delete(todoId);
  }
}
