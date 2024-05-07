import React, { useEffect } from "react";
import Feed from "../Component/Feed";
import RecentLikeUser from "../Component/RecentLikeUser";
import SuggestedUser from "../Component/SuggestedUser";
import { socket } from "../socket";
import { useAuth } from "../hooks/store/useAuth";
import useApi from "../hooks/useApi";
import Loader from "../Component/icons/Loader";

export default function Home(): React.JSX.Element {
  const { userId } = useAuth();
  const { isLoading } = useApi();
  useEffect(() => {
    socket.emit("back", { userId: userId });
  }, [userId]);
  return (
    <>
      {isLoading ? (
        <Loader className="text-[#DE2C70]" />
      ) : (
        <main className="mt-20 w-[900px] left-[280px] right-[344px] mx-[auto] flex h-calc-screen-minus-nav">
          <Feed />
          <div className="w-[300px] overflow-y-auto feed-scroll">
            <RecentLikeUser />
            <SuggestedUser />
          </div>
        </main>
      )}
    </>
  );
}
