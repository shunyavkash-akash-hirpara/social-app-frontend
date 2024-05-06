import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { socket } from "../socket";
import dayjs from "dayjs";
import { useAuth } from "../hooks/store/useAuth";
import ChatIcon from "./icons/ChatIcon";

interface user {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  conversationId: string;
  unread_msg?: number;
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

export default function ChatListItem({
  setChatUser,
  chatUser,
  people,
  setChats,
  setTyping,
  chatBox,
  setOpenChat,
}: {
  setChatUser: Dispatch<SetStateAction<user>>;
  chatUser: user;
  people: user;
  setChats?: Dispatch<SetStateAction<chat[]>>;
  setTyping?: Dispatch<SetStateAction<boolean>>;
  chatBox?: boolean;
  setOpenChat?: Dispatch<SetStateAction<boolean>>;
}) {
  const { userId } = useAuth();
  const [count, setCount] = useState(people.unread_msg || 0);
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
      if (data.conversationId === people.conversationId) {
        setCount((prevCount) => prevCount + 1);
      }
      if (typeof setChats === "function") {
        setChats((prevChats) => [newChat, ...prevChats]);
      }
    });
    socket.on("typing", (data) => {
      if (typeof setTyping === "function") {
        setTyping(data.typing);
      }
    });
    return () => {
      socket.off("sendMessage");
      socket.off("typing");
    };
  }, [people, setChats, setTyping, userId]);

  return (
    <div
      className={`w-full flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group ${!chatBox && "cursor-pointer"}`}
      onClick={() => !chatBox && setChatUser(people)}
      key={people._id}
    >
      <img
        className="w-11 h-11 rounded-full object-cover"
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
      <div className="ml-[auto] flex gap-2 items-center">
        {count > 0 && chatUser?.conversationId !== people.conversationId && (
          <div className="h-6 w-6 ml-auto text-sm font-bold place-content-center rounded-full text-white bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">{count}</div>
        )}
        {chatBox && (
          <button
            onClick={() => {
              setOpenChat(true);
              setChatUser(people);
            }}
          >
            <ChatIcon className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
}
