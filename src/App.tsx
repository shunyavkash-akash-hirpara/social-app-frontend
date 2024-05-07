import React, { useEffect } from "react";
import "./App.css";
import Routes from "./Routes";
import { useSocket } from "./hooks/store/useSocket";
import { socket } from "./socket";
import { useAuth } from "./hooks/store/useAuth";
import { useOnline } from "./hooks/store/useOnline";

function App(): React.JSX.Element {
  const { socketConnection, setSocketConnection } = useSocket();
  const { isLoggedIn, userId } = useAuth();
  const { setOnlineUsers } = useOnline();

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
  return <Routes />;
}

export default App;
