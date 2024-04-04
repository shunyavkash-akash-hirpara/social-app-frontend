import React, { useState } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";
import CloseIcon from "./icons/CloseIcon";
import SingleComment from "./SingleComment";
import { useAuth } from "../hooks/store/useAuth";

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
    id: 7,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
  },
  {
    id: 8,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
  },
  {
    id: 9,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
  },
  {
    id: 10,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
  },
  {
    id: 11,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
  },
  {
    id: 12,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
  },
];

const CommentPeoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
    comment: "vvdsccfvsdd",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
    comment: "le bolo...",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
    comment: "wat chhe ho!!!",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
    comment: "jordar bapu",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
    comment: "awesome",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
    comment: "well played",
  },
  {
    id: 7,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quis.",
  },
  {
    id: 8,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
    comment: "vvdsccfvsdd",
  },
  {
    id: 9,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
    comment: "great",
  },
  {
    id: 10,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
    comment: "good",
  },
  {
    id: 11,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
    comment: "thanks",
  },
  {
    id: 12,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
    comment: "nice",
  },
];

export default function SingleFeed({
  post,
}: {
  post: {
    _id: string;
    user: {
      _id: string;
      username: string;
      profileImg: string;
      city?: string;
      country?: string;
    };
    description?: string;
    mentionedUsers: {
      _id: string;
      username: string;
      name: string;
      profileImg: string;
    }[];
    photos: { _id: string; url: string; type: string }[];
    like: number;
    comment: number;
  };
}): React.JSX.Element {
  const [openLike, setOpenLike] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [comment, setComment] = useState({ id: "", text: "" });
  const { user } = useAuth();

  const handleLike = (id: string) => {
    post.like = like ? post.like - 1 : post.like + 1;
    console.log(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setComment((prev) => ({ id: prev.id, text: newText }));
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl mb-5 p-4">
        <div className="flex items-center">
          <Link to={`/profile/${post._id}`}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={
                post.user.profileImg ||
                "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
              }
              alt="Rounded avatar"
            />
          </Link>
          <div className="flex flex-col text-justify">
            <Link
              to={`/profile/${post.user._id}`}
              className="ms-3 text-sm text-gray-600 font-bold"
            >
              {post.user.username || "social_user"}
            </Link>
            <span className="ms-3 text-sm text-gray-400">
              {post.user.city && post.user.country
                ? post.user.city + "," + post.user.country
                : "India"}
            </span>
          </div>
        </div>
        {post.description && (
          <div className="mt-2 w-full">
            <p className="text-start text-sm text-gray-700">
              {post.description}
            </p>
          </div>
        )}

        {post.photos.length > 0 &&
          post.photos.map((media) => (
            <img
              className="my-3 mx-[auto] rounded-xl h-[409px] object-cover"
              src={media.url}
              alt="photo"
            />
          ))}

        <div className="flex items-center justify-between">
          <div className="">
            {post.mentionedUsers.length > 0 && (
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {post.mentionedUsers.slice(0, 3).map((people) => (
                  <img
                    className="w-8 h-8 border-2 border-white rounded-full object-cover"
                    src={people.profileImg}
                    alt=""
                    key={people._id}
                  />
                ))}
                {post.mentionedUsers.length > 3 && (
                  <a
                    className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-primary border-2 border-white rounded-full hover:bg-pink-600"
                    href="#"
                  >
                    +{post.mentionedUsers.length - 3}
                  </a>
                )}
              </div>
            )}
          </div>
          <div>
            <button
              className="text-gray-500 text-sm mr-6 cursor-pointer"
              onClick={() => setOpenComment(true)}
            >
              {post.comment} Comments
            </button>
            <button
              className="text-gray-500 ml-1 text-sm cursor-pointer"
              onClick={() => setOpenLike(true)}
            >
              {post.like} Likes
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
          <button
            className={`flex flex-row items-center`}
            onClick={() => {
              setLike(!like);
              handleLike(post._id);
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
            className="w-11 h-11 rounded-full object-cover"
            src={
              user.profileImg ||
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
            alt="Rounded avatar"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="border-gray border rounded-xl py-3 px-4 pr-3 w-[432px] bg-input-primary border-none my-0 text-sm"
            onChange={(e) => setComment({ id: post._id, text: e.target.value })}
            value={comment.id === post._id ? comment.text : ""}
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

      {/* like model */}
      <div className={`modal-popup-story ${openLike ? "block" : "hidden"}`}>
        <div className="w-full h-full relative flex justify-center">
          <div className="h-full absolute top-[100px] w-[580px]">
            <div className="relative w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-2">
              <button
                className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3"
                onClick={() => setOpenLike(false)}
              >
                <CloseIcon className="w-6 h-6"></CloseIcon>
              </button>
              <h2>Likes</h2>
            </div>
            <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white rounded-b-xl p-6 pt-2 border-t-2 border-gray-200">
              {likePeoples.map((people) => (
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
                  <button className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                    Following
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* comment model */}
      <div className={`modal-popup-story ${openComment ? "block" : "hidden"}`}>
        <div className="w-full h-full relative flex justify-center">
          <div className="h-full absolute top-[100px] w-[580px]">
            <div className="relative w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-2">
              <button
                className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3"
                onClick={() => setOpenComment(false)}
              >
                <CloseIcon className="w-6 h-6"></CloseIcon>
              </button>
              <h2>Comments</h2>
            </div>
            <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white p-6 pt-2 border-t-2 border-gray-200">
              {CommentPeoples.map((people) => (
                <SingleComment
                  people={people}
                  setComment={setComment}
                  key={people.id}
                />
              ))}
            </div>
            <div className="bg-white rounded-b-xl px-3 py-2 border-t-2 border-gray-200 flex justify-between">
              <input
                type="text"
                placeholder="Write a comment..."
                className="border-gray border rounded-xl py-3 px-4 pr-3 w-[500px] bg-input-primary border-none my-0 text-sm"
                onChange={handleChange}
                value={comment.text}
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
        </div>
      </div>
    </>
  );
}
