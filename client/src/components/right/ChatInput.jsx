import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useState, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { useSocket } from "../../context/socketContext";

function ChatInput() {
  const [authUser] = useAuth();
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const typingTimer = useRef(null);

  const sendMessageHandling = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessage("");

    try {
      const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
      await axios.post(`https://chatify-apo8.onrender.com/api/send`, {
        text,
        senderId: authUser.user.id,
        receiverId: selectedUser._id,
      });
    } catch (err) {
      console.log("Send failed", err?.message);
    }
  };

  const onTyping = () => {
    const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    if (!socket || !selectedUser) return;
    socket.emit("typing", { to: selectedUser._id });
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {}, 1000);
  };

  return (
    <div className="px-3 py-2">
      <form
        onSubmit={sendMessageHandling}
        className="flex items-center gap-3 bg-gray-800 rounded-2xl px-4 py-2 shadow-md"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="bg-transparent text-white flex-1 h-10 focus:outline-none placeholder-gray-400"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onTyping();
          }}
        />
        <button
          className="text-blue-500 hover:text-blue-400 transition-colors"
          type="submit"
        >
          <IoIosSend size={24} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
