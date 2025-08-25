import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
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
      await axios.post(`http://localhost:3000/api/send`, {
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
    typingTimer.current = setTimeout(() => {
      // silence
    }, 1000);
  };

  return (
    <div className="px-3 py-2">
      <form
        onSubmit={sendMessageHandling}
        className="flex items-center gap-2 bg-gray-900 rounded-md px-3 h-[54px]"
      >
        <button type="button" className="cursor-pointer">
          <MdAttachFile />
        </button>
        <input
          type="text"
          placeholder="Message"
          className="bg-gray-900 text-white flex-1 h-full focus:outline-none"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onTyping();
          }}
        />
        <button className="cursor-pointer" type="submit">
          <IoIosSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
