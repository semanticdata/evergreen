import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./pages/Evergreen.jsx";

import Config from "../config.json";

import "./index.scss";

const defaultIndex =
  !!Config.bookmarks && Config.bookmarks.length > 0
    ? Config.bookmarks[0]
    : ".404";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to={"/" + defaultIndex} replace />,
    },
    { path: "/:entrypoint", element: <App /> },
  ],
  {
    basename: window.location.host.endsWith(".github.io")
      ? `/${window.location.pathname.split("/")[1]}`
      : Config.basename,
  },
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
