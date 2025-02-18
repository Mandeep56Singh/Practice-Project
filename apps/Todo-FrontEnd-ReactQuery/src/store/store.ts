import { create } from "zustand";

export type SortState = {
  sortBy: "Priority" | "Date";
  order: "ASC" | "DSC";
};

type SortAction = {
  sortTodos: (sortBy: SortState["sortBy"], order: SortState["order"]) => void;
};

const useStore = create<SortState & SortAction>((set) => ({
  sortBy: "Date",
  order: "ASC",
  sortTodos: (sortBy, order) =>
    set(() => ({
      sortBy,
      order,
    })),
}));

export default useStore;
