import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import editTodo from "../api/editTodo";
import { TodoType } from "../types/todo.type";

const useEdit = () => {
  const queryClient = useQueryClient();

  const { mutate: editMutate, isPending: isEditing } = useMutation({
    mutationFn: editTodo,

    onMutate: async (todoData) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const todoId = todoData.id;
      const previousTodos: TodoType[] | undefined = queryClient.getQueryData([
        "todos",
      ]);

      const previousTodo = previousTodos?.find((todo) => todo.id === todoId);

      queryClient.setQueryData(["todos"], (old?: TodoType[]) => {
        if (!old) return [];
        return old.map((todo) =>
          todo.id === todoId ? { ...todo, ...todoData } : todo
        );
      });

      return { previousTodo, todoId };
    },

    onSuccess: () => {
      toast.success("Todo Updated Successfully");
    },

    onError: (err, _, context) => {
      toast.error(err?.message || "Update failed");
      console.error("Update failed:", err);

      queryClient.setQueryData(["todos"], (previousTodos?: TodoType[]) =>
        previousTodos
          ? previousTodos.map((todo) =>
              todo.id === context?.todoId ? context.previousTodo : todo
            )
          : []
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
  });

  return { editMutate, isEditing };
};

export default useEdit;
