import React, { useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RecentChat from "./RecentChat";
import { useAuth } from "../hooks/store/useAuth";
import { Outlet } from "react-router-dom";
import { useCallRequest } from "../hooks/store/useCallRequest";
import Draggable from "react-draggable";
import CloseIcon from "./icons/CloseIcon";
import { useOnCall } from "../hooks/store/useOnCall";
import MicOnIcon from "../Component/icons/MicOnIcon";
import MicOffIcon from "../Component/icons/MicOffIcon";
import VideoOffIcon from "../Component/icons/VideoOffIcon";
import ScreenIcon from "../Component/icons/ScreenIcon";
import ShareIcon from "./icons/ShareIcon";
import VideoIcon from "./icons/VideoIcon";

export default function Layout(): React.JSX.Element {
  const { accessToken } = useAuth();
  const [currentRotate, setCurrentRotate] = useState(0);
  const [mic, setMic] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(false);
  const [screen, setScreen] = useState<boolean>(false);
  const { openCallModel, setOpenCallModel } = useOnCall();
  const { callRequest, setCallRequest } = useCallRequest();
  const isDraggingRef = useRef(false);

  // dragger model
  const onDrag = () => {
    isDraggingRef.current = true;
  };

  const onStop = () => {
    if (!isDraggingRef.current) {
      setCurrentRotate(currentRotate + 90);
    }
    isDraggingRef.current = false;
  };
  
  return (
    <div className="relative">
      <div className="absolute z-10">
        <Header accessToken={accessToken} />
        <Sidebar />
        <RecentChat />
      </div>
      <Outlet />
      {/* call request model */}
      {callRequest && (
        <Draggable onStop={onStop} onDrag={onDrag}>
          <div
            className={`${
              callRequest ? "block" : "hidden"
            } relative z-10 p-5 bg-yellow-100 max-w-96 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center border-[1px] border-white shadow-lg shadow-gray-400`}
            style={{ transform: "rotate(" + currentRotate + "deg)" }}
          >
            <div className="flex items-center justify-center">
              <img
                className="h-8 w-8"
                src="/public/icons/headphone-svgrepo-com.svg"
                alt="headphone"
              />
              <span className="text-white text-sm font-bold ml-2">
                invite to connect call
              </span>
            </div>
            <div className="flex flex-col justify-center items-center mt-3">
              <img
                className="w-20 h-20 mb-2 rounded-lg object-cover"
                src={callRequest.from.profileImg}
                alt="Rounded avatar"
              />
              <div className="text-base text-white font-bold">
                {callRequest.from.username}
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-3">
              <div className="flex flex-col">
                <button
                  className="p-3 h-13 w-12 rounded-full bg-[#f88989]"
                  onClick={() => {
                    setCallRequest(undefined);
                  }}
                >
                  <CloseIcon className="w-6 h-6 text-white"></CloseIcon>
                </button>
                <span className="text-white">Decline</span>
              </div>
              <div className="flex flex-col">
                <button
                  className="p-3 h-13 w-12 rounded-full bg-[#f88989]"
                  onClick={() => {
                    setOpenCallModel(callRequest);
                    setCallRequest(undefined);
                  }}
                >
                  <img
                    className="h-6 w-6"
                    src="/public/icons/headphone-svgrepo-com.svg"
                    alt="headphone"
                  />
                </button>
                <span className="text-white">Join</span>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {/* call model */}
      {openCallModel && (
        <Draggable onStop={onStop} onDrag={onDrag}>
          <div
            className={`${
              openCallModel ? "block" : "hidden"
            } relative z-10 p-5 bg-yellow-100 max-w-96 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center border-[1px] border-white shadow-lg shadow-gray-400`}
            style={{ transform: "rotate(" + currentRotate + "deg)" }}
          >
            <div className="flex items-center justify-center">
              <img
                className="h-8 w-8"
                src="/public/icons/headphone-svgrepo-com.svg"
                alt="headphone"
              />
              <span className="text-white text-sm font-bold ml-2">
                call with {openCallModel.from.username}
              </span>
            </div>
            <div className="flex justify-center items-center mt-3">
              <img
                className="w-20 h-20 mb-2 rounded-lg object-cover"
                src={openCallModel.to.profileImg}
                alt="Rounded avatar"
              />
              <div className="relative ml-3">
                <img
                  className="w-20 h-20 mb-2 rounded-lg object-cover"
                  src={openCallModel.from.profileImg}
                  alt="Rounded avatar"
                />
                <ShareIcon className="text-white absolute h-7 w-7 p-[2px] top-0 left-0 bg-black rounded-lg" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-3">
              <div className="flex flex-col">
                {mic ? (
                  <button
                    className="p-3 h-13 w-12 rounded-full bg-white"
                    onClick={() => setMic(false)}
                  >
                    <MicOnIcon className="w-6 h-6 text-gray-600" />
                  </button>
                ) : (
                  <button
                    className="p-3 h-13 w-12 rounded-full bg-[#f88989]"
                    onClick={() => setMic(true)}
                  >
                    <MicOffIcon className="w-6 h-6 text-white" />
                  </button>
                )}
                <span className="text-white">Audio</span>
              </div>
              <div className="flex flex-col">
                {video ? (
                  <button
                    className="p-3 h-13 w-12 rounded-full bg-white"
                    onClick={() => setVideo(false)}
                  >
                    <VideoIcon className="w-6 h-6 text-gray-600" />
                  </button>
                ) : (
                  <button
                    className="p-3 h-13 w-12 rounded-full bg-[#f88989]"
                    onClick={() => setVideo(true)}
                  >
                    <VideoOffIcon className="w-6 h-6 text-white" />
                  </button>
                )}
                <span className="text-white">video</span>
              </div>
              <div className="flex flex-col">
                <button
                  className={`p-3 h-13 w-12 rounded-full ${
                    screen ? "bg-white" : "bg-[#f88989]"
                  }`}
                  onClick={() => setScreen(!screen)}
                >
                  <ScreenIcon
                    className={`w-6 h-6 ${
                      screen ? "text-gray-600" : "text-white"
                    }`}
                  />
                </button>
                <span className="text-white">Screen</span>
              </div>
              <div className="flex flex-col">
                <button
                  className="p-3 h-13 w-12 rounded-full bg-[#f88989]"
                  onClick={() => {
                    setOpenCallModel(undefined);
                    setMic(false);
                    setVideo(false);
                    setScreen(false);
                  }}
                >
                  <CloseIcon className="w-6 h-6 text-white"></CloseIcon>
                </button>
                <span className="text-white">Leave</span>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}
