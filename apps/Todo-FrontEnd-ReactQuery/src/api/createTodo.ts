import { TodoDataType } from "../schema/todo.schema";
import { TodoType } from "../types/todo.type";
import apiClient from "./apiClient";

const createTodo = async (todoData: TodoDataType): Promise<TodoType> => {
  const { data } = await apiClient.post("/todo/createtodo", todoData);
  return data;
};

export default createTodo;
