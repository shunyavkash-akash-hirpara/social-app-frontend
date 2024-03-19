import { useState, useCallback } from "react";
import { instance } from "../api/instance";
import { useAuth } from "./store/useAuth";
import { useSnack } from "./store/useSnack";
import { AxiosRequestConfig } from "axios";

export default function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, logout } = useAuth();
  const { setSnack } = useSnack();
  const apiCall = useCallback(async function (
    config:AxiosRequestConfig = { url: "", method: "", headers: {}, params: {}, data: {} }
  ) {
    const apiInstance = instance;

    try {
      setIsLoading(true);

      if (accessToken) {
        apiInstance.interceptors.request.use(
          (reqConfig) => {
            if (!reqConfig.headers.Authorization)
              reqConfig.headers.Authorization = "Bearer " + accessToken;
            if (config.headers)
              reqConfig.headers["Content-Type"] = config.headers['Content-Type'];
            return reqConfig;
          },
          (error) => Promise.reject(error)
        );

        apiInstance.interceptors.response.use(
          (response) => response,
          async (error) => {
            const prevRequest = error?.config;

            if (
              (error?.response?.status === 403 ||
                error?.response?.status === 401) &&
              !prevRequest?.sent
            ) {
              prevRequest.sent = true;
              return apiInstance(prevRequest);
            } else if (
              error?.response?.status === 400 &&
              error.response?.data.data.logout === true
            ) {
              logout();
              setSnack(error.response.data.message, "error");
              window.scrollTo(0, 0);
              return setTimeout(() => {
                window.location.pathname = "/signin";
              }, 2000);
            } else throw error;
          }
        );
      }
      const res = await apiInstance({url:config.url, method: config.method, headers: config.headers, params: config.params, data: config.data});
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  },
  []);
  return {
    isLoading,
    setIsLoading,
    apiCall,
  };
}
