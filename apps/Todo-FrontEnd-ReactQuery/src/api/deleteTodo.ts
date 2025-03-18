import apiClient from "./apiClient";

const deleteTodo = async (id: string) => {
  const { data } = await apiClient.delete(`/todo/deleteTodo/${id}`);
  return data;
};

export default deleteTodo;
