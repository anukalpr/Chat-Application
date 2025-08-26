import { useEffect, useState } from "react";
import { useSocket } from "../../context/socketContext";
import { FaUserCircle } from "react-icons/fa";

function ChatRoom() {
  const { socket } = useSocket();
  const [typingFrom, setTypingFrom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser"))
  );
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="relative border-l w-full h-[60px] bg-gray-600 flex items-center gap-3 px-3">
      <div
        className="cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <FaUserCircle className="text-white" size={32} />
      </div>

      <div
        onClick={() => setShowDetails(!showDetails)}
        className="cursor-pointer"
      >
        <h1 className="text-white font-medium">
          {selectedUser?.userName || "Select a chat"}
        </h1>
        {typingFrom && <p className="text-xs text-gray-300">typing…</p>}
      </div>

      {showDetails && (
        <div className="absolute top-14 left-3 bg-white text-gray-900 rounded-xl shadow-lg w-64 p-4 z-50">
          {selectedUser ? (
            <div className="space-y-2">
              <p className="font-semibold text-lg">{selectedUser.userName}</p>
              <p className="text-sm text-gray-600">
                {selectedUser.email || "No email"}
              </p>
            </div>
          ) : (
            <p>No user selected</p>
          )}
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setShowDetails(false)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
