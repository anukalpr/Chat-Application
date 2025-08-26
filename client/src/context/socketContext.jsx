import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }) {
  const [authUser] = useAuth();
  const [online, setOnline] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    if (!authUser?.user?.id) return;

    socketRef.current = io("https://chatify-apo8.onrender.com", {
      transports: ["websocket"],
      query: { userId: authUser.user.id },
      withCredentials: true,
    });

    const s = socketRef.current;

    s.on("connect", () => console.log("socket connected", s.id));

    s.on("presence:online", ({ userId, status }) => {
      setOnline((prev) => ({ ...prev, [userId]: status === "online" }));
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
      setOnline({});
    };
  }, [authUser?.user?.id]);

  const value = useMemo(
    () => ({ socket: socketRef.current, online }),
    [socketRef.current, online]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
