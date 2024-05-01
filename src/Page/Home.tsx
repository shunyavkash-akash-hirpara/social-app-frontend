import React, { useEffect } from "react";
import Feed from "../Component/Feed";
import RecentLikeUser from "../Component/RecentLikeUser";
import SuggestedUser from "../Component/SuggestedUser";
import { socket } from "../socket";
import { useAuth } from "../hooks/store/useAuth";

export default function Home(): React.JSX.Element {
  const { userId } = useAuth();
  useEffect(() => {
    socket.emit("back", { userId: userId });
  }, [userId]);
  return (
    <>
      <main className="fixed w-[900px] top-[80px] left-[280px] right-[344px] mx-[auto] flex h-calc-screen-minus-nav">
        <Feed />
        <div className="w-[300px] overflow-y-auto feed-scroll">
          <RecentLikeUser />
          <SuggestedUser />
        </div>
      </main>
    </>
  );
}
