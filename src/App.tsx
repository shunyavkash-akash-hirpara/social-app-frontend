import React, { useEffect } from "react";
import "./App.css";
import Routes from "./Routes";
import { useSocket } from "./hooks/store/useSocket";
import { socket } from "./socket";
import { useAuth } from "./hooks/store/useAuth";
import { useOnline } from "./hooks/store/useOnline";
import { requestMsgPermissions } from "./services/firebasePushNotification";
import { APIS } from "./api/apiList";
import useApi from "./hooks/useApi";

function App(): React.JSX.Element {
  const { socketConnection, setSocketConnection } = useSocket();
  const { isLoggedIn, userId, notificationPermission, setNotification } =
    useAuth();
  const { setOnlineUsers } = useOnline();
  const { apiCall: API } = useApi();

  useEffect(() => {
    socket.on("connect", () => {
      setSocketConnection(true);
    });
    socket.on("connect_error", () => {
      setSocketConnection(false);
    });
  }, [setSocketConnection]);

  useEffect(() => {
    console.log("socket connected:", socket.connected);
    if (isLoggedIn && socketConnection) {
      socket.emit("joinRoom", { user: userId });
    }
  }, [isLoggedIn, socketConnection, userId]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    socket.on("isOnline", (data) => {
      setOnlineUsers(data.onlineUsers);
    });
    return () => {
      socket.off("message");
      socket.off("isOnline");
    };
  }, [setOnlineUsers, userId]);

  // useEffect for collect fcm token
  useEffect(() => {
    if (isLoggedIn && !notificationPermission) {
      // if ("serviceWorker" in navigator) {
      //   navigator.serviceWorker
      //     .register("/firebase-messaging-sw.js")
      //     .then((registration) => {
      //       messaging.useServiceWorker(registration);
      //       console.log("Service Worker registered");
      //     })
      //     .catch((err) => {
      //       console.error("Service Worker registration failed", err);
      //     });
      // }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      }
      // eslint-disable-next-line no-inner-declarations
      async function getToken() {
        const token = await requestMsgPermissions(setNotification);
        if (token) {
          await API({
            url: APIS.NOTIFICATION.FCM_TOKEN,
            method: "post",
            data: { fcmToken: token },
          });
        }
      }
      getToken();
    }
  }, [isLoggedIn]);
  return <Routes />;
}

export default App;
