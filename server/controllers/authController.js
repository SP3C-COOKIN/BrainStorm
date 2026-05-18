import prisma from "../lib/prisma.js";
import { signupSchema } from "../validators/authValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { loginSchema } from "../validators/authValidation.js";

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

export const login = async (req, res) => { // made a login function so we can initiate it from the route

  try { // we try this code
    const validatedData = loginSchema.parse(req.body); // we validate the login data so user doesnt send trash data to logic

    const existingUser = await prisma.user.findFirst({ // first we wait and ind the user that matches either the username or email that was put in
      where: { // where command, search where
        OR: [ // OR, sql stuff maybe it says search where this is the stuff and its either username or email
          {email: validatedData.identifier}, //email should be the same email from validatedData (validated data)
          {username: validatedData.identifier}, // same for username
        ],
      },
    });

    if (!existingUser) { // if any of them doesnt exist then return and send a status code + console message
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }

    const isMatch = await bcrypt.compare( // if it does then compare the bcrypt password to the input one
    validatedData.password, //take the input password
    existingUser.password // and existing user hashed pasword
    );

    if (!isMatch) { // if it doesnt match then send error
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }
    
    const token = jwt.sign( // if it does create a token for user and 
    {  userID: existingUser.id }, // what does it do?
    process.env.JWT_SECRET, //and tis
    { expiresIn: "7d" }, // this sets expiry date
    )

  } catch (error) { // if the code doesnt work then we send an error message "login failed" we should also have this thing where user can see "LOG IN FAILED" ON SCREEN TBH
    return res.error(400).json ({
      message: "Log-in failed",
      error: error.message,
    });
  }
};