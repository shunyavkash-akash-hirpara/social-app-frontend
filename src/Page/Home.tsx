import React from "react";
import Feed from "../Component/Feed";
import RecentLikeUser from "../Component/RecentLikeUser";
import SuggestedUser from "../Component/SuggestedUser";

export default function Home(): React.JSX.Element {
  return (
    <>
      <main className="fixed w-[900px] top-[80px] left-[280px] right-[344px] mx-[auto] flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-[580px] mr-6 overflow-y-auto">
          <Feed />
        </div>
        <div className="w-[300px] overflow-y-auto feed-scroll">
          <RecentLikeUser />
          <SuggestedUser />
        </div>
      </main>
    </>
  );
}
