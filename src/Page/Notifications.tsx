import React, { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { Link } from "react-router-dom";

interface notification {
  _id: string;
  itemId: string;
  text: string;
  type: string;
  read: boolean;
  createdAt: string;
  sender_info: { _id: string; username: string; name: string; profileImg: string };
  post?: { _id: string; photos: { url: string; type: string; _id: string }[] };
  comment?: { _id: string; description: string };
}

export default function Notifications(): React.JSX.Element {
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);

  function getTimeLapse(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const timeDifference: number = now.getTime() - date.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} min`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 7) {
      return `${days}d`;
    } else {
      return `${weeks}w`;
    }
  }

  const getUserNotification = useCallback(async () => {
    if (nextPage || currPage === 0) {
      try {
        const res = await apiCall({
          url: APIS.NOTIFICATION.GET,
          method: "get",
          params: {
            limit: 20,
            page: currPage,
          },
        });
        if (res.status === 200) {
          if (currPage === 0) {
            setNotifications(res.data.data.data);
          } else {
            setNotifications((prevNotifications) => [...prevNotifications, ...res.data.data.data]);
          }
          setNextPage(res.data.data.hasNextPage);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    }
  }, [apiCall, checkAxiosError, currPage, nextPage, setSnack]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (-scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

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
                  <span className="text-lg font-bold text-white ml-2">Notification</span>
                </div>
              </div>
            </div>
            {notifications.length > 0 && (
              <div onScroll={onScroll} ref={listInnerRef} className="py-5 px-3">
                {notifications.map((item) => (
                  <Link to={item.type === "follow" ? `/profile/${item.sender_info._id}` : "/"} key={item._id} className={`relative px-2 py-1 flex items-center rounded-lg hover:bg-slate-200`}>
                    <img className="w-11 h-11 mr-2 rounded-full object-cover" src={item.sender_info.profileImg} alt="Bordered avatar" />
                    <div className="flex flex-col items-start justify-center">
                      <h4 className="text-sm text-gray-700">
                        <Link to={`/profile/${item.sender_info._id}`} className="font-bold">
                          {item.sender_info.username + " "}
                        </Link>
                        {item.text}
                      </h4>
                      <h5 className="text-xs text-gray-400">{getTimeLapse(item.createdAt)}</h5>
                    </div>
                    {item.post && (
                      <Link to="/" className="absolute right-2">
                        <img className="w-9 h-9 object-cover rounded-md" src={item.post.photos[0].url} alt="" />
                      </Link>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
