import { z } from "zod"; // this imports { z }?? from zod what is {z} tho?

// SIGN-UP VALIDATION

export const signupSchema = z.object({ 
  username: z // we put the username as z? why? or what is it then?
    .string() // we expect a string for username
    .min(3, "Username must be at least 3 characters") // minimum 3 characters and if less than that are there when submitted show the error message
    .max(20, "Username cannot exceed 20 characters") // max 20 chars if not then error message, last time I used "alert" lets see how this one works
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    ),

  email: z //z again aaaaaaaaa
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
})