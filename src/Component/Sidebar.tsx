import React from "react";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "./icons/FeedIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import MessageIcon from "./icons/MessageIcon";
import SettingIcon from "./icons/SettingIcon";

const siderbarItems = [
  {
    name: "Feed",
    href: "/",
    svg: <FeedIcon />,
  },
  {
    name: "My favorites",
    href: "#",
    svg: <FavoriteIcon />,
  },
  {
    name: "Messages",
    href: "/chat/:id",
    svg: <MessageIcon />,
  },
  {
    name: "Settings",
    href: "/setting",
    svg: <SettingIcon />,
  },
];

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

export default function Sidebar(): React.JSX.Element {
  const location = useLocation();
  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-14 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-t-2 border-[#F6F5F7]"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {siderbarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                    location.pathname === item.href && "text-[#FCDEE9]"
                  }`}
                >
                  {item.svg}
                  <span
                    className={`ms-3 text-gray-500 text-sm transition duration-75 group-hover:text-gray-900 ${
                      location.pathname === item.href && "text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
            <li>
              <div className="text-gray-700 font-bold text-left ml-2">
                My Contacts
              </div>
            </li>
            {peoples.map((people) => (
              <li key={people.id}>
                <Link
                  to="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                >
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
