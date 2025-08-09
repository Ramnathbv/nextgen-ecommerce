import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./middleware/passport";

import { authRouter } from "./routes/auth";
import { productsRouter } from "./routes/products";
import { cartRouter } from "./routes/cart";
import { checkoutRouter } from "./routes/checkout";
import { cmsRouter } from "./routes/cms";
import { healthRouter } from "./routes/health";
import { usersRouter } from "./routes/users";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());

// Health/ready
app.use("/health", healthRouter);
app.get("/healthz", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/api", checkoutRouter);
app.use("/api", cmsRouter);

// Fallback 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Not Found", path: req.path });
});

export { app };


