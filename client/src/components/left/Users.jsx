import getAllUsers from "../../context/getAllusers";
import UserContext from "../../context/userContext";
import User from "./User";
import { useState, useEffect, useContext } from "react";

function Users() {
  const searchUsers=useContext(UserContext)
  console.log(searchUsers);
  const[users,loading] = getAllUsers();
  let[allUsers,setAllUsers]=useState();
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }
  }, [selectedUser]);
  if(Array.isArray(searchUsers)&&searchUsers.length>0){
    allUsers=searchUsers;
  }
  else{
    allUsers=users;
  }
  return (
    <div className="grid grid-row-4 gap-4 h-[500px] overflow-y-auto">
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(allUsers) && allUsers.length > 0 ? (
        allUsers.map((user, idx) => (
          <User
            key={user._id || idx}
            user={user}
            isSelected={selectedUser?._id === user._id}
            onSelect={setSelectedUser}
          />
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Users;