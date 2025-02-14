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
export const updatePrioritySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  }),
});

export type UpdatePriorityType = z.infer<typeof updatePrioritySchema>;
export type todoDataType = z.infer<typeof todoSchema>;
export type todoIdType = z.infer<typeof todoIdSchema>;
