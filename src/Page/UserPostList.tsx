import React, { useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { Link } from "react-router-dom";

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
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis amet voluptatem praesentium?",
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
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis possimus culpa tempore. Repellat recusandae quisquam deserunt quam voluptates rerum officiis harum necessitatibus corrupti voluptate delectus exercitationem modi eum cupiditate, sint ducimus quasi dignissimos molestiae?",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Jammu,India",
  },
];

export default function UserPostList(): React.JSX.Element {
  const { accessToken } = useAuth();
  const [comment, setComment] = useState({ id: "", text: "" });

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-[580px] mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl">
            {/* feed data */}
            {peoples.map((item) => (
              <div className="w-full bg-white rounded-xl mb-5 p-4">
                <div className="flex items-center">
                  <Link to={`/profile/${item.id}`}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.avatar}
                      alt="Rounded avatar"
                    />
                  </Link>
                  <div className="flex flex-col text-justify">
                    <Link
                      to={`/profile/${item.id}`}
                      className="ms-3 text-sm text-gray-600 font-bold"
                    >
                      {item.name}
                    </Link>
                    <span className="ms-3 text-sm text-gray-400">
                      {item.location}
                    </span>
                  </div>
                </div>
                {item.description && (
                  <div className="mt-2 w-full">
                    <p className="text-start text-sm text-gray-700">
                      {item.description}
                    </p>
                  </div>
                )}

                <img
                  className="my-3 mx-[auto] rounded-xl h-[409px] object-cover"
                  src={item.avatar}
                  alt="photo"
                />

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {peoples.slice(0, 3).map((people) => (
                      <img
                        className="w-8 h-8 border-2 border-white rounded-full"
                        src={people.avatar}
                        alt=""
                      />
                    ))}

                    <a
                      className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-primary border-2 border-white rounded-full hover:bg-pink-600"
                      href="#"
                    >
                      +{peoples.length - 3}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm mr-6 cursor-pointer">
                      13 Comments
                    </span>
                    <span className="text-gray-500 ml-1 text-sm cursor-pointer">
                      340 Likes
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
                  <button className="flex flex-row items-center">
                    <img
                      width={25}
                      src="/public/icons/heart-alt-svgrepo-com.svg"
                      alt="like"
                    />
                    <span className="text-gray-500 ml-1 text-sm">Like</span>
                  </button>
                  <button className="flex flex-row items-center">
                    <img
                      width={25}
                      src="/public/icons/comment-1-svgrepo-com.svg"
                      alt="comment"
                    />
                    <span className="text-gray-500 ml-1 text-sm">Comments</span>
                  </button>
                  <button className="flex flex-row items-center">
                    <img
                      width={25}
                      src="/public/icons/share-arrow-svgrepo-com.svg"
                      alt="share"
                    />
                    <span className="text-gray-500 ml-1 text-sm">Share</span>
                  </button>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
                  <img
                    className="w-11 h-11 rounded-full"
                    src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                    alt="Rounded avatar"
                  />
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="border-gray border rounded-xl py-3 px-4 pr-3 w-[432px] bg-input-primary border-none my-0 text-sm"
                    onChange={(e) =>
                      setComment({
                        id: item.id.toString(),
                        text: e.target.value,
                      })
                    }
                    value={
                      comment.id === item.id.toString() ? comment.text : ""
                    }
                  />
                  <button
                    className="bg-[#f48bb34c] py-1 pl-1 pr-2 rounded-xl"
                    onClick={() => console.log(comment.text)}
                  >
                    <img
                      className="transform rotate-[30deg]"
                      width={35}
                      src="/public/icons/share-1-svgrepo-com.svg"
                      alt="enter"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
