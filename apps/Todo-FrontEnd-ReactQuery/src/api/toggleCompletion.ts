import apiClient from "./apiClient";

const toggleCompletion = async (id: string) => {
  console.log("toggle completion trigger");
  const { data } = await apiClient.patch(`/todo/toggleCompleteTodo/${id}`);
  return data;
};
export default toggleCompletion;
