import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ChatBox from "./ChatBox";
import StoryModel from "./StoryModel";

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
  const [chatUser, setChatUser] = useState({ avatar: "", name: "" });
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-14 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 border-t-2 border-[#F6F5F7]"
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
              <SwiperSlide className="flex items-center justify-center flex-col">
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
              <div className="text-gray-700 font-bold text-left ml-2 mt-5">
                Recent Chats
              </div>
            </li>
            {peoples.map((people) => (
              <li className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
                <img
                  className="w-10 h-10 rounded-full"
                  src={people.avatar}
                  alt="Rounded avatar"
                />
                <div className="flex flex-col text-justify">
                  <span className="ms-3 text-sm text-gray-700">
                    {people.name}
                  </span>
                  <span className="ms-3 text-[13px] text-gray-400">
                    {people.location}
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