import React from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { Link, useNavigate, useParams } from "react-router-dom";

const posts = [
  {
    type: "photo",
    multiple: true,
    url: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    type: "video",
    multiple: false,
    url: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    type: "photo",
    multiple: false,
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    type: "video",
    multiple: true,
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    type: "",
    multiple: true,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Profile(): React.JSX.Element {
  const { accessToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center w-full">
              <img
                className="w-40 h-40 mr-2 ml-12 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Bordered avatar"
              />
              <div className="flex flex-col mx-auto items-start w-[55%]">
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-lg font-bold text-gray-700">
                    wadecooper
                  </span>
                  <div className="flex">
                    <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                      Follow
                    </button>
                    <button
                      className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-6 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                      onClick={() => navigate(`/chat/${id}`)}
                    >
                      Message
                    </button>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                  <Link
                    to={`./posts`}
                    className="text-sm font-bold text-gray-600 hover:text-gray-400"
                  >
                    2352 posts
                  </Link>
                  <Link
                    to={`./friends`}
                    className="text-sm font-bold text-gray-600 hover:text-gray-400"
                  >
                    20k followers
                  </Link>
                  <Link
                    to={`friends`}
                    className="text-sm font-bold text-gray-600 hover:text-gray-400"
                  >
                    235 following
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-gray-700 text-sm font-bold">
                    Wade Cooper
                  </h3>
                  <h4 className="text-gray-700 text-sm text-start">
                    actor
                    <br />
                    action hero
                  </h4>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-10 pt-10 grid grid-cols-3 gap-1">
              {posts.map((item) => (
                <Link to="#" className="relative">
                  <img className="" src={item.url} alt="" />
                  {item.multiple ? (
                    <img
                      className="w-5 h-5 absolute top-1 right-1"
                      src="/public/icons/multiple-pages-empty-svgrepo-com.svg"
                      alt=""
                    />
                  ) : item.type === "video" ? (
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

              {/* <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  className="w-5 h-5 absolute top-1 right-1"
                  src="/public/icons/youtube-svgrepo-com.svg"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  alt=""
                />
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
