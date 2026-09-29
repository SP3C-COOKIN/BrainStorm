import { z } from "zod";

// SIGN-UP VALIDATION

export const signupSchema = z.object({ 
  username: z
    .string()
    .min(3, "Username must be at least 3 characters") 
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    ),

  email: z
    .email("Please enter a valid email address"), 

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});

// LOGIN VALIDATION

export const loginSchema = z.object({
    identifier: z
    .string()
    .min(1, "Email or Username is Required")
    .max(80, "Identifier too long"),

    password: z
    .string()
    .min(1, "Password is Required")
    .max(72, "Password is too long"),
});

export type signupBody = z.infer<typeof signupSchema>;
export type loginBody = z.infer<typeof loginSchema>;