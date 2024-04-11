import { create } from "zustand";

interface useSocket {
  socketConnection: boolean;
  setSocketConnection: (data: boolean) => void;
}

export const useSocket = create<useSocket>((set) => ({
  socketConnection: true,
  setSocketConnection(connectionStatus: boolean) {
    set(() => ({ socketConnection: connectionStatus }));
  },
}));
