import express from "express";
import cors from "cors";
import { HealthResponse } from "@realtime-chat/shared";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  const response: HealthResponse = {
    status: "ok",
    message: "Hello from Node.js server!",
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
