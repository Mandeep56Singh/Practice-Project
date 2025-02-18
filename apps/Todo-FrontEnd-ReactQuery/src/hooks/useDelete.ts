import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import deleteTodo from "../api/deleteTodo";
import { TodoType } from "../types/todo.type";


const useDelete = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousTodos: TodoType[] | undefined = queryClient.getQueryData([
        "todos",
      ]);

      const updatedTodos = previousTodos
        ? previousTodos.filter((todo) => todo.id !== todoId)
        : [];

      queryClient.setQueryData(["todos"], updatedTodos);

      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
    },
    onError: (err, _, context) => {
      toast.error("failed to delete");
      console.error("Delete failed with error message", err.message);
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return { isDeleting, deleteMutate };
};
export default useDelete;
