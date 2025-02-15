export type TodoResponse = {
  id: string;
  text: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  date: Date;
};
