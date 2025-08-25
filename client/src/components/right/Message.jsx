import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useSocket } from "../../context/socketContext";

function Message() {
  const [authUser] = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser"))
  );
  const endRef = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      setSelectedUser(JSON.parse(localStorage.getItem("selectedUser")));
    };
    window.addEventListener("selectedUserChanged", updateUser);
    return () => window.removeEventListener("selectedUserChanged", updateUser);
  }, []);

  useEffect(() => {
    if (!selectedUser?._id || !authUser?.user?.id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/get-message", {
          params: {
            senderId: authUser.user.id,
            receiverId: selectedUser._id,
          },
          withCredentials: true,
        });
        setMessages(res.data.messages || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authUser?.user?.id, selectedUser?._id]);

  useEffect(() => {
    if (!socket) return;
    const onNewMessage = (msg) => {
      if (
        (msg.sender === authUser?.user?.id && msg.receiver === selectedUser?._id) ||
        (msg.receiver === authUser?.user?.id && msg.sender === selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("message:new", onNewMessage);
    return () => socket.off("message:new", onNewMessage);
  }, [socket, authUser?.user?.id, selectedUser?._id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <div className="p-4">Loading messages…</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto p-4 space-y-2">
      {messages.length === 0 && <p className="text-gray-400">No messages yet. Say hi 👋</p>}
      {messages.map((m) => {
        const isMe = m.sender === authUser?.user?.id;
        return (
          <div key={m._id} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
            <div className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
              {m.text}
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}

export default Message;
