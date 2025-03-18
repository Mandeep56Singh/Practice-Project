import { TodoType } from "../types/todo.type";
import apiClient from "./apiClient";

const fetchAllTodos = async (): Promise<TodoType[]> => {
  const { data } = await apiClient.get("/todo/getAllTodos");
  return data;
};

export default fetchAllTodos;
