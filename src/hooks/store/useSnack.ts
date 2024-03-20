import { create } from "zustand";

interface SnackState {
  message: string,
  type: string,
  open: boolean,
  setSnack: (message?:string, type?:string, open?:boolean) => void
}

export const useSnack = create<SnackState>((set) => ({
  message: "",
  type: "",
  open: false,
  setSnack(message = "", type = "success", open = true) {
    setTimeout(() => {
      set(() => ({
        message,
        type,
        open,
      }));
    });
  },
  closeSnack() {
    set(() => ({ message: "", type: "", open: false }));
  },
}));
