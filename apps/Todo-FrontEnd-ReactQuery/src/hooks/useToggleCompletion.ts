import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import toggleCompletion from "../api/toggleCompletion";
import { TodoType } from "../types/todo.type";


const useToggleCompletion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: toggleCompletion,
    // Before mutation
    onMutate: async (todoId: string) => {
      console.log("mutation is working");
      // cancle outgoing queries
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // get the previous state
      const previousTodos: TodoType[] | undefined = queryClient.getQueryData([
        "todos",
      ]);

      // Optistic Update
      const updatedTodos = previousTodos?.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );
      queryClient.setQueryData(["todos"], updatedTodos);

      // return the old data
      return { previousTodos };
    },
    onSuccess: (todo) => {
      if (todo.completed) {
        toast.success("Task completed");
      }
    },
    onError: (err, _, context) => {
      // set previous state
      queryClient.setQueryData(["todos"], context?.previousTodos);
      toast.error("Error Updating status");
      console.log("error:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return mutation;
};
export default useToggleCompletion;
