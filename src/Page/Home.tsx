import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import Feed from "../Component/Feed";
import RecentLikeUser from "../Component/RecentLikeUser";
import SuggestedUser from "../Component/SuggestedUser";

export default function Home(): React.JSX.Element {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="fixed w-[900px] top-[80px] left-[280px] right-[344px] mx-[auto] flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-[580px] mr-6 overflow-y-auto">
          <Feed />
        </div>
        <div className="w-[300px]">
          <RecentLikeUser />
          <SuggestedUser />
        </div>
      </main>
      <RecentChat />
    </>
  );
}
