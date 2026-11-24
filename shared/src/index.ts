export interface HealthResponse {
  status: "ok" | "error";
  message: string;
  timestamp: string;
}
