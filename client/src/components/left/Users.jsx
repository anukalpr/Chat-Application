import getAllUsers from "../../context/getAllusers";
import UserContext from "../../context/UserContext";
import User from "./User";
import { useState, useEffect, useContext } from "react";

function Users() {
  const searchUsers = useContext(UserContext);
  const [users, loading] = getAllUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  const allUsers =
    Array.isArray(searchUsers) && searchUsers.length > 0
      ? searchUsers
      : users;

  return (
    <div
      className={`overflow-y-auto transition-all duration-300 rounded-lg shadow-md 
        ${Array.isArray(searchUsers) && searchUsers.length > 0
          ? "h-20 mt-6"
          : "h-96"
        }`}
    >
      {loading ? (
        <p className="text-center text-gray-400 py-4">Loading...</p>
      ) : Array.isArray(allUsers) && allUsers.length > 0 ? (
        <div className="flex flex-col gap-2 p-2">
          {allUsers.map((user, idx) => (
            <User
              key={user._id || idx}
              user={user}
              isSelected={selectedUser?._id === user._id}
              onSelect={setSelectedUser}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-4">No users found</p>
      )}
    </div>
  );
}

export default Users;
