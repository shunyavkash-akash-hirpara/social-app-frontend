import React, { useCallback, useEffect, useState } from "react";
import BackIcon from "../Component/icons/BackIcon";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../Component/ToggleButton";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

interface MyValues {
  follow: boolean;
  post: boolean;
  comment: boolean;
  like: boolean;
}

export default function NotificationManage(): React.JSX.Element {
  const [values, setValues] = useState<MyValues>();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  const getUserNotification = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.SETTING.GET,
        method: "get",
      });
      if (res.status === 200) {
        setValues(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack]);

  useEffect(() => {
    getUserNotification();
  }, [getUserNotification]);
  return (
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-between">
                <div className="flex flex-row items-center">
                  <button className="w-8 mr-3 h-full place-content-center rotate-[180deg]" onClick={() => navigate("/setting")}>
                    <BackIcon />
                  </button>
                  <span className="text-lg font-bold text-white ml-2">Notification</span>
                </div>
              </div>
            </div>
            {values && (
              <div className="p-6 grid grid-cols-2 gap-6 items-center justify-between">
                <ToggleButton className="w-[70px]" name="follow" label="Follow" value={values.follow} />
                <ToggleButton className="w-[33px]" name="post" label="Post" value={values.post} />
                <ToggleButton className="w-[70px]" name="comment" label="Comment" value={values.comment} />
                <ToggleButton className="w-[33px]" name="like" label="Like" value={values.like} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
