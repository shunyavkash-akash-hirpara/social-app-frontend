import { create } from "zustand";

interface user {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  conversationId: string;
  delete24View: boolean;
  deleteAfterView: boolean;
}

interface useChatUser {
  newChatUser: user | undefined;
  setNewChatUser: (data: user) => void;
}

export const useChatUser = create<useChatUser>((set) => ({
  newChatUser: undefined, // Initialize searchData with an empty string
  setNewChatUser: (data: user) => set(() => ({ newChatUser: data })),
}));
