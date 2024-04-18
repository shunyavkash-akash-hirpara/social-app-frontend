import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useOnline } from "../hooks/store/useOnline";
import { socket } from "../socket";
import { useAuth } from "../hooks/store/useAuth";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ShareIcon from "./icons/ShareIcon";
import PictureIcon from "./icons/PictureIcon";
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

interface user {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  conversationId: string;
}

interface chat {
  _id?: string;
  sender: string;
  receiver?: string;
  msg: string;
  type: number;
  read?: boolean;
  conversationId?: string;
  createdAt: string;
}

export default function ChatBox({
  setOpenChat,
  chatUser,
}: {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  chatUser: user;
}): React.JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<chat[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const { userId } = useAuth();
  const { onlineUsers } = useOnline();
  const messageRef: LegacyRef<HTMLInputElement> = useRef(null);
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

  const handleSendMessage = () => {
    // Simulate receiving a new chat
    const newChat: chat = {
      sender: userId,
      msg: message,
      type: 1,
      createdAt: dayjs().toISOString(), // Use current time
    };
    socket.emit("sendMessage", {
      sender: userId,
      receiver: chatUser?._id,
      msg: message,
      type: 1,
      createdAt: dayjs().toISOString(),
    });

    // Append the new chat to the existing chats
    setChats((prevChats) => [newChat, ...prevChats]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
    socket.emit("typing", { userId: userId, typing: true });
  };

  const handleKeyPressUp = () => {
    setTimeout(() => {
      socket.emit("typing", { userId: userId, typing: false });
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    // Parse the timestamp and convert it to local time
    const localTime = dayjs(timestamp).utc().local();
    // Format the local time as "10:29pm"
    const formattedTime = localTime.format("h:mmA");
    return formattedTime;
  };

  function getDayLabel(date: string) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // If the date is within the last week, return the day of the week
    const modDate = new Date(date).getDate();
    if (new Date(date) >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
      if (modDate === today.getDate()) {
        return "Today";
      } else if (modDate === tomorrow.getDate()) {
        return "Tomorrow";
      } else {
        return dayOfWeek[new Date(date).getDay()];
      }
    } else {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const forDate = new Date(date);
      return forDate.toLocaleDateString("en-US", options);
    }
  }

  const getUserChats = useCallback(async () => {
    if (nextPage || currPage === 0) {
      try {
        const res = await apiCall({
          url: APIS.CHAT.CHAT,
          method: "get",
          params: {
            conversationId: chatUser?.conversationId,
            limit: 10,
            page: currPage,
          },
        });
        if (res.status === 200) {
          if (currPage === 0) {
            setChats(res.data.data.chatData);
          } else {
            setChats((prevChats) => [...prevChats, ...res.data.data.chatData]);
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
  }, [
    apiCall,
    chatUser?.conversationId,
    checkAxiosError,
    currPage,
    nextPage,
    setSnack,
  ]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (-scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

  useEffect(() => {
    if (!chatUser) return;
    getUserChats();
    socket.emit("onScreen", { userId: userId, screenId: chatUser._id });
  }, [chatUser, getUserChats, userId]);

  if (messageRef.current) {
    messageRef.current?.focus();
  }

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      const newChat: chat = {
        sender: data.sender,
        receiver: data.receiver,
        conversationId: data.conversationId,
        msg: data.msg,
        type: data.type,
        read: data.read,
        createdAt: dayjs().toISOString(), // Use current time
      };
      setChats((prevChats) => [newChat, ...prevChats]);
    });
    socket.on("typing", (data) => {
      setTyping(data.typing);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, []);
  return (
    <div className="w-[320px] bg-white p-0 shadow-lg rounded-xl">
      <div className="w-full border-b-2 border-gray-100 flex items-center p-3 text-gray-900">
        <img
          className="w-10 h-10 rounded-full"
          src={chatUser?.profileImg}
          alt="Rounded avatar"
        />
        <div className="flex flex-col text-justify">
          <h3 className="ms-3 text-sm text-gray-700">{chatUser?.username}</h3>
          <h4 className="ms-3 text-[13px] text-gray-400">
            <span
              className={`inline-block ${
                onlineUsers.includes(chatUser._id.toString())
                  ? "bg-green-500"
                  : "bg-red-500"
              } p-1 mr-1 rounded-full`}
            ></span>
            {onlineUsers.includes(chatUser._id.toString())
              ? typing
                ? "typing"
                : "online"
              : "offline"}
          </h4>
        </div>
        <button className="block ml-[auto]" onClick={() => setOpenChat(false)}>
          <img
            width={20}
            src="/public/icons/close-svgrepo-com.svg"
            alt="chat-icon"
          />
        </button>
      </div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        className="w-full p-3 h-[200px] feed-scroll overflow-y-auto flex flex-col-reverse"
      >
        {chats.length > 0 &&
          chats.map((chat, index, array) => (
            <>
              {chat.receiver === userId ? (
                <div className="flex flex-col items-start">
                  <p className="text-sm text-gray-700 bg-[#E2EFFF] px-5 py-[10px] rounded-t-2xl rounded-r-2xl max-w-48 text-start">
                    {chat.msg}
                  </p>
                  <span className="text-xs text-gray-400 my-2">
                    {formatTime(chat.createdAt)}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-700 bg-[#fcf1f5] px-5 py-[10px] rounded-t-2xl rounded-l-2xl max-w-48 text-start">
                    {chat.msg}
                  </p>
                  <span className="text-xs text-gray-400 my-2">
                    {formatTime(chat.createdAt)}
                  </span>
                </div>
              )}
              {getDayLabel(array[index + 1]?.createdAt) !==
                getDayLabel(chat.createdAt) && (
                <div className="rounded-xl border-transparent bg-gray-200 text-gray-600 py-1 px-2 text-xs w-fit h-7 mx-auto">
                  {getDayLabel(chat.createdAt)}
                </div>
              )}
            </>
          ))}
      </div>
      <div className="relative w-full border-t-2 border-gray-100 p-3 h-[70px]">
        <input
          name="message"
          type="text"
          placeholder="Start typing..."
          className="border-gray border text-gray-700 rounded-xl py-3 px-4 pr-3 w-[296px] h-11 bg-input-primary border-none my-0 text-sm"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyPress}
          onKeyUp={handleKeyPressUp}
          ref={messageRef}
        />
        <div className="absolute right-5 bottom-[18px] flex">
          <input type="file" id="chat-media" className="hidden" />
          <label htmlFor="chat-media" className="mr-2 cursor-pointer h-[30px]">
            <PictureIcon className="text-gray-400 w-[30px] h-full hover:text-gray-500" />
          </label>
          <button className="h-[30px]" onClick={handleSendMessage}>
            <ShareIcon className="text-gray-400 w-[30px] h-full hover:text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
