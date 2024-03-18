import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home";
import SignIn from "./Page/SignIn";
import SignUp from "./Page/SignUp";
import ErrorBoundary from "./Component/ErrorBoundary";

const routes = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/signin", Component: SignIn },
  { path: "/signup", Component: SignUp },
]);

export default function Routes(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <RouterProvider router={routes} fallbackElement="loading" />
    </ErrorBoundary>
  );
}
