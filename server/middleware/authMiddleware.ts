import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

type JwtPayload = {
  userId: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
      try {
      const authHeader = req.headers.authorization; 

      if (!authHeader || !authHeader.startsWith("Bearer ")) { 
        return res.status(401).json({
          message: "No token provided",
        });
      }

      const token = authHeader.replace(/^Bearer\s+/, " ");

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is missing");
      }

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      req.user = {
        id: decoded.userId,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };