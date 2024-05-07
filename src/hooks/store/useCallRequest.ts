import { create } from "zustand";

interface callRequest {
  to: {
    _id: string;
    username: string;
    profileImg: string;
  };
  from: {
    _id: string;
    username: string;
    profileImg: string;
  };
}

interface useCallRequest {
  callRequest: callRequest | undefined;
  setCallRequest: (data: callRequest) => void;
}

export const useCallRequest = create<useCallRequest>((set) => ({
  callRequest: undefined, // Initialize searchData with an empty string
  setCallRequest: (data: callRequest) => set(() => ({ callRequest: data })),
}));
