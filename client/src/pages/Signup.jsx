import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(){
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPass]=useState("");

    const navigate=useNavigate();

    const handleSignup=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3000/api/signup",{
                userName,
                email,
                password,
                confirmPassword
            })
            alert("Signup Successfully!",response.data);
            navigate("/login");
        }
        catch(err){
            alert("Signup Failed",err.message);
        }
    }
    return(
        <div className="bg-white h-screen flex items-center justify-center ">
            <div className="bg-gray-300 p-[90px] rounded-lg">
                <h1 className="font-bold text-black text-2xl text-center underline mb-[40px]">Register</h1>
                <form onSubmit={handleSignup} className="bg-green-600 flex flex-col p-[20px] w-[400px] gap-4 rounded-lg">
                    <input
                        type="text" 
                        placeholder="userName"
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                        className="text-white bg-gray-900 px-[10px] py-[5px] focus:outline-none rounded-md"
                    />
                    <input
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="text-white bg-gray-900 px-[10px] py-[5px] focus:outline-none rounded-md"
                    />
                    <input
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="text-white bg-gray-900 px-[10px] py-[5px] focus:outline-none rounded-md"
                    />
                    <input
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPass(e.target.value)}
                        className="text-white bg-gray-900 px-[10px] py-[5px] focus:outline-none rounded-md"
                    />
                    <button 
                      type="submit"
                      className="text-white bg-blue-500 hover:bg-blue-700 px-[10px] py-[5px] focus:outline-none rounded-md"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Signup;