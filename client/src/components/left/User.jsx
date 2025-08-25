import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
function User({ user, isSelected, onSelect }) {
  const [unread, setUnread] = useState({});
  const count = unread[user._id] || 0;
  console.log(user);
  useEffect(() => {
    const storedUnread = JSON.parse(localStorage.getItem("unreadMessages")) || {};
    setUnread(storedUnread);
  }, []);

  const clearFor = (userId) => {
    setUnread((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      localStorage.setItem("unreadMessages", JSON.stringify(updated));
      return updated;
    });
  };

  const userHandle = () => {
    if (typeof onSelect === "function") onSelect(user);
    localStorage.setItem("selectedUser", JSON.stringify(user));
    window.dispatchEvent(new Event("selectedUserChanged"));
    clearFor(user._id);
  };

  return (
    <div
      className={`flex justify-between items-center space-x-4 p-2 cursor-pointer rounded-lg
        ${isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-500"}`}
      onClick={userHandle}
    >
      <div className="flex space-x-4">
        <div className="avatar online">
        <FaUserCircle 
          style={{ fontSize: "50px", color: "white" }} 
        />
        </div>
        <div>
          <h1 className="font-semibold">{user.userName}</h1>
          <h2 className="text-xs text-gray-300">{user.email}</h2>
        </div>
      </div>
      {count > 0 && <span className="badge badge-primary">{count}</span>}
    </div>
  );
}

export default User;
