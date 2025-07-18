import Logout from "./Logout";
import Search from "./Search";
import Users from "./Users";
function Left() {
  return(
    <>
        <div className="w-[30%] bg-gray-900 text-white">
            <h1 className="font-bold text-2xl ml-[20px]">Chats</h1>
            <div className="flex ">
              <Search/>
              <Logout/>
            </div>
            <newContact/>
            <Users/>
        </div>
    </>
  )
}
export default Left;
