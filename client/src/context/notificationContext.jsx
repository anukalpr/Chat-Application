import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socketContext";
import { useAuth } from "./authContext";

const NotifContext = createContext(null);
export const useNotif = () => useContext(NotifContext);

function NotifProvider({ children }) {
  const { socket } = useSocket();
  const [authUser] = useAuth();
  const [unread, setUnread] = useState({}); 

  useEffect(() => {
    if (!socket) return;

    const onNotify = ({ from, to }) => {
      if (to !== authUser?.user?.id) return;
      setUnread((prev) => ({ ...prev, [from]: (prev[from] || 0) + 1 }));
    };

    socket.on("notify:newMessage", onNotify);
    return () => socket.off("notify:newMessage", onNotify);
  }, [socket, authUser?.user?.id]);

  const clearFor = (userId) =>
    setUnread((prev) => {
      const copy = { ...prev };
      delete copy[userId];
      return copy;
    });

  return (
    <NotifContext.Provider value={{ unread, clearFor }}>
      {children}
    </NotifContext.Provider>
  );
}
export default  NotifProvider;