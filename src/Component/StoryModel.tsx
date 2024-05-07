import React, { Dispatch, Fragment, SetStateAction } from "react";
import Stories from "react-insta-stories";
import CloseIcon from "./icons/CloseIcon";

interface story {
  loginUser: boolean;
  story: { url: string; type: string }[];
  follow_friend: {
    _id: string;
    username: string;
    name: string;
    profileImg: string;
  };
}

export default function StoryModel({
  setOpenStory,
  storyList,
}: {
  setOpenStory: Dispatch<SetStateAction<boolean>>;
  openStory: boolean;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  storyList: story[];
}): React.JSX.Element {
  return (
    <div className="h-full block relative">
      <button
        className="p-2 rounded-full border-2 border-white text-white absolute right-2 top-2"
        onClick={() => setOpenStory(false)}
      >
        <CloseIcon className="w-6 h-6"></CloseIcon>
      </button>

      <div className="flex items-center justify-center h-full">
        {storyList.map((item) => (
          <Fragment key={item.follow_friend._id}>
            <Stories
              stories={item.story}
              defaultInterval={1500}
              width={432}
              height={768}
              onAllStoriesEnd={() => {
                setOpenStory(false);
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
