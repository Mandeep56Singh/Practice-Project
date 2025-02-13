import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    text: z.string().min(3, "Text must be at least 3 characters long"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  }),
});

export type CreatetodoRequestType = z.infer<typeof createTodoSchema>;
