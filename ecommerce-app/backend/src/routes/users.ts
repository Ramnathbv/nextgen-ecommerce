import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { issueToken } from "../middleware/auth";
import { User } from "../db/sequelize";

export const usersRouter = Router();

const isValidEmail = (email: string): boolean => /.+@.+\..+/.test(email);

usersRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "name, email and password are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: "Invalid email" });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await User.create({ name, email, passwordHash });

    const token = issueToken({ userId: String(created.id), email, role: "user" });
    return res.status(201).json({ success: true, data: { token } });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
});


