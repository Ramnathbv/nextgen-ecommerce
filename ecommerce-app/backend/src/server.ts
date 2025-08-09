import dotenv from "dotenv";
import { app } from "./app";
import { initSequelize } from "./db/sequelize";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await initSequelize();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });
  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
};

start();


