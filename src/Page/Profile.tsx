import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useChatUser } from "../hooks/store/useChatUser";

interface user {
  _id: string;
  username: string;
  name: string;
  profileImg: string;
  bio: string;
  following: number;
  followers: number;
  post: number;
  follow: boolean;
}

interface post {
  _id: string;
  user: {
    _id: string;
    username: string;
    profileImg: string;
    city?: string;
    country?: string;
  };
  description?: string;
  mentionedUsers: {
    _id: string;
    username: string;
    name: string;
    profileImg: string;
  }[];
  photos: { _id: string; url: string; type: string }[];
  like: number;
  comment: number;
  isLike: boolean;
}

export default function Profile(): React.JSX.Element {
  const [user, setUser] = useState<user>();
  const [posts, setPosts] = useState<post[]>([]);
  const { setNewChatUser } = useChatUser();
  const { accessToken, userId } = useAuth();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const id: string = useParams().id as string;
  const navigate = useNavigate();

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
  const getPosts = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.POST.POSTBYUSER(id),
        method: "get",
      });
      if (res.status === 200) {
        setPosts(res.data.data);
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
  const handleFollow = useCallback(async () => {
    try {
      const res = await apiCall({
        url: user?.follow ? APIS.FOLLOW.UNFOLLOW : APIS.FOLLOW.FOLLOW,
        method: "post",
        data: { follow: id },
      });
      if (res.status === 200 || res.status === 201) {
        getProfileDetail();
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, getProfileDetail, id, setSnack, user?.follow]);

  useEffect(() => {
    if (!id) return;
    getProfileDetail();
    getPosts();
  }, [getPosts, getProfileDetail, id]);

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl p-6">
            {user && (
              <div className="flex items-center w-full">
                <img
                  className="w-40 h-40 mr-2 ml-12 rounded-full object-cover"
                  src={user.profileImg}
                  alt="Bordered avatar"
                />
                <div className="flex flex-col mx-auto items-start w-[55%]">
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-lg font-bold text-gray-700">
                      {user.username}
                    </span>
                    {id !== userId && (
                      <div className="flex">
                        <button
                          className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                          onClick={handleFollow}
                        >
                          {user.follow ? "Following" : "Follow"}
                        </button>
                        <button
                          className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-6 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                          onClick={() => {
                            let convId;
                            if (user._id > userId) {
                              convId = userId + user._id;
                            } else {
                              convId = user._id + userId;
                            }
                            setNewChatUser({
                              _id: user._id,
                              name: user.name,
                              username: user.username,
                              profileImg: user.profileImg,
                              conversationId: convId,
                            });
                            navigate(`/chat/${id}`);
                          }}
                        >
                          Message
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex justify-between items-center mb-4">
                    <Link
                      to={`./posts`}
                      className="text-sm font-bold text-gray-600 hover:text-gray-400"
                    >
                      {user.post} posts
                    </Link>
                    <Link
                      to={`./friends`}
                      className="text-sm font-bold text-gray-600 hover:text-gray-400"
                    >
                      {user.followers} followers
                    </Link>
                    <Link
                      to={`friends`}
                      className="text-sm font-bold text-gray-600 hover:text-gray-400"
                    >
                      {user.following} following
                    </Link>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-gray-700 text-sm font-bold">
                      {user?.name}
                    </h3>
                    <h4 className="text-gray-700 text-sm text-start">
                      {user?.bio}
                    </h4>
                  </div>
                </div>
              </div>
            )}
            {posts.length > 0 ? (
              <div className="border-t-2 border-gray-300 mt-10 pt-10 grid grid-cols-3 gap-1">
                {posts.map((item, index) => (
                  <Link key={index} to="./posts" className="relative">
                    {item.photos[0].type === "image" ? (
                      <img
                        className="h-full object-cover"
                        src={item.photos[0].url}
                        alt=""
                      />
                    ) : (
                      <video
                        className="h-full object-cover"
                        src={item.photos[0].url}
                      ></video>
                    )}

                    {item.photos.length > 1 ? (
                      <img
                        className="w-5 h-5 absolute top-1 right-1"
                        src="/public/icons/multiple-pages-empty-svgrepo-com.svg"
                        alt=""
                      />
                    ) : item.photos[0].type === "video" ? (
                      <img
                        className="w-5 h-5 absolute top-1 right-1"
                        src="/public/icons/youtube-svgrepo-com.svg"
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border-t-2 border-gray-300 mt-10 pt-10">
                <div className="h-18 w-18 p-3 border-2 border-gray-700 rounded-full mb-3">
                  <img
                    className="h-14"
                    src="/public/icons/camera-svgrepo-com.svg"
                    alt="post"
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-700">
                  No Posts Yet
                </h2>
              </div>
            )}
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
