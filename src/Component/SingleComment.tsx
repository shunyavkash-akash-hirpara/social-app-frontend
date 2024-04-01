import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";

export default function SingleComment({
  people,
  setComment,
}: {
  people: {
    id: number;
    name: string;
    avatar: string;
    username: string;
    comment: string;
  };
  setComment: Dispatch<SetStateAction<{ id: string; text: string }>>;
}): React.JSX.Element {
  const [commentLike, setCommentLike] = useState<boolean>(false);

  const handleCommentLike = (id: number) => {
    console.log(id);
  };
  return (
    <div className="flex p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
      <div className="w-[10%]">
        <Link
          to={`/profile/${people.id}`}
          className="w-12 inline-block rounded-full"
        >
          <img
            className="rounded-full w-full h-auto"
            src={people.avatar}
            alt="Rounded avatar"
          />
        </Link>
      </div>
      <div className="flex flex-col text-justify w-[85%]">
        <Link
          to={`/profile/${people.id}`}
          className="flex flex-col text-justify"
        >
          <span className="ms-3 text-sm text-gray-700 font-bold">
            {people.username}
          </span>
        </Link>
        <span className="ms-3 text-base text-gray-600">{people.comment}</span>
        <button
          className="text-sm text-gray-400 text-start ml-3"
          onClick={() => {
            setComment({
              id: people.id.toString(),
              text: "@" + people.username,
            });
          }}
        >
          Reply
        </button>
      </div>
      <button
        className={`flex flex-row ml-3 w-[5%]`}
        onClick={() => {
          setCommentLike(!commentLike);
          handleCommentLike(people.id);
        }}
      >
        <LikeIcon like={commentLike} />
      </button>
    </div>
  );
}
