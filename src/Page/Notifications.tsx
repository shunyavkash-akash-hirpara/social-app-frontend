import React from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { useNavigate } from "react-router-dom";
import BackIcon from "../Component/icons/BackIcon";

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Wade Cooper posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "12 minutes ago",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Arlene Mccoy posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "30 minutes ago",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    desc: "Devon Webb posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "1 hours ago",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Tom Cook posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "2 hours ago",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Tanya Fox posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "6 hours ago",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Hellen Schmidt posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "11 hours ago",
  },
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Wade Cooper posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "12 minutes ago",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Arlene Mccoy posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "30 minutes ago",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    desc: "Devon Webb posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "1 hours ago",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Tom Cook posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "2 hours ago",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Tanya Fox posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "6 hours ago",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    desc: "Hellen Schmidt posted in UI/UX Community : 'Mobile Apps UI Designer is required for Tech…'",
    date: "11 hours ago",
  },
];

export default function Notifications(): React.JSX.Element {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-between">
                <div className="flex flex-row items-center">
                  <button
                    className="w-8 mr-3 h-full place-content-center rotate-[180deg]"
                    onClick={() => navigate("/setting")}
                  >
                    <BackIcon />
                  </button>
                  <span className="text-lg font-bold text-white">
                    Notification
                  </span>
                  <span className="p-2 bg-orange-400 text-sm text-white font-bold rounded-lg ml-2">
                    23
                  </span>
                </div>
                <div>
                  <button className="w-8 h-8 p-1 rounded-lg">
                    <img
                      className="w-8"
                      src="/public/icons/read-era-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                  <button className="w-8 h-8 p-1 rounded-lg ml-2">
                    <img
                      className="w-8"
                      src="/public/icons/trash-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {peoples.map((item) => (
                <div className="relative flex items-center p-2 pb-4">
                  <img
                    className="w-11 h-11 mr-2 rounded-full"
                    src={item.avatar}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="text-sm text-gray-700">{item.desc}</h4>
                    <h5 className="text-xs text-gray-400">{item.date}</h5>
                  </div>
                  <button className="absolute right-0 w-9 h-9">
                    <img
                      className="w-9"
                      src="/public/icons/more-horizontal-svgrepo-com.svg"
                      alt="more"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
