import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Name must contain at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: z.email("Please provide a valid email address"),

    password: z.string().min(6, "Password must contain at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must contain at least 6 characters")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.email("Please provide a valid email address"),

  password: z.string().min(6, "Password must contain at least 6 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
