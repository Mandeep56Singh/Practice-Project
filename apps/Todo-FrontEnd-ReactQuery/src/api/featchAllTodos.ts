import { TodoType } from "../types/todo.type";
import apiClient from "../utils/apiClient";

const fetchAllTodos = async (): Promise<TodoType[]> => {

  const { data } = await apiClient.get("/todo/getAllTodos");
  return data;
};

export default fetchAllTodos;
