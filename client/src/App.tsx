import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { HealthResponse } from "@realtime-chat/shared";
import { useEffect } from "react";

const BASE_PATH = "";

export default function App() {
  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch API");
        return res.json();
      })
      .then((json: HealthResponse) => console.log(json))
      .catch((err) => console.log(err.message));
  }, []);

  const routesArray = [
    { path: `${BASE_PATH}/`, element: <Login /> },
    { path: `${BASE_PATH}/register`, element: <Register /> },
    { path: `${BASE_PATH}/chat`, element: <Chat /> }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routesArray.map((item) => {
          return (
            <Route path={item.path} element={item.element} key={item.path} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
