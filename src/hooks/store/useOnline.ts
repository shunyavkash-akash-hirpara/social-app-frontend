import { create } from "zustand";

interface useOnline {
  onlineUsers: string[];
  setOnlineUsers: (data: string[]) => void;
}

export const useOnline = create<useOnline>((set) => ({
  onlineUsers: [], // Initialize searchData with an empty string
  setOnlineUsers: (data: string[]) => set(() => ({ onlineUsers: data })),
}));
