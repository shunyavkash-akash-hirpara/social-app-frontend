import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home";
import ErrorBoundary from "./Component/ErrorBoundary";
import Auth from "./Page/Auth";
import Setting from "./Page/Setting";

const routes = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/auth", Component: Auth },
  { path: "/setting", Component: Setting },
]);

export default function Routes(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <RouterProvider router={routes} fallbackElement="loading" />
    </ErrorBoundary>
  );
}
