import { Router, Request, Response } from "express";
import { issueToken, requireAuth } from "../middleware/auth";
import passport, { initPassport } from "../middleware/passport";
import { randomUUID, randomBytes } from "crypto";
export const authRouter = Router();

// Initialize Passport strategies if env vars present
initPassport();

// Demo login (replace with OAuth2 flow in production)
authRouter.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
  }

  // Demo only: accept any email with password === "password"
  if (password !== "password") {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  const token = issueToken({ userId: email, email, role: "user" });
  return res.json({ success: true, data: { token } });
});

// GitHub OAuth
authRouter.get("/github", (req: Request, res: Response, next) => {
  const isEnabled = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;
  if (!isEnabled) {
    return res.status(503).json({ success: false, error: "GitHub OAuth not configured" });
  }
  // request email scope
  return passport.authenticate("github", { scope: ["user:email"], session: false })(
    req,
    res,
    next
  );
});

authRouter.get(
  "/github/callback",
  (req: Request, res: Response, next) => {
    return passport.authenticate("github", { session: false })(req, res, next);
  },
  (req: Request, res: Response) => {
    // user object from strategy
    const oauthUser = (req as any).user as {
      id: string;
      username: string;
      email?: string;
      provider: "github";
    };

    if (!oauthUser) {
      return res.status(401).json({ success: false, error: "Authentication failed" });
    }

    const token = issueToken({
      userId: `${oauthUser.provider}:${oauthUser.id}`,
      email: oauthUser.email || `${oauthUser.username}@users.noreply.github.com`,
      role: "user",
    });
    // In a real app you might redirect back to frontend with the token
    return res.json({ success: true, data: { token } });
  }
);

authRouter.post("/logout", (_req: Request, res: Response) => {
  // Stateless JWT: client deletes token
  res.json({ success: true });
});

authRouter.get("/me", requireAuth, (req: Request, res: Response) => {
  res.json({ success: true, data: req.user });
});


// Generate a unique token (UUID v4 when available, otherwise 32-byte hex)
authRouter.post("/token", (_req: Request, res: Response) => {
  const guestId = typeof randomUUID === "function" ? randomUUID() : randomBytes(32).toString("hex");
  const token = issueToken({ guestId, role: "guest" });
    
  return res.json({ success: true, data: { token } });
});



