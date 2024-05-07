import React, { Dispatch, LegacyRef, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import SingleFeed from "./SingleFeed";
import CloseIcon from "./icons/CloseIcon";
import SingleComment from "./SingleComment";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

interface comment {
  _id: string;
  user: { _id: string; profileImg: string; username: string };
  postId: string;
  description: string;
  like: boolean;
  subComment: number;
  likeCount: number;
}

export default function PostDetail({ setViewPost, viewPost, postId }: { setViewPost: Dispatch<SetStateAction<boolean>>; viewPost: boolean; postId: string }): React.JSX.Element {
  const [commentList, setCommentList] = useState<comment[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getComment = useCallback(
    async (id: string) => {
      if (nextPage || currPage === 0) {
        try {
          const res = await apiCall({
            url: APIS.COMMENT.GETCOMMENT(id),
            method: "get",
            params: { limit: 20, page: currPage },
          });
          if (res.status === 200) {
            if (currPage === 0) {
              setCommentList(res.data.data.comment);
            } else {
              setCommentList((prevComments) => [...prevComments, ...res.data.data.comment]);
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

  useEffect(() => {
    getComment(postId);
  }, [getComment, postId]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <>
      <div
        className={`fixed w-full h-full bg-[#00000090] top-0 left-0 flex items-center justify-center z-10 transition-all duration-300 ease-in-out ${
          viewPost ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        <div className="bg-white w-[60%] flex justify-center rounded-xl">
          <button className="p-1 rounded-xl bg-white border-2 border-grey text-gray-400 absolute right-2 top-3" onClick={() => setViewPost(false)}>
            <CloseIcon className="w-6 h-6"></CloseIcon>
          </button>
          <div className="w-[60%] border-r">
            <SingleFeed postId={postId} />
          </div>
          <div className="w-[40%] rounded-xl">
            <div className="w-full h-full relative">
              <div className="h-full">
                <div className="relative rounded-xl w-full text-base font-bold text-gray-700 bg-white p-6 pb-2">
                  <h2>Comments</h2>
                </div>
                <div onScroll={onScroll} ref={listInnerRef} className="feed-scroll w-full overflow-y-auto bg-white p-3 pt-2 border-t-2 border-gray-200 rounded-br-xl">
                  {commentList.length > 0 ? commentList.map((commentData) => <SingleComment commentData={commentData} key={commentData._id} />) : <h3>No comments</h3>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
