import prisma from "../lib/prisma.js";
import { signupSchema } from "../validators/authValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGN-UP FUNCTION
export const signup = async (req, res) => {
  const validatedData = signupSchema.parse(req.body);

  // Check if Username or Email already Exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: validatedData.email },
        { username: validatedData.username },
      ],
    },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email or username already exists",
    });
  }

  // HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const user = await prisma.user.create({
    data: {
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
};

// LOG-IN FUNCTION
