import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const socketContextData = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  //   transports: ["websocket"],
  //   withCredentials: true,
});

function SocketContext({ children }) {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from Server");
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };
  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <socketContextData.Provider value={{ sendMessage, receiveMessage, socket }}>
      {children}
    </socketContextData.Provider>
  );
}

export default SocketContext;
