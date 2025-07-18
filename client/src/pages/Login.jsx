import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(" http://localhost:3000/api/signin",{
                email,
                password
            });
            console.log("Login Successfully",response.data);
            navigate("/");
        }
        catch(err){
            console.log("Login Failed");
        }
    }

    return (
        <div className="bg-white h-screen flex items-center justify-center">
           <div className="bg-gray-300 p-[90px] rounded-lg">
                <h1 className="text-black font-bold text-4xl mb-[40px] underline text-center">Login</h1>
                <form onSubmit={handleLogin} className="bg-green-600 p-[20px] rounded-lg flex flex-col gap-4 w-[400px] ">
                    <input 
                        type="text" 
                        value={email}
                        placeholder="Email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="bg-gray-900 text-white px-[10px] py-[5px] rounded focus:outline-none border-none" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="bg-gray-900 text-white px-[10px] py-[5px] rounded focus:outline-none border-none" 
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white py-[5px] rounded"
                    >
                        Login
                    </button>
                </form>
           </div>
        </div>
    );
}

export default Login;
