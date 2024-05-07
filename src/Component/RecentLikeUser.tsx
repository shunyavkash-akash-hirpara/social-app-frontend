import React, { useCallback, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import FriendUserCard from "./FriendUserCard";

interface suggest {
  _id: string;
  username: string;
  profileImg: string;
  followBack: boolean;
  mutual: { _id: string; username: string; profileImg: string }[];
  mutual_count: number;
}

export default function RecentLikeUser(): React.JSX.Element {
  const [suggestList, setSuggestList] = useState<suggest[]>([]);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSuggestedFriend = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.FOLLOW.SUGGESTEDFRIEND,
        method: "get",
      });
      if (res.status === 200) {
        setSuggestList(res.data.data.suggetions);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack]);

  useEffect(() => {
    getSuggestedFriend();
  }, [getSuggestedFriend]);

  return (
    <>
      {suggestList.length > 0 && (
        <div className="mb-6">
          <div className="bg-white rounded-t-xl p-4 pb-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600 font-bold">
                You Might Like
              </label>
              <a href="#" className="text-sm text-blue-600">
                See all
              </a>
            </div>
          </div>
          <div className="bg-white border-t-2 border-gray-100 p-4 pt-3 rounded-b-xl">
            {suggestList.map((friend, index) => (
              <FriendUserCard
                friend={friend}
                index={index}
                key={friend._id}
                onSuccess={getSuggestedFriend}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
