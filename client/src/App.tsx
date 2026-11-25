import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

const BASE_PATH = "";

export default function App() {
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
