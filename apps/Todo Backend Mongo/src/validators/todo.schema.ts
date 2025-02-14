import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    text: z.string().min(3, "Text must be at least 3 characters long"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
export type CreateTodoRequestType = z.infer<typeof createTodoSchema>;
export type deleteTodoParmamType = z.infer<typeof deleteTodoSchema>;
