import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

function ChatInput(){
    const [authUser]=useAuth();
    const [message,setMessage]=useState("");
    const sendMessageHandling=async(e)=>{
        e.preventDefault();
        setMessage("");
        try{
            const response=await axios.post(`http://localhost:3000/api/send`,{
                text:message,
                senderId: authUser.user.id,
                // receiverId:
            })
        }
        catch(err){
            console.log("Internal Server Error during Sending message",err.message);
        }
    }
    return(
        <>
            <div className=" ml-[20px] mt-[500px] h-[50px] w-[900px] bg-gray-900 rounded-md" >
                <form onSubmit={sendMessageHandling}>
                    <button className="cursor-pointer"><MdAttachFile />
                    </button>
                    <input 
                        type="text" 
                        placeholder="Message" 
                        className="bg-gray-900 text-white w-[800px]  ml-[40px] h-[50px] focus:outline-none" 
                        value={message} 
                        onChange={(e)=>setMessage(e.target.value)} 
                    />
                    <button className="cursor-pointer" type="submit"><IoIosSend />
                    </button>
                </form>
            </div>
        </>
    )
}
export default ChatInput;