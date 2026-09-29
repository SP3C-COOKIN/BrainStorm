import prisma from "../lib/prisma.js";

import {Request, Response } from "express";

import { signupSchema } from "../validators/authValidation.js";
import { loginSchema } from "../validators/authValidation.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// SIGN-UP FUNCTION
export const signup = async (req: Request, res: Response) => {

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

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing");
  }

  const token = jwt.sign(
    { userId: user.id },
    jwtSecret,
    { expiresIn: "7d" }
  );

  return res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
};

// LOG-IN FUNCTION
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.identifier },
          { username: validatedData.identifier },
        ],
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }

    const isMatch = await bcrypt.compare(
      validatedData.password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_Secret is missing")
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });

  } catch (error) {
    return res.status(400).json({
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};