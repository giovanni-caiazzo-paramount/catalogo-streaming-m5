import express from "express";
import { createContentsRouter } from "./routes/contents";
import { createUsersRouter } from "./routes/users";

// Factory dell'app: usala nei test di integrazione per avere stato isolato.
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api/v1/contents", createContentsRouter());
  app.use("/api/v1/users", createUsersRouter());
  return app;
}

export const app = createApp();
