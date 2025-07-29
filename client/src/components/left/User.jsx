import { useState } from "react";

function User({ user }) {
  const [selUser, setSelUser] = useState("");

  const userHandle = async () => {
    // Store selected user in localStorage
    localStorage.setItem("selectedUser", JSON.stringify(user));
  };
  return (
    <>
      <div>
        <div
          className="flex space-x-4 ml-[20px] hover:bg-gray-500 cursor-pointer"
          onClick={userHandle}
        >
          <div className="avatar online">
            <div className="rounded-full w-[50px]">
              <img
                src="https://images.unsplash.com/photo-1750797636255-8c939940bcad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                alt="User Avatar"
              />
            </div>
          </div>
          <div className="mt-[0px]">
            <h1>{user.userName}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default User;