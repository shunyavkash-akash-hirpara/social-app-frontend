import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home";
import ErrorBoundary from "./Component/ErrorBoundary";
import Auth from "./Page/Auth";
import Setting from "./Page/Setting";
import AccountDetail from "./Page/AccountDetail";
import ContactDetail from "./Page/ContactDetail";
import SocialDetail from "./Page/SocialDetail";
import ChangePassword from "./Page/ChangePassword";
import Notifications from "./Page/Notifications";
import DeleteMyAccount from "./Page/DeleteMyAccount";

const routes = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/auth", Component: Auth },
  { path: "/setting", Component: Setting },
  { path: "/account-information", Component: AccountDetail },
  { path: "/contact-information", Component: ContactDetail },
  { path: "/social", Component: SocialDetail },
  { path: "/change-password", Component: ChangePassword },
  { path: "/notification", Component: Notifications },
  { path: "/delete-my-account", Component: DeleteMyAccount },
]);

export default function Routes(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <RouterProvider router={routes} fallbackElement="loading" />
    </ErrorBoundary>
  );
}
