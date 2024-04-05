import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { Link } from "react-router-dom";

interface peoples {
  id: number;
  name: string;
  avatar: string;
  username: string;
}
[];

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
  },
];

export default function FriendList(): React.JSX.Element {
  const [users, setUsers] = useState<peoples[]>([]);
  const [tab, setTab] = useState<string>("followers");
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!tab) return;
    setUsers(peoples);
  }, [tab]);
  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

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
                      setUsers(peoples);
                    }}
                  >
                    6 followers
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
                      setUsers(peoples);
                    }}
                  >
                    7 following
                  </button>
                </li>
              </ul>
            </div>
            {users.map((people) => (
              <div
                key={people.id}
                className="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
              >
                <Link
                  to={`/profile/${people.id}`}
                  className="flex items-center"
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={people.avatar}
                    alt="Rounded avatar"
                  />
                  <div className="flex flex-col text-justify">
                    <span className="ms-3 text-sm text-gray-700 font-bold">
                      {people.username}
                    </span>
                    <span className="ms-3 text-[12px] text-gray-400">
                      {people.name}
                    </span>
                  </div>
                </Link>
                {tab === "following" ? (
                  <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                    Following
                  </button>
                ) : (
                  <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
