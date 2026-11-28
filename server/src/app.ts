import express from "express";
import cors from "cors";
import { HealthResponse } from "@realtime-chat/shared";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
// const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  const response: HealthResponse = {
    status: "ok",
    message: "Hello from Node.js server!",
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.use("/api/auth", authRoutes);

export default app;
