import ChatRoom from "./ChatRoom";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Right() {
  return (
    <div className="w-full md:w-2/3 bg-green-200 text-white flex flex-col">
      <ChatRoom />
      <Message />
      <ChatInput />
    </div>
  );
}

export default Right;
