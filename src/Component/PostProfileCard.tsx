import React, { Dispatch, SetStateAction } from "react";
import MultipleAssetsIcon from "./icons/MultipleAssetsIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
interface item {
  _id: string;
  photos: {
    type: string;
    url: string;
  }[];
}

export default function PostProfileCard({
  item,
  setViewPost,
  setSelectPost,
}: {
  item: item;
  setViewPost: Dispatch<SetStateAction<boolean>>;
  setSelectPost: Dispatch<SetStateAction<string>>;
}): React.JSX.Element {
  return (
    <>
      <button
        onClick={() => {
          setViewPost(true);
          setSelectPost(item._id);
        }}
        className="relative"
      >
        {item.photos[0].type === "image" ? (
          <img className="h-[248px] w-full object-top object-cover" src={item.photos[0].url} alt="" />
        ) : (
          <video className="h-[248px] w-full object-top object-cover" src={item.photos[0].url}></video>
        )}

        {item.photos.length > 1 ? (
          <MultipleAssetsIcon className="w-5 h-5 absolute top-1 right-1 text-white" />
        ) : item.photos[0].type === "video" ? (
          <YoutubeIcon className="w-5 h-5 absolute top-1 right-1 text-white" />
        ) : (
          ""
        )}
      </button>
    </>
  );
}
