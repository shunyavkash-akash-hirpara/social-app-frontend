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
import Profile from "./Page/Profile";
import SearchPage from "./Page/SearchPage";
import UserPostList from "./Page/UserPostList";
import FriendList from "./Page/FriendList";
import ChatList from "./Page/ChatList";
import Layout from "./Component/Layout";
import UnProtectedRoute from "./Component/ProtectedRoute/UnProtectedRoute";
import NotificationManage from "./Page/NotificationManage";

const routes = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "/setting", Component: Setting },
      { path: "/account-information", Component: AccountDetail },
      { path: "/contact-information", Component: ContactDetail },
      { path: "/social", Component: SocialDetail },
      { path: "/change-password", Component: ChangePassword },
      { path: "/notification", Component: Notifications },
      { path: "/manage-notification", Component: NotificationManage },
      { path: "/delete-my-account", Component: DeleteMyAccount },
      { path: "/profile/:id", Component: Profile },
      { path: "/search", Component: SearchPage },
      { path: "/profile/:id/posts", Component: UserPostList },
      { path: "/profile/:id/friends", Component: FriendList },
      { path: "/chat", Component: ChatList },
    ],
  },
  {
    Component: UnProtectedRoute,
    children: [{ path: "/auth", Component: Auth }],
  },
]);

export default function Routes(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <RouterProvider router={routes} fallbackElement="loading" />
    </ErrorBoundary>
  );
}
