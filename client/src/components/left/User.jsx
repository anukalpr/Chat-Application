import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function User({ user, isSelected, onSelect }) {
  const [unread, setUnread] = useState({});
  const count = unread[user._id] || 0;

  useEffect(() => {
    const storedUnread =
      JSON.parse(localStorage.getItem("unreadMessages")) || {};
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
      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
        ${
          isSelected
            ? "bg-blue-600 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-200"
        }`}
      onClick={userHandle}
    >
      <div className="flex items-center space-x-3">
        <FaUserCircle className="text-4xl text-white" />
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm md:text-base truncate">
            {user.userName}
          </h1>
          <h2 className="text-xs text-gray-300 truncate">{user.email}</h2>
        </div>
      </div>
      {count > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

export default User;
