import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import PlayIcon from "./icons/PlayIcon";
import MuteIcon from "./icons/MuteIcon";
import VolumeIcon from "./icons/VolumeIcon";

export default function VideoPlayer({
  src,
  activeVideoId,
  activeFeed,
  setMute,
  mute,
}: {
  src: { _id: string; url: string; type: string };
  activeVideoId;
  activeFeed: boolean;
  setMute: Dispatch<SetStateAction<boolean>>;
  mute: boolean;
}): React.JSX.Element {
  // const [mute, setMute] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const videoRefs: LegacyRef<HTMLVideoElement> = useRef(null);

  useEffect(() => {
    const handleWaiting = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    if (videoRefs.current) {
      videoRefs.current.addEventListener("waiting", handleWaiting);
      videoRefs.current.addEventListener("canplay", handleCanPlay);
    }
  }, []);

  useEffect(() => {
    const feedScroll = document.getElementById("feedScroll");

    const scrollCallBack = (e) => {
      // const parentBounding = e.target.getBoundingClientRect();

      const videoBounding = videoRefs.current.getBoundingClientRect();

      const viewHeight = e.target.clientHeight;
      const isVisible = !(
        videoBounding.bottom < 0 || videoBounding.top - viewHeight >= 0
      );

      if (isVisible && src._id === activeVideoId) {
        if (videoRefs.current.paused) {
          videoRefs.current.play();
          setPause(false);
        }
      } else {
        if (videoRefs.current.played) {
          videoRefs.current.pause();
          setPause(true);
        }
      }
    };
    feedScroll.addEventListener("scroll", scrollCallBack);
    return () => {
      feedScroll.removeEventListener("scroll", scrollCallBack);
    };
  }, [activeVideoId, src._id]);

  useEffect(() => {
    try {
      if (src._id === activeVideoId && !activeFeed) {
        videoRefs?.current?.play();
        videoRefs.current.muted = mute;
        setPause(false);
      } else {
        videoRefs?.current?.pause();
        setPause(true);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }, [activeFeed, activeVideoId, mute, src._id]);

  const videoPlayToggle = () => {
    if (videoRefs.current.paused) {
      videoRefs.current.play().then(() => {
        console.log("play");
        setPause(false);
      });
    } else {
      videoRefs.current.pause();
      setPause(true);
    }
  };
  const videoMuteToggle = () => {
    videoRefs.current.muted = !videoRefs.current.muted;
    setMute(videoRefs.current.muted);
  };
  return (
    <div className="relative">
      {loading ? (
        <>loading ...</>
      ) : (
        <video
          ref={videoRefs}
          onClick={videoPlayToggle}
          className="my-3 mx-[auto] rounded-xl h-[409px] object-cover scrollArea"
          src={src.url}
          muted={mute}
          autoPlay
        ></video>
      )}
      {pause && (
        <button
          className="absolute z-10 top-[45%] left-[43%]"
          onClick={videoPlayToggle}
        >
          <PlayIcon
            className={
              "h-10 w-10 border-transparent rounded-full bg-[#ffffffc7] p-2 text-gray-500 cursor-pointer"
            }
          />
        </button>
      )}

      <button className="absolute top-4 right-1" onClick={videoMuteToggle}>
        {mute ? (
          <MuteIcon
            className={
              "h-9 w-9 border-transparent rounded-full bg-[#ffffffc7] p-1 text-gray-500 cursor-pointer"
            }
          />
        ) : (
          <VolumeIcon
            className={
              "h-9 w-9 border-transparent rounded-full bg-[#ffffffc7] p-1 text-gray-500 cursor-pointer"
            }
          />
        )}
      </button>
    </div>
  );
}
