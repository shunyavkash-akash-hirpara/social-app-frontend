import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

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
        {suggestList.length > 0 &&
          suggestList.map((friend, index) => (
            <div
              className={`${
                index !== 0 && "mt-3 pt-3 border-t-2"
              } border-gray-100`}
              key={index}
            >
              <div className="flex">
                <Link to={`/profile/${friend._id}`}>
                  <img
                    className="w-11 h-11 rounded-full object-cover"
                    src={friend.profileImg}
                    alt="Rounded avatar"
                  />
                </Link>
                <div className="flex flex-col text-justify mt-1">
                  <Link
                    to={`/profile/${friend._id}`}
                    className="ms-3 text-sm text-gray-600"
                  >
                    {friend.username}
                  </Link>
                  <div className="flex items-center justify-between ml-2 mt-1">
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                      {friend.mutual?.slice(0, 3).map((people) => (
                        <img
                          className="w-7 h-7 border-2 border-white rounded-full object-cover"
                          src={people.profileImg}
                          alt="avtar"
                          key={people._id}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs mr-6 cursor-pointer">
                      {friend.mutual_count} Mutuals
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                  {friend.followBack ? "Follow Back" : "Follow"}
                </button>
                <button className="rounded-lg border-2 border-gray-300 border-solid text-xs text-gray-400 font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                  Ignore
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
