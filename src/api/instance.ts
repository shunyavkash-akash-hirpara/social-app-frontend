import axios from "axios";
const { VITE_APP_API_BASE_URL } = import.meta.env;
console.log(import.meta.env.VITE_APP_API_BASE_URL,"VITE_APP_API_BASE_URL")
export const instance = axios.create({
  baseURL: VITE_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
