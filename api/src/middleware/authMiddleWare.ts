import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env.js";

interface AuthRequest extends Request {
  userId?: string;
  role?: "user" | "admin";
}

interface JwtPayload {
  user: string;
  role: "user" | "admin";
}

const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECREAT,
      { algorithms: ["HS256"] }
    );

    if (
      typeof decoded === "string" ||
      !decoded.user ||
      !["user", "admin"].includes(decoded.role)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    const authReq = req as AuthRequest;

    authReq.userId = decoded.user;
    authReq.role = decoded.role as "user" | "admin";

    return next();

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }

    console.error("Authentication middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default isAuth;
