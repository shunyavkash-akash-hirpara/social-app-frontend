import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ChatBox from "./ChatBox";
import StoryModel from "./StoryModel";
import SearchIcon from "./icons/SearchIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

interface peoples {
  id: number;
  name: string;
  avatar: string;
  location: string;
}
[];
interface user {
  _id: number;
  name: string;
  username: string;
  profileImg: string;
}
[];

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Surat,India",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Mumbai,India",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    location: "Kolkata,India",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Chennai,India",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Delhi,India",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Jammu,India",
  },
];

export default function RecentChat(): React.JSX.Element {
  const [openChat, setOpenChat] = useState(false);
  const [openStory, setOpenStory] = useState(false);
  const [chatUser, setChatUser] = useState({ profileImg: "", username: "" });
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

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
  }, [recentChatList]);

  useEffect(() => {
    if (!search) recentChatList(); // Exit early if search is falsy
    else searchUser(search);
  }, [recentChatList, search, searchUser]);
  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-14 right-0 w-80 h-screen sm:translate-x-0 border-t-2 border-[#F6F5F7]"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <Swiper className="swiper" spaceBetween={5} slidesPerView={4}>
            <SwiperSlide className="relative flex items-center justify-center flex-col">
              <button>
                <img
                  className="w-14 h-14 rounded-full ring-2 ring-primary"
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Bordered avatar"
                />
              </button>
              <label htmlFor="story-add">
                <input id="story-add" type="file" className="hidden" />
                <img
                  className="border-2 rounded-full bg-white absolute bottom-5 left-6 cursor-pointer"
                  width={18}
                  src="/public/icons/plus-large-svgrepo-com.svg"
                  alt="plus-icon"
                />
              </label>
              <span className="text-sm mt-2">Add</span>
            </SwiperSlide>
            {peoples.map((item) => (
              <SwiperSlide
                className="flex items-center justify-center flex-col"
                key={item.id}
              >
                <button onClick={() => setOpenStory(true)}>
                  <img
                    className="w-14 h-14 rounded-full ring-2 ring-primary"
                    src={item.avatar}
                    alt="Bordered avatar"
                  />
                </button>
                <span className="text-sm mt-2">{item.name.split(" ")[0]}</span>
              </SwiperSlide>
            ))}
          </Swiper>
          <ul className="space-y-2 font-medium">
            <li>
              <div className="text-gray-700 font-bold text-left ml-2 mt-5 mb-2">
                Recent Chats
              </div>
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
              <li
                key={people._id}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={people.profileImg}
                  alt="Rounded avatar"
                />
                <div className="flex flex-col text-justify">
                  <span className="ms-3 text-sm text-gray-700">
                    {people.name}
                  </span>
                  <span className="ms-3 text-[13px] text-gray-400">
                    {people.username}
                  </span>
                </div>
                <button
                  className="block ml-[auto]"
                  onClick={() => {
                    setOpenChat(true);
                    setChatUser(people);
                  }}
                >
                  <img
                    width={25}
                    src="/public/icons/chat-svgrepo-com.svg"
                    alt="chat-icon"
                  />
                </button>
              </li>
            ))}
            <div
              className={`modal-popup-chat ${openChat ? "block" : "hidden"}`}
            >
              <ChatBox setOpenChat={setOpenChat} chatUser={chatUser} />
            </div>
          </ul>
        </div>
      </aside>
      {openStory && (
        <div className={`modal-popup-story ${openStory ? "block" : "hidden"}`}>
          <StoryModel
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            setOpenStory={setOpenStory}
            openStory={openStory}
          />
        </div>
      )}
    </>
  );
}
