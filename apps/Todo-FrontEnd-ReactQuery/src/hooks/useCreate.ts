import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import createTodo from "../api/createTodo";
import { TodoDataType } from "../schema/todo.schema";
import { TodoType } from "../types/todo.type";
const useCreate = () => {
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation({
    mutationFn: createTodo,
    onMutate: (data: TodoDataType) => {
      queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos: TodoType[] | undefined = queryClient.getQueryData([
        "todos",
      ]);
      const tempId = uuid();

      const tempTodo: TodoType = {
        id: tempId,
        text: data.text,
        completed: false,
        priority: data.priority || "LOW",
        date: new Date(),
      };

      const updatedTodos = [...(previousTodos || []), tempTodo];

      queryClient.setQueryData(["todos"], updatedTodos);

      return { tempId };
    },
    onSuccess: (realTodo, _, context) => {
      toast.success("Todo Created Successfully");
      queryClient.setQueryData(["todos"], (previousTodos: TodoType[]) =>
        previousTodos.map((todo) =>
          todo.id === context?.tempId ? realTodo : todo
        )
      );
    },
    onError: (error, _, context) => {
      console.error("Creation failed with error", error);
      toast.error("failed to create todo");
      queryClient.setQueryData(["todos"], (previousTodos: TodoType[]) =>
        previousTodos.filter((todo) => todo.id !== context?.tempId)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  return { createMutate };
};

export default useCreate;
