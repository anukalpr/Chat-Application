import { useEffect, useState } from "react";
import { useSocket } from "../../context/socketContext";
import { FaUserCircle } from "react-icons/fa";

function ChatRoom() {
  const { socket } = useSocket();
  const [typingFrom, setTypingFrom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser"))
  );

  useEffect(() => {
    const updateUser = () => {
      setSelectedUser(JSON.parse(localStorage.getItem("selectedUser")));
    };
    window.addEventListener("selectedUserChanged", updateUser);
    return () => window.removeEventListener("selectedUserChanged", updateUser);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onTyping = ({ from }) => {
      if (selectedUser?._id === from) {
        setTypingFrom(from);
        setTimeout(() => setTypingFrom(null), 1000);
      }
    };
    socket.on("typing", onTyping);
    return () => socket.off("typing", onTyping);
  }, [socket, selectedUser?._id]);

  return (
    <div className="border-l w-full h-[60px] bg-gray-900 flex items-center gap-3 px-3">
      <div className="avatar online cursor-pointer">
      <FaUserCircle 
          style={{ fontSize: "30px", color: "white" }} 
        />
      </div>
      <div>
        <h1 className="text-white font-medium">{selectedUser?.userName || "Select a chat"}</h1>
        {typingFrom && <p className="text-xs text-gray-300">typing…</p>}
      </div>
    </div>
  );
}
export default ChatRoom;
