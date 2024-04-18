import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../Component/icons/SearchIcon";
import BackIcon from "../Component/icons/BackIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { socket } from "../socket";
import { useOnline } from "../hooks/store/useOnline";
import ShareIcon from "../Component/icons/ShareIcon";
import PictureIcon from "../Component/icons/PictureIcon";
import VideoIcon from "../Component/icons/VideoIcon";
import { useOnCall } from "../hooks/store/useOnCall";
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

export default function ChatList(): React.JSX.Element {
  const [users, setUsers] = useState<user[]>([]);
  const [search, setSearch] = useState<string>("");
  const [chatUser, setChatUser] = useState<user>();
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<chat[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const { setOpenCallModel } = useOnCall();
  const navigate = useNavigate();
  const { userId, user } = useAuth();
  const { onlineUsers } = useOnline();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const messageRef: LegacyRef<HTMLInputElement> = useRef(null);
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ChatList = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.CHAT.CHATLIST,
        method: "get",
      });
      if (res.status === 200) {
        setUsers(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack]);

  const searchUser = useCallback(
    async (searchData: string) => {
      try {
        const res = await apiCall({
          url: APIS.USER.SEARCHUSER,
          method: "post",
          data: { username: searchData.toLowerCase() },
        });
        if (res.status === 200) {
          setUsers(res.data.data);
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

  useEffect(() => {
    if (!search) ChatList(); // Exit early if search is falsy
    else searchUser(search);
  }, [ChatList, search, searchUser]);

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
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl">
        <div className="w-full p-6 pt-0 flex justify-between">
          <div className="w-[35%] bg-white rounded-xl flex flex-col h-calc-for-chatList">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-start">
                <button
                  className="w-8 mr-3 h-full place-content-center rotate-[180deg]"
                  onClick={() => navigate("/")}
                >
                  <BackIcon />
                </button>
                <span className="text-lg font-bold text-white">Chat</span>
              </div>
            </div>
            <div className="w-[90%] mx-auto my-2 relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search"
                required
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto feed-scroll rounded-b-xl m-y">
              {users.map((people) => (
                <button
                  className="w-full flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                  onClick={() => setChatUser(people)}
                  key={people._id}
                >
                  <img
                    className="w-11 h-11 rounded-full object-cover"
                    src={people.profileImg}
                    alt="Rounded avatar"
                  />
                  <div className="flex flex-col text-justify">
                    <span className="ms-3 text-sm text-gray-700 font-bold">
                      {people.username}
                    </span>
                    <span className="ms-3 text-[12px] text-gray-400">
                      {people.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {chatUser && (
            <div className="relative h-calc-for-chatList w-[62%] rounded-xl bg-white">
              <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center flex items-center justify-between">
                <div className="h-full flex items-center justify-start">
                  <Link to={`/profile/${chatUser._id}`}>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={chatUser.profileImg}
                      alt="Rounded avatar"
                    />
                  </Link>
                  <div className="flex flex-col text-justify">
                    <Link
                      to={`/profile/${chatUser._id}`}
                      className="ms-3 text-sm text-white font-bold"
                    >
                      {chatUser.username}
                    </Link>
                    {onlineUsers.includes(chatUser._id.toString()) && (
                      <span className="ms-3 text-sm text-white">
                        {typing ? "typing" : "online"}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const data = {
                        to: {
                          _id: userId,
                          username: user.username,
                          profileImg: user.profileImg,
                        },
                        from: {
                          _id: chatUser._id,
                          username: chatUser.username,
                          profileImg: chatUser.profileImg,
                        },
                      };
                      socket.emit("callRequest", data);
                      setOpenCallModel(data);
                    }}
                    className="w-8 h-8 p-1 rounded-lg"
                  >
                    <img
                      className="w-8"
                      src="/public/icons/phone-call-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                  <button className="w-8 h-8 p-1 rounded-lg ml-2">
                    <VideoIcon className="w-8 h-full text-white" />
                  </button>
                </div>
              </div>
              <div
                onScroll={onScroll}
                ref={listInnerRef}
                className="h-calc-for-chats w-full p-3 feed-scroll overflow-y-auto flex flex-col-reverse"
              >
                {chats.length > 0 &&
                  chats.map((chat, index, array) => (
                    <>
                      {chat.receiver === userId ? (
                        <div className="flex flex-col items-start">
                          <p className="text-sm text-gray-700 bg-[#E2EFFF] px-5 py-[10px] rounded-t-2xl rounded-r-2xl max-w-[80%] text-start">
                            {chat.msg}
                          </p>
                          <span className="text-xs text-gray-400 my-2">
                            {formatTime(chat.createdAt)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <p className="text-sm text-gray-700 bg-[#fcf1f5] px-5 py-[10px] rounded-t-2xl rounded-l-2xl max-w-[80%] text-start">
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
              <div className="absolute bottom-0 w-full">
                <div className="relative w-full border-t-2 border-gray-100 p-3">
                  <input
                    name="message"
                    type="text"
                    placeholder="Start typing..."
                    className="border-gray border text-gray-700 rounded-xl py-3 px-4 pr-3 w-full bg-input-primary my-0 text-sm"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={handleKeyPress}
                    onKeyUp={handleKeyPressUp}
                    ref={messageRef}
                  />
                  <div className="absolute right-5 bottom-[20px] flex">
                    <input type="file" id="chat-media" className="hidden" />
                    <label
                      htmlFor="chat-media"
                      className="mr-2 cursor-pointer h-[30px]"
                    >
                      <PictureIcon className="text-gray-400 w-[30px] h-full hover:text-gray-500" />
                    </label>
                    <button className="h-[30px]" onClick={handleSendMessage}>
                      <ShareIcon className="text-gray-400 w-[30px] h-full hover:text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
