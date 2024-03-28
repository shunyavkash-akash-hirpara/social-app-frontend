import React from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { useNavigate } from "react-router-dom";

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
                    <svg
                      className="w-6 h-6 p-1"
                      fill="#ffffff"
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 31.143 31.143"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g id="c100_arrow">
                            {" "}
                            <path d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507 c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08 c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476 l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z" />{" "}
                          </g>{" "}
                          <g id="Capa_1_46_"> </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </button>
                  <span className="text-lg font-bold text-white">
                    Notification
                  </span>
                  <span className="p-2 bg-orange-400 text-sm text-white font-bold rounded-lg ml-2">
                    23
                  </span>
                </div>
                <div>
                  <button className="w-8 h-8 p-1 bg-orange-100 rounded-lg">
                    <img
                      className="w-8"
                      src="/public/icons/read-era-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                  <button className="w-8 h-8 p-1 bg-orange-100 rounded-lg ml-2">
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
