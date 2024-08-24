import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";

import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import { loader } from "./loader.ts";
import SquadDetails from "./pages/SquadDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: loader,
    id: "root",
    shouldRevalidate: () => false,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/squads/:squadId",
        element: <SquadDetails />,
      },
    ],
  },
]);

export function Main() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Outlet />
    </NextUIProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
