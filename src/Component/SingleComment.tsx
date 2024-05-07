import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import SingleSubComment from "./SingleSubComment";

interface subcomment {
  _id: string;
  user: { _id: string; profileImg: string; username: string };
  postId: string;
  commentId: string;
  description: string;
  like: boolean;
  likeCount: number;
}

export default function SingleComment({
  commentData,
  setComment,
  openComment,
}: {
  commentData: {
    _id: string;
    user: { _id: string; profileImg: string; username: string };
    postId: string;
    description: string;
    like: boolean;
    subComment?: number;
    likeCount: number;
  };
  setComment?: Dispatch<SetStateAction<{ id: string; text: string }>>;
  openComment?: boolean;
}): React.JSX.Element {
  const [commentLike, setCommentLike] = useState<boolean>(commentData.like);
  const [subCommentList, setSubCommentList] = useState<subcomment[]>([]);
  const [viewSubComment, setViewSubComment] = useState<boolean>(false);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getComment = useCallback(
    async (id: string) => {
      if (nextPage || currPage === 0) {
        try {
          const res = await apiCall({
            url: APIS.COMMENT.GETSUBCOMMENT(id),
            method: "get",
            params: { limit: 20, page: currPage },
          });
          if (res.status === 200) {
            if (currPage === 0) {
              setSubCommentList(res.data.data.comment);
            } else {
              setSubCommentList((prevComments) => [
                ...prevComments,
                ...res.data.data.comment,
              ]);
            }
            setNextPage(res.data.data.hasNextPage);
            setSnack(res.data.message);
          }
        } catch (error) {
          if (checkAxiosError(error)) {
            const errorMessage = error?.response?.data.message;
            setSnack(errorMessage, "warning");
          }
        }
      }
    },
    [apiCall, checkAxiosError, currPage, nextPage, setSnack]
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

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

  useEffect(() => {
    if (!openComment) {
      setViewSubComment(false);
    }
  }, [openComment]);

  return (
    <>
      <div className="flex p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group">
        <div className="w-[10%]">
          <Link
            to={commentData.user && `/profile/${commentData.user._id}`}
            className="w-12 inline-block rounded-full"
          >
            <img
              className="rounded-full w-full h-12 object-cover"
              src={
                commentData.user
                  ? commentData.user.profileImg
                  : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
              }
              alt="Rounded avatar"
            />
          </Link>
        </div>
        <div className="flex flex-col text-justify w-[85%]">
          <Link
            to={commentData.user ? `/profile/${commentData.user._id}` : "#"}
            className="flex flex-col text-justify"
          >
            <span className="ms-3 text-sm text-gray-700 font-bold">
              {commentData.user ? commentData.user.username : "socialapp_user"}
            </span>
          </Link>
          <span className="ms-3 text-base text-gray-600">
            {commentData.description}
          </span>
          <div className="flex items-center">
            <button
              className="text-sm text-gray-400 text-start ml-3"
              onClick={() => {
                setComment({
                  id: commentData._id,
                  text: "@" + commentData.user.username,
                });
              }}
              disabled={!commentData.user}
            >
              Reply
            </button>
            {commentData.subComment > 0 && (
              <button
                className="text-sm text-gray-400 text-start ml-3"
                onClick={() => {
                  setViewSubComment((prev) => {
                    if (!prev) {
                      getComment(commentData._id);
                    }
                    return !prev;
                  });
                }}
              >
                View {commentData.subComment} more replies
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col ml-3 w-[5%]">
          <button
            disabled={!commentData.user}
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
      {/* subcomment */}
      {viewSubComment && (
        <>
          <div onScroll={onScroll} ref={listInnerRef}>
            {subCommentList.map((commentData) => (
              <SingleSubComment
                commentData={commentData}
                setComment={setComment}
                key={commentData._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
