import React, { Dispatch, LegacyRef, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./icons/LikeIcon";
import CloseIcon from "./icons/CloseIcon";
import SingleComment from "./SingleComment";
import { useAuth } from "../hooks/store/useAuth";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ShareIcon from "./icons/ShareIcon";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import VideoPlayer from "./VideoPlayer";
import LikeUserItem from "./LikeUserItem";
import CommentIcon from "./icons/CommentIcon";
import ShareArrowIcon from "./icons/ShareArrowIcon";

interface comment {
  _id: string;
  user: { _id: string; profileImg: string; username: string };
  postId: string;
  description: string;
  like: boolean;
  subComment: number;
  likeCount: number;
}

interface like {
  _id: string;
  user: { _id: string; profileImg: string; username: string; name: string };
  postId: string;
  itemId: string;
  type: number;
  flag: string;
}

interface post {
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
  isLike: boolean;
}

export default function SingleFeed({
  post,
  activeFeed,
  setMute,
  mute,
  postId,
}: {
  post?: post;
  activeFeed?: number;
  setMute?: Dispatch<SetStateAction<boolean>>;
  mute?: boolean;
  postId?: string;
}): React.JSX.Element {
  const [postDetail, setPostDetail] = useState<post>(post as post);
  const [openLike, setOpenLike] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(postDetail?.isLike);
  const [comment, setComment] = useState({ id: "", text: "" });
  const [commentList, setCommentList] = useState<comment[]>([]);
  const [likeList, setLikeList] = useState<like[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [activeVideoId, setActiveVideoId] = useState<string>(postDetail?.photos[0]._id);
  const { user } = useAuth();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);

  const handleLike = (id: string) => {
    postDetail.like = like ? postDetail.like - 1 : postDetail.like + 1;
    likeCreate(id);
  };
  const handleComment = (id: string, commentId?: string) => {
    postDetail.comment = postDetail.comment + 1;
    commentCreate(id, commentId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setComment((prev) => ({ id: prev.id, text: newText }));
  };

  const getPost = useCallback(
    async (id: string) => {
      try {
        const res = await apiCall({
          url: APIS.POST.GET(id),
          method: "get",
        });
        if (res.status === 200) {
          setPostDetail(res.data.data);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, setSnack]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeCreate = useCallback(
    async (id: string) => {
      try {
        const res = await apiCall({
          url: like ? APIS.LIKE.UNLIKE(id) : APIS.LIKE.LIKE,
          method: like ? "delete" : "post",
          data: { postId: id, type: 1 },
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
    [apiCall, checkAxiosError, like, setSnack]
  );

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const commentCreate = useCallback(
    async (id: string, commentId?: string) => {
      try {
        const res = await apiCall({
          url: APIS.COMMENT.POST,
          method: "post",
          data: { postId: id, commentId: commentId, description: comment.text },
        });
        if (res.status === 201) {
          setComment({ id: "", text: "" });
          getComment(id);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, comment.text, getComment, setSnack]
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

  useEffect(() => {
    if (openComment) {
      getComment(postDetail?._id);
    }
  }, [getComment, openComment, postDetail?._id]);

  useEffect(() => {
    if (!post) {
      getPost(postId as string);
    }
  }, [getPost, post, postId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLike = useCallback(
    async (id: string) => {
      if (nextPage || currPage === 0) {
        try {
          const res = await apiCall({
            url: APIS.LIKE.GETLIKE(id),
            method: "get",
          });
          if (res.status === 200) {
            if (currPage === 0) {
              setLikeList(res.data.data.getLike);
            } else {
              setLikeList((prevComments) => [...prevComments, ...res.data.data.getLike]);
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, postId: string, commentId?: string) => {
    if (e.key === "Enter") {
      handleComment(postId, commentId);
    }
  };

  useEffect(() => {
    if (openLike && postDetail?.like > 0) {
      getLike(postDetail?._id);
    }
  }, [getLike, openLike, postDetail?._id, postDetail?.like]);

  return (
    <>
      {postDetail && (
        <div className="w-full bg-white rounded-xl mb-5 p-4">
          <div className="flex items-center">
            <Link to={`/profile/${postDetail.user._id}`}>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  postDetail.user.profileImg ||
                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                }
                alt="Rounded avatar"
              />
            </Link>
            <div className="flex flex-col text-justify">
              <Link to={`/profile/${postDetail.user._id}`} className="ms-3 text-sm text-gray-600 font-bold">
                {postDetail.user.username || "social_user"}
              </Link>
              <span className="ms-3 text-sm text-gray-400">{postDetail.user.city && postDetail.user.country ? postDetail.user.city + ", " + postDetail.user.country : "India"}</span>
            </div>
          </div>
          {postDetail.description && (
            <div className="mt-2 w-full">
              <p className="text-start text-sm text-gray-700">{postDetail.description}</p>
            </div>
          )}

          {postDetail.photos.length > 0 && (
            <div className="feed-scroll w-full h-full overflow-y-auto">
              <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="swiper" onSlideChange={(swiper) => setActiveVideoId(postDetail.photos[swiper.activeIndex]._id)}>
                {postDetail.photos.map((media, index) => (
                  <SwiperSlide key={media._id + index} className="relative flex items-center justify-center flex-col">
                    {media.type === "image" ? (
                      <img className="my-3 mx-[auto] h-[409px] object-contain" src={media.url} alt="photo" />
                    ) : (
                      <>
                        <VideoPlayer
                          src={media}
                          activeVideoId={activeVideoId}
                          activeFeed={activeFeed?.toString() === postDetail._id}
                          setMute={setMute as Dispatch<SetStateAction<boolean>>}
                          mute={mute as boolean}
                        />
                      </>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="relative flex items-center justify-between">
            <div>
              {postDetail.mentionedUsers?.length > 0 && (
                <>
                  <div className="flex -space-x-3 rtl:space-x-reverse mention-avatar">
                    {postDetail.mentionedUsers.slice(0, 3).map((people) => (
                      <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src={people.profileImg} alt="avatar" key={people._id} />
                    ))}
                    {postDetail.mentionedUsers.length > 3 && (
                      <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-primary border-2 border-white rounded-full hover:bg-pink-600" href="#">
                        +{postDetail.mentionedUsers.length - 3}
                      </a>
                    )}
                    <div className="absolute bg-white border p-2 shadow-lg rounded-lg mention-user">
                      <div className="flex flex-col">
                        {postDetail.mentionedUsers.map((people) => (
                          <div key={people?._id}>
                            <div className="flex items-center m-1">
                              <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={
                                  people.profileImg ||
                                  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                                }
                                alt="Rounded avatar"
                              />
                              <div className="flex flex-col text-justify">
                                <span className="ms-3 text-sm text-gray-700 font-bold">{people.username || "socialapp_user"}</span>
                                <span className="ms-3 text-[12px] text-gray-400">{people.name}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <button className="text-gray-500 text-sm mr-6 cursor-pointer" onClick={() => postDetail.comment > 0 && setOpenComment(true)}>
                {postDetail.comment} Comments
              </button>
              <button className="text-gray-500 ml-1 text-sm cursor-pointer" onClick={() => postDetail.like > 0 && setOpenLike(true)}>
                {postDetail.like} Likes
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
            <button
              className={`flex flex-row items-center`}
              onClick={() => {
                handleLike(postDetail._id);
                setLike(!like);
              }}
            >
              <LikeIcon like={like} />
              <span className="text-gray-500 ml-1 text-sm">Like</span>
            </button>
            <button
              className="flex flex-row items-center"
              onClick={() => {
                document.getElementById(`${postDetail._id}`).focus();
              }}
            >
              <CommentIcon className="w-7 h-7 text-gray-500" />
              <span className="text-gray-500 ml-1 text-sm">Comments</span>
            </button>
            <button className="flex flex-row items-center" onClick={() => setOpenShare(true)}>
              <ShareArrowIcon className="w-6 h-6 text-gray-500" />
              <span className="text-gray-500 ml-1 text-sm">Share</span>
            </button>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
            <img
              className="w-11 h-11 rounded-full object-cover shrink-0"
              src={
                user.profileImg ||
                "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
              }
              alt="Rounded avatar"
            />
            <input
              id={postDetail._id}
              type="text"
              placeholder="Write a comment..."
              className="border-gray border rounded-xl py-3 px-4 pr-3 w-full bg-input-primary border-none my-0 mx-2 text-sm"
              onChange={(e) => setComment({ id: postDetail._id, text: e.target.value })}
              onKeyDown={(e) => handleKeyPress(e, postDetail._id)}
              value={comment.id === postDetail._id ? comment.text : ""}
            />
            <button
              className="bg-[#f48bb34c] py-1 pl-1 pr-2 rounded-xl h-[44px]"
              onClick={() => {
                if (comment.text) {
                  handleComment(postDetail._id);
                }
              }}
            >
              <ShareIcon className="text-[#DE2C70] w-[35px] h-full transform rotate-[30deg]" />
            </button>
          </div>
        </div>
      )}

      {/* like model */}
      <div className={`modal-popup-story ${openLike ? "block" : "hidden"}`}>
        <div className="w-full h-full relative flex justify-center">
          <div className="h-full absolute top-[100px] w-[580px]">
            <div className="relative w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-2">
              <button className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3" onClick={() => setOpenLike(false)}>
                <CloseIcon className="w-6 h-6"></CloseIcon>
              </button>
              <h2>Likes</h2>
            </div>
            <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white rounded-b-xl p-6 pt-2 border-t-2 border-gray-200">
              {likeList.map((likeData) => (
                <LikeUserItem likeData={likeData} setLikeList={setLikeList} key={likeData._id} />
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
              <button className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3" onClick={() => setOpenComment(false)}>
                <CloseIcon className="w-6 h-6"></CloseIcon>
              </button>
              <h2>Comments</h2>
            </div>
            <div onScroll={onScroll} ref={listInnerRef} className="feed-scroll max-h-[70%] overflow-y-auto bg-white p-6 pt-2 border-t-2 border-gray-200">
              {commentList.map((commentData) => (
                <SingleComment openComment={openComment} commentData={commentData} setComment={setComment} key={commentData._id} />
              ))}
            </div>
            <div className="bg-white rounded-b-xl px-3 py-2 border-t-2 border-gray-200 flex justify-between">
              <input
                type="text"
                placeholder="Write a comment..."
                className="border-gray border rounded-xl py-3 px-4 pr-3 w-[500px] bg-input-primary border-none my-0 text-sm"
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, postDetail._id, comment.id)}
                value={comment.text}
              />
              <button className="bg-[#f48bb34c] py-1 pl-1 pr-2 rounded-xl" onClick={() => handleComment(postDetail._id, comment.id)}>
                <ShareIcon className="text-[#DE2C70] w-[35px] h-full transform rotate-[30deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* share model */}
      <div className={`modal-popup-story ${openShare ? "block" : "hidden"}`}>
        <div className="w-full h-full relative flex justify-center items-center">
          <div className="w-auto">
            <div className="relative w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-2">
              <button className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3" onClick={() => setOpenShare(false)}>
                <CloseIcon className="w-6 h-6"></CloseIcon>
              </button>
              <h2>Share</h2>
            </div>
            <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white rounded-b-xl p-6 pt-2 border-t-2 border-gray-200 grid grid-cols-3 gap-5">
              <EmailShareButton className="mx-1" url="">
                <EmailIcon className="rounded-full h-12 w-12" />
              </EmailShareButton>
              <FacebookShareButton className="mx-1" url="">
                <FacebookIcon className="rounded-full h-12 w-12" />
              </FacebookShareButton>
              <FacebookMessengerShareButton className="mx-1" url="" appId="">
                <FacebookMessengerIcon className="rounded-full h-12 w-12" />
              </FacebookMessengerShareButton>
              <LinkedinShareButton className="mx-1" url="">
                <LinkedinIcon className="rounded-full h-12 w-12" />
              </LinkedinShareButton>
              <TelegramShareButton className="mx-1" url="">
                <TelegramIcon className="rounded-full h-12 w-12" />
              </TelegramShareButton>
              <WhatsappShareButton className="mx-1" url="">
                <WhatsappIcon className="rounded-full h-12 w-12" />
              </WhatsappShareButton>
              <TwitterShareButton className="mx-1" url="">
                <TwitterIcon className="rounded-full h-12 w-12" />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
