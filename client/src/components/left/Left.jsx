import Search from "./Search";
import Logout from "./Logout";
import Users from "./Users";

function Left() {
  return (
    <div className="w-full md:w-1/3 bg-gray-900 text-white flex flex-col">
      <h1 className="font-bold text-xl md:text-2xl ml-4 mt-4">Chats</h1>
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-2 px-2">
        <Search />
        <Logout />
      </div>
      <hr className="m-2" />
      <Users />
    </div>
  );
}

export default Left;
