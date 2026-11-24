import { useEffect, useState } from "react";
import { HealthResponse } from "@realtime-chat/shared";

export default function App() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch API");
        return res.json();
      })
      .then((json: HealthResponse) => setData(json))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Client + Server Monorepo</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data ? (
        <div>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
          <p>
            <strong>Timestamp:</strong> {data.timestamp}
          </p>
        </div>
      ) : (
        !error && <p>Connecting to server...</p>
      )}
    </main>
  );
}
