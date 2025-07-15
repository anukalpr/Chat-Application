import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";


function ChatInput(){
    return(
        <>
            <div className=" ml-[20px] mt-[500px] h-[50px] w-[900px] bg-gray-900 rounded-md" >
                <form action="">
                    <button><MdAttachFile />
                    </button>
                    <input type="text" placeholder="Message" className="bg-gray-900 text-white w-[800px]  ml-[40px] h-[50px] focus:outline-none" />
                    <button><IoIosSend />
                    </button>
                </form>
            </div>
        </>
    )
}
export default ChatInput;