import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import fetchAllTodos from "../api/featchAllTodos";
import useStore from "../store/store";

const useFetchAll = () => {
  const { order, sortBy } = useStore();
  const { data: todoData, isLoading: isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodos,
  });

  const priorityOrder: Record<"LOW" | "MEDIUM" | "HIGH", number> = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };

  //  Todos based on sorting createria
  const todos = useMemo(() => {
    if (!todoData) return [];
    return todoData?.slice().sort((a, b) => {
      if (sortBy === "Priority") {
        return order === "ASC"
          ? priorityOrder[a.priority as "LOW" | "MEDIUM" | "HIGH"] -
              priorityOrder[b.priority as "LOW" | "MEDIUM" | "HIGH"]
          : priorityOrder[b.priority as "LOW" | "MEDIUM" | "HIGH"] -
              priorityOrder[a.priority as "LOW" | "MEDIUM" | "HIGH"];
      }
      if (sortBy === "Date") {
        return order === "ASC"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoData, sortBy, order]);

  console.log(todos, "sorted todos on fetched");
  const completedTodos = todoData?.filter((todo) => todo.completed);
  return { todoData, todos, isFetching, completedTodos };
};

export default useFetchAll;
