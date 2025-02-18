export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  date?: Date;
};

