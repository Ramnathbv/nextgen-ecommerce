import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : undefined;

  if (!token) {
    return res.status(401).json({ success: false, error: "Missing token" });
  }

  try {
    const claims = jwt.verify(token, getJwtSecret());
    if (typeof claims === "string") {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    req.user = claims as Express.UserTokenClaims;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : undefined;

  try {
    if (token) {
      const claims = jwt.verify(token, getJwtSecret());
      if (typeof claims !== "string") {
        req.user = claims as Express.UserTokenClaims;
      }
    }
  } catch {
    // ignore
  }
  next();
};

export const issueToken = (claims: Express.UserTokenClaims): string => {
  return jwt.sign(claims, getJwtSecret(), { expiresIn: "1h" });
};


