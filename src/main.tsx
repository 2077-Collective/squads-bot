import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";

import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader } from "./loader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    loader: loader,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/:squadId",
        element: <div>jesus christ why</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
);
