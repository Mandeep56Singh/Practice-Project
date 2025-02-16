import { z } from "zod";
export const todoSchema = z.object({
  body: z.object({
    text: z.string().min(3, "Text must be at least 3 characters long"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  }),
});

export const todoIdSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
      message: "Invalid Todo ID",
    }),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
      text: z
        .string()
        .min(3, "Text must be at least 3 characters long")
        .optional(),
    })
    .refine((data) => data.priority !== undefined || data.text !== undefined, {
      message: "At least one field (priority or text) must be provided",
    }),
});

export type UpdateTodoType = z.infer<typeof updateTodoSchema>;
export type todoDataType = z.infer<typeof todoSchema>;
export type todoIdType = z.infer<typeof todoIdSchema>;
