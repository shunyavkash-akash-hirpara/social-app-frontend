import axios from "axios";
const { VITE_APP_API_BASE_URL } = import.meta.env;
export const instance = axios.create({
  baseURL: VITE_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Send cookies with every request
  mode: "cors",
});
