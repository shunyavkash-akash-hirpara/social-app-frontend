import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../Component/icons/SearchIcon";
import BackIcon from "../Component/icons/BackIcon";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { socket } from "../socket";
dayjs.extend(duration);
interface user {
  _id: number;
  name: string;
  username: string;
  profileImg: string;
  conversationId: string;
}
[];

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
  const navigate = useNavigate();
  const { userId } = useAuth();
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
    setChats((prevChats) => [...prevChats, newChat]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getTimeLapse = (inputTime: string): string => {
    const date = dayjs(inputTime);

    // Calculate the duration between the input time and now
    const timeDifference = dayjs.duration(dayjs().diff(date));
    // Get the time lapse in minutes
    const minutes = timeDifference.asMinutes();
    // Define the thresholds for different time lapses
    const thresholds = [
      { threshold: 1, label: "just now" },
      { threshold: 60, label: "a few minutes ago" },
      { threshold: 24 * 60, label: "hours ago" },
      { threshold: 24 * 60 * 7, label: "days ago" },
      { threshold: 24 * 60 * 30, label: "weeks ago" },
      { threshold: 24 * 60 * 365, label: "months ago" },
      { threshold: Infinity, label: "years ago" },
    ];
    // Find the appropriate time lapse label based on the time difference
    const timeLapse =
      thresholds.find(({ threshold }) => minutes < threshold)?.label || "";

    return timeLapse;
  };

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserChats = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.CHAT.CHAT,
        method: "get",
        params: { conversationId: chatUser?.conversationId, limit: 20 },
      });
      if (res.status === 200) {
        setChats(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, chatUser?.conversationId, checkAxiosError, setSnack]);

  useEffect(() => {
    if (!chatUser) return;
    getUserChats();
    socket.emit("onScreen", { userId: userId, screenId: chatUser._id });
  }, [chatUser, getUserChats, userId]);

  useEffect(() => {
    if (!search) ChatList(); // Exit early if search is falsy
    else searchUser(search);
  }, [ChatList, search, searchUser]);

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
      setChats((prevChats) => [...prevChats, newChat]);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, []);

  return (
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl">
        <div className="w-full p-6 pt-0 flex justify-between">
          <div className="w-[35%] bg-white rounded-xl flex flex-col h-calc-for-chat">
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
            <div className="relative w-[62%] rounded-xl bg-white">
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
                    <span className="ms-3 text-sm text-white">online</span>
                  </div>
                </div>
                <div>
                  <button className="w-8 h-8 p-1 rounded-lg">
                    <img
                      className="w-8"
                      src="/public/icons/phone-call-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                  <button className="w-8 h-8 p-1 rounded-lg ml-2">
                    <img
                      className="w-8"
                      src="/public/icons/video-call-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                </div>
              </div>
              <div className="w-full p-3 h-[auto]">
                {chats.length > 0 &&
                  chats.map((chat) => (
                    <>
                      {chat.receiver === userId ? (
                        <div className="flex flex-col items-start">
                          <p className="text-sm text-gray-700 bg-[#E2EFFF] px-5 py-[10px] rounded-t-2xl rounded-r-2xl max-w-[80%] text-start">
                            {chat.msg}{" "}
                          </p>
                          <span className="text-xs text-gray-400 my-2">
                            {getTimeLapse(chat.createdAt)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <p className="text-sm text-gray-700 bg-[#fcf1f5] px-5 py-[10px] rounded-t-2xl rounded-l-2xl max-w-[80%] text-start">
                            {chat.msg}
                          </p>
                          <span className="text-xs text-gray-400 my-2">
                            {getTimeLapse(chat.createdAt)}
                          </span>
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
                  />
                  <div className="absolute right-5 bottom-[18px] flex">
                    <input type="file" id="chat-media" className="hidden" />
                    <label htmlFor="chat-media" className="mr-2 cursor-pointer">
                      <img
                        width={30}
                        src="/public/icons/photo-svgrepo-com.svg"
                        alt="photo"
                      />
                    </label>
                    <button onClick={handleSendMessage}>
                      <img
                        width={30}
                        src="/public/icons/share-2-svgrepo-com.svg"
                        alt="send icon"
                      />
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
