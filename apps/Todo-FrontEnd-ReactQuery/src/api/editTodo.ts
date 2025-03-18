import { TodoDataType } from "../schema/todo.schema";
import { TodoType } from "../types/todo.type";
import apiClient from "./apiClient";

type EditTodoProps = TodoDataType & {
  id: string;
};
const editTodo = async (todoData: EditTodoProps): Promise<TodoType> => {
  const { data } = await apiClient.patch(`/todo/updateTodo/${todoData.id}`, {
    text: todoData.text,
    priority: todoData.priority,
  });
  return data;
};
export default editTodo;
