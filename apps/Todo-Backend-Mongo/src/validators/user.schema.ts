import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      username: z.string().min(1, "Username is required"),

      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
        })
        .regex(/^\S*$/, { message: "No spaces allowed in password" }),

      confirmPassword: z.string().min(8, "Password confirmation is required"),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: "Passwords must match",
          code: "custom",
        });
      }
    }),
});

// ✅ Type inference
export type CreateUserType = z.infer<typeof createUserSchema>;
