import { useCallback } from "react";
import { useAuth } from "./store/useAuth";
import { instance } from "../api/instance";
//actions

const useRefresh = () => {
  const { setAccessToken } = useAuth();
  const refresh: () => Promise<string> = useCallback(async () => {
    const apiInstance = instance;
    const response = await apiInstance.get("/refresh_token", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setAccessToken(response.data.data.accessToken);
    //set new access token in
    return response.data.data.accessToken;
  }, [setAccessToken]);

  return refresh;
};

export default useRefresh;
