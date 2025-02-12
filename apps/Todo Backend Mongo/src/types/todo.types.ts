export type TodoResponseTypes = {
  id: string;
  text: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  date: Date; 
};

export type TodoRequestTypes = {
  body: {
    text: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
  };
};
