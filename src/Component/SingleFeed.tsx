import React, { useState } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";
import CloseIcon from "./icons/CloseIcon";

interface likePeoples {
  id: number;
  name: string;
  avatar: string;
  username: string;
}
[];

const likePeoples = [
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

export default function SingleFeed({
  item,
  peoples,
}: {
  item: {
    id: number;
    name: string;
    avatar: string;
    location: string;
    description?: string;
  };
  peoples: {
    id: number;
    name: string;
    avatar: string;
    location?: string;
  }[];
}): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [comment, setComment] = useState({ id: "", text: "" });
  const handleLike = (id: number) => {
    console.log(id);
  };
  return (
    <>
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
            <span className="ms-3 text-sm text-gray-400">{item.location}</span>
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
            <button className="text-gray-500 text-sm mr-6 cursor-pointer">
              13 Comments
            </button>
            <button
              className="text-gray-500 ml-1 text-sm cursor-pointer"
              onClick={() => setOpen(true)}
            >
              340 Likes
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
          <button
            className={`flex flex-row items-center`}
            onClick={() => {
              setLike(!like);
              handleLike(item.id);
            }}
          >
            <LikeIcon like={like} />
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
              setComment({ id: item.id.toString(), text: e.target.value })
            }
            value={comment.id === item.id.toString() ? comment.text : ""}
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
      <div className={`modal-popup-story ${open ? "block" : "hidden"}`}>
        <button
          className="p-2 rounded-full border-2 border-white text-white absolute right-2 top-2"
          onClick={() => setOpen(false)}
        >
          <CloseIcon className="w-6 h-6"></CloseIcon>
        </button>
        <div className="w-full h-full relative flex justify-center">
          <div className="h-full absolute top-[100px] w-[580px]">
            <div className="w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-0">
              Likes
            </div>
            <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white rounded-b-xl p-6">
              {likePeoples.map((people) => (
                <div className="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
