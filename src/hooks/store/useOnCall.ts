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

interface useOnCall {
  openCallModel: callRequest | undefined;
  setOpenCallModel: (data: callRequest) => void;
}

export const useOnCall = create<useOnCall>((set) => ({
  openCallModel: undefined, // Initialize searchData with an empty string
  setOpenCallModel: (data: callRequest) => set(() => ({ openCallModel: data })),
}));
