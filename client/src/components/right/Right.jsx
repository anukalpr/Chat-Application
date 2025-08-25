import ChatInput from "./ChatInput";
import ChatRoom from "./ChatRoom";
import Message from "./Message";

function Right() {
  return(
    <>
        <div className="w-[70%]  bg-green-200 text-white">
            <ChatRoom/>
            <Message/>
            <ChatInput/>
        </div>
    </>
  )
}

export default Right;
