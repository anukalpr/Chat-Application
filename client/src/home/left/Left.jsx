import Search from "./Search";
import newContact from "./newContact";
import Users from "./Users";
function Left() {
  return(
    <>
        <div className="w-[30%]  bg-gray-400 text-white">
            <h1 className="font-bold text-2xl ml-[20px]">Chats</h1>
            <Search/>
            <newContact/>
            <Users/>
        </div>
    </>
  )
}
export default Left;
