import React, { useEffect } from "react";
import "./App.css";
import Routes from "./Routes";
import { useSocket } from "./hooks/store/useSocket";
import { socket } from "./socket";
import { useAuth } from "./hooks/store/useAuth";

function App(): React.JSX.Element {
  const { socketConnection, setSocketConnection } = useSocket();
  const { isLoggedIn, userId } = useAuth();

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
    return () => {
      socket.off("message");
    };
  }, []);
  return <Routes />;
}

export default App;
