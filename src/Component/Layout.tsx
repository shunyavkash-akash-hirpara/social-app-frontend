import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RecentChat from "./RecentChat";
import { useAuth } from "../hooks/store/useAuth";
import { Outlet } from "react-router-dom";

export default function Layout(): React.JSX.Element {
  const { accessToken } = useAuth();
  return (
    <div className="relative">
      <div className="absolute z-10">
        <Header accessToken={accessToken} />
        <Sidebar />
        <RecentChat />
      </div>
      <Outlet />
    </div>
  );
}
