import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Link } from "react-router-dom";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import Loader from "./icons/Loader";

interface like {
  _id: string;
  user: { _id: string; profileImg: string; username: string; name: string };
  postId: string;
  itemId: string;
  type: number;
  flag: string;
}

export default function LikeUserItem({
  likeData,
  setLikeList,
}: {
  likeData: like;
  setLikeList: Dispatch<SetStateAction<like[]>>;
}): React.JSX.Element {
  const { apiCall, checkAxiosError, isLoading } = useApi();
  const { setSnack } = useSnack();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFollow = useCallback(async () => {
    try {
      const res = await apiCall({
        url:
          likeData.flag === "follow"
            ? APIS.FOLLOW.FOLLOW
            : APIS.FOLLOW.UNFOLLOW,
        method: "post",
        data: { follow: likeData.user._id },
      });
      if (res.status === 201 || res.status === 200) {
        setLikeList((prev) =>
          prev.map((data) => {
            if (data._id === likeData._id) {
              // If the data ID matches likeData ID, toggle the flag property
              return {
                ...data,
                flag: data.flag === "follow" ? "following" : "follow",
              };
            }
            return data; // Return unchanged data if ID doesn't match
          })
        );
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [
    apiCall,
    checkAxiosError,
    likeData._id,
    likeData.flag,
    likeData.user?._id,
    setLikeList,
    setSnack,
  ]);
  return (
    <div
      key={likeData._id}
      className="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
    >
      <Link
        to={likeData.user ? `/profile/${likeData.user._id}` : "#"}
        className="flex items-center"
      >
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            likeData.user
              ? likeData.user.profileImg
              : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          }
          alt="Rounded avatar"
        />
        <div className="flex flex-col text-justify">
          <span className="ms-3 text-sm text-gray-700 font-bold">
            {likeData.user ? likeData.user.username : "socialapp_user"}
          </span>
          <span className="ms-3 text-[12px] text-gray-400">
            {likeData.user && likeData.user.name}
          </span>
        </div>
      </Link>
      {likeData.flag !== "loginUser" && likeData.user && (
        <button
          className="flex rounded-lg capitalize border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold px-7 py-2 mr-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
          onClick={handleFollow}
          disabled={isLoading}
        >
          {isLoading ? <Loader className="w-6 h-6" /> : likeData.flag}
        </button>
      )}
    </div>
  );
}
