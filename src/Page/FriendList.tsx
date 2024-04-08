import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/store/useAuth";

interface peoples {
  _id: string;
  user: { _id: string; username: string; name: string; profileImg: string };
  follow: string;
  followBackFlag?: boolean;
}
[];

interface user {
  _id: string;
  following: number;
  followers: number;
}

export default function FriendList(): React.JSX.Element {
  const [userList, setUserList] = useState<peoples[]>([]);
  const [user, setUser] = useState<user>();
  const [tab, setTab] = useState<string>("followers");
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const { userId } = useAuth();
  const id: string = useParams().id as string;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfileDetail = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.GET(id),
        method: "get",
      });
      if (res.status === 200) {
        setUser(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, id, setSnack]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFollowList = useCallback(async () => {
    try {
      const res = await apiCall({
        url:
          tab === "followers" ? APIS.FOLLOW.FOLLOWERS : APIS.FOLLOW.FOLLOWING,
        method: "get",
      });
      if (res.status === 200) {
        setUserList(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack, tab]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFollow = useCallback(
    async (followId: string) => {
      try {
        const res = await apiCall({
          url: APIS.FOLLOW.FOLLOW,
          method: "post",
          data: { follow: followId },
        });
        if (res.status === 201) {
          getFollowList();
          getProfileDetail();
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, getFollowList, getProfileDetail, setSnack]
  );

  useEffect(() => {
    if (!id && !tab) return;
    getFollowList();
  }, [getFollowList, id, tab]);

  useEffect(() => {
    if (!id) return;
    getProfileDetail();
  }, [getProfileDetail, id]);

  return (
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-[580px] mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl p-6">
            <div className="text-sm font-bold text-center text-gray-500 border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                <li className="w-[50%]">
                  <button
                    className={`w-full inline-block p-2 border-b-2 rounded-t-lg ${
                      tab === "followers"
                        ? "text-blue-600 border-blue-600"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setTab("followers");
                    }}
                  >
                    {user?.followers} followers
                  </button>
                </li>
                <li className="w-[50%]">
                  <button
                    className={`w-full inline-block p-2 border-b-2 rounded-t-lg ${
                      tab === "following"
                        ? "text-blue-600 border-blue-600"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setTab("following");
                    }}
                  >
                    {user?.following} following
                  </button>
                </li>
              </ul>
            </div>
            {userList.map((people) => (
              <div
                key={people.user._id}
                className="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
              >
                <Link
                  to={`/profile/${people.user._id}`}
                  className="flex items-center"
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={people.user.profileImg}
                    alt="Rounded avatar"
                  />
                  <div className="flex flex-col text-justify">
                    <span className="ms-3 text-sm text-gray-700 font-bold">
                      {people.user.username}
                    </span>
                    <span className="ms-3 text-[12px] text-gray-400">
                      {people.user.name}
                    </span>
                  </div>
                </Link>
                {tab === "following" ? (
                  <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                    Following
                  </button>
                ) : (
                  <>
                    <div className="flex items-center">
                      {people.followBackFlag && id !== userId && (
                        <button
                          onClick={() => handleFollow(people.user._id)}
                          className="mr-2 text-sm text-blue-500 font-bold"
                        >
                          Follow
                        </button>
                      )}
                      <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                        {id === userId ? "Remove" : "Follow"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
