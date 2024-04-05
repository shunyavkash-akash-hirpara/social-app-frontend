import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

export default function SingleComment({
  commentData,
  setComment,
}: {
  commentData: {
    _id: string;
    user: { _id: string; profileImg: string; username: string };
    postId: string;
    description: string;
    like: boolean;
    subComment: number;
    likeCount: number;
  };
  setComment: Dispatch<SetStateAction<{ id: string; text: string }>>;
}): React.JSX.Element {
  const [commentLike, setCommentLike] = useState<boolean>(commentData.like);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

  const handleCommentLike = (id: string) => {
    commentData.likeCount = commentLike
      ? commentData.likeCount - 1
      : commentData.likeCount + 1;
    commentLikeCreate(id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const commentLikeCreate = useCallback(
    async (id: string) => {
      try {
        const res = await apiCall({
          url: commentLike ? APIS.LIKE.UNLIKE(id) : APIS.LIKE.LIKE,
          method: commentLike ? "delete" : "post",
          data: { postId: commentData.postId, commentId: id, type: 2 },
        });
        if (res.status === 200) {
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, commentData.postId, commentLike, setSnack]
  );
  return (
    <div className="flex p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
      <div className="w-[10%]">
        <Link
          to={`/profile/${commentData.user._id}`}
          className="w-12 inline-block rounded-full"
        >
          <img
            className="rounded-full w-full h-12 object-cover"
            src={commentData.user.profileImg}
            alt="Rounded avatar"
          />
        </Link>
      </div>
      <div className="flex flex-col text-justify w-[85%]">
        <Link
          to={`/profile/${commentData.user._id}`}
          className="flex flex-col text-justify"
        >
          <span className="ms-3 text-sm text-gray-700 font-bold">
            {commentData.user.username}
          </span>
        </Link>
        <span className="ms-3 text-base text-gray-600">
          {commentData.description}
        </span>
        <button
          className="text-sm text-gray-400 text-start ml-3"
          onClick={() => {
            setComment({
              id: commentData._id,
              text: "@" + commentData.user.username,
            });
          }}
        >
          Reply
        </button>
      </div>
      <div className="flex flex-col ml-3 w-[5%]">
        <button
          onClick={() => {
            handleCommentLike(commentData._id);
            setCommentLike(!commentLike);
          }}
        >
          <LikeIcon like={commentLike} />
        </button>
        <span className="text-sm text-gray-500">{commentData.likeCount}</span>
      </div>
    </div>
  );
}
