import { z } from "zod";

export const todoSchema = z.object({
  text: z.string().min(3, "Text must be at least 3 characters long"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TodoDataType = z.infer<typeof todoSchema>;
