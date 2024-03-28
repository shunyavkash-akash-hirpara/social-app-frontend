import React, { Dispatch, SetStateAction, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CloseIcon from "./icons/CloseIcon";

interface Swiper {}

export default function StoryModel({
  setOpenStory,
  openStory,
  activeSlide,
  setActiveSlide,
}: {
  setOpenStory: Dispatch<SetStateAction<boolean>>;
  openStory: boolean;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
}): React.JSX.Element {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (
    swiper: Swiper,
    time: number,
    progress: number
  ) => {
    if (openStory && progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    if (openStory && progressContent.current?.innerHTML === "0s") {
      setOpenStory(false);
    }
  };
  return (
    <div className="h-full block relative">
      <div>
        <button
          className="p-2 rounded-full border-2 border-white text-white absolute right-2 top-2"
          onClick={() => setOpenStory(false)}
        >
          <CloseIcon className="w-6 h-6"></CloseIcon>
        </button>
        <Swiper
          initialSlide={activeSlide}
          onSlideChange={(swiper) => {
            if (swiper.isEnd) {
              setActiveSlide(0);
              return;
            }
            setActiveSlide((prevSlide) => {
              return prevSlide + 1;
            });
          }}
          className="transform translate-y-[50%]"
          autoplay={{
            delay: 500,
            disableOnInteraction: true,
            stopOnLastSlide: true,
          }}
          navigation
          modules={[Autoplay, EffectCube, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          <SwiperSlide className="flex items-center justify-center">
            <img src="https://cdn.pixabay.com/photo/2018/01/18/19/06/time-3091031__340.jpg" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <img src="https://cdn.pixabay.com/photo/2017/09/30/22/16/rail-2803725__340.jpg" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <img src="https://cdn.pixabay.com/photo/2017/06/06/06/03/freezing-earth-2376303__340.jpg" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <img src="https://cdn.pixabay.com/photo/2017/09/30/22/16/rail-2803725__340.jpg" />
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
