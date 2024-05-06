import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ChatBox from "./ChatBox";
import StoryModel from "./StoryModel";
import SearchIcon from "./icons/SearchIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import ChatListItem from "./ChatListItem";
import { socket } from "../socket";
import PlusIcon from "./icons/PlusIcon";

interface user {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  conversationId: string;
  unread_msg?: number;
}

interface story {
  loginUser: boolean;
  story: { url: string; type: string }[];
  follow_friend: {
    _id: string;
    username: string;
    name: string;
    profileImg: string;
  };
}

export default function RecentChat(): React.JSX.Element {
  const [openChat, setOpenChat] = useState(false);
  const [openStory, setOpenStory] = useState(false);
  const [chatUser, setChatUser] = useState<user>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);
  const [storyList, setStoryList] = useState<story[]>([]);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const { user } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createStory = useCallback(
    async (story: File) => {
      const formData = new FormData();
      if (story) {
        formData.append("story", story);
      }
      try {
        const res = await apiCall({
          url: APIS.STORY.POST,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        if (res.status === 201) {
          console.log(res.data.data);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, setSnack]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStoryList = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.STORY.GET,
        method: "get",
      });
      if (res.status === 200) {
        setStoryList(res.data.data);
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
    socket.on("newChatUser", (data) => {
      setUsers((prev) => [data, ...prev]);
    });
    return () => {
      socket.off("newChatUser");
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const recentChatList = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.CHAT.CHATLIST,
        method: "get",
      });
      if (res.status === 200) {
        setUsers(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchUser = useCallback(
    async (searchData: string) => {
      try {
        const res = await apiCall({
          url: APIS.USER.SEARCHUSER,
          method: "post",
          data: { username: searchData.toLowerCase() },
        });
        if (res.status === 200) {
          setUsers(res.data.data);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, setSnack]
  );

  useEffect(() => {
    recentChatList();
    getStoryList();
  }, [getStoryList, recentChatList]);

  useEffect(() => {
    if (!search) recentChatList(); // Exit early if search is falsy
    else searchUser(search);
  }, [recentChatList, search, searchUser]);
  return (
    <>
      <aside id="separator-sidebar" className="fixed top-14 right-0 w-80 h-screen sm:translate-x-0 border-t-2 border-[#F6F5F7]" aria-label="Sidebar">
        <div className="h-full px-4 py-4 overflow-y-auto bg-white">
          <Swiper className="swiper" spaceBetween={3} slidesPerView={4}>
            <SwiperSlide className="relative flex items-center justify-center flex-col pt-1">
              <button onClick={() => setOpenStory(true)}>
                <img className="w-14 h-14 rounded-full object-cover" src={user.profileImg} alt="Bordered avatar" />
                {storyList[0]?.loginUser && (
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -top-[3px] left-0">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#DE2C70"
                      strokeWidth="3"
                      strokeDasharray={`${(((2 * 22) / 7) * 45 - 4 * storyList[0]?.story.length) / storyList[0]?.story.length} ${storyList[0]?.story.length === 1 ? "0" : "4"}`}
                    />
                  </svg>
                )}
              </button>
              <label htmlFor="story-add">
                <input
                  id="story-add"
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.mp4,.mkv"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      createStory(file);
                    }
                  }}
                />
                <PlusIcon className="w-4 h-4 text-primary border-2 rounded-full bg-white absolute bottom-5 left-7 cursor-pointer" />
              </label>
              <span className="text-sm mt-2">Add</span>
            </SwiperSlide>
            {storyList.map((item, index) => {
              if (index === 0 && item.loginUser) {
                return;
              }
              return (
                <SwiperSlide className="relative flex items-center justify-center flex-col pt-1" key={item.follow_friend._id}>
                  <button onClick={() => setOpenStory(true)}>
                    <img className="w-14 h-14 rounded-full object-cover" src={item.follow_friend.profileImg} alt="Bordered avatar" />
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="absolute -top-[3px] left-0">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke="#DE2C70"
                        strokeWidth="3"
                        strokeDasharray={`${(((2 * 22) / 7) * 45 - 4 * item.story.length) / item.story.length} ${item.story.length === 1 ? "0" : "4"}`}
                      />
                    </svg>
                  </button>
                  <span className="text-xs mt-2">{item.follow_friend.username.length > 8 ? item.follow_friend.username.slice(0, 8) + "..." : item.follow_friend.username}</span>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <ul className="space-y-2 font-medium">
            <li>
              <div className="text-gray-700 font-bold text-left ml-2 mt-5 mb-2">Recent Chats</div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Search"
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </li>
            {users.map((people) => (
              <ChatListItem setChatUser={setChatUser} chatUser={chatUser} people={people} key={people._id} chatBox={true} setOpenChat={setOpenChat} />
            ))}
            {chatUser && (
              <div className={`modal-popup-chat ${openChat ? "block" : "hidden"}`}>
                <ChatBox setOpenChat={setOpenChat} chatUser={chatUser} />
              </div>
            )}
          </ul>
        </div>
      </aside>
      {openStory && (
        <div className={`modal-popup-story ${openStory ? "block" : "hidden"}`}>
          <StoryModel activeSlide={activeSlide} setActiveSlide={setActiveSlide} setOpenStory={setOpenStory} openStory={openStory} storyList={storyList} />
        </div>
      )}
    </>
  );
}
