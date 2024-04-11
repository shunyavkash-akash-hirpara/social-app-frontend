import { io } from "socket.io-client";

const { VITE_APP_API_BASE_URL } = import.meta.env;

export const socket = io(VITE_APP_API_BASE_URL, {
  autoConnect: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000,
});
