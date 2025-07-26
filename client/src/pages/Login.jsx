import { useState } from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import { useAuth } from "../context/authContext";
function Login() {
    const [authUser,setAuthUser]=useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);

    const showError = touched && password.trim() === '';
    const showErrorEmail = touchedEmail && email.trim() === '';

    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(" http://localhost:3000/api/signin",{
                email,
                password
            });
            console.log("Login Successfully",response.data);
            localStorage.setItem("messanger",JSON.stringify(response.data));
            setAuthUser(response.data);
            navigate("/home");
        }
        catch(err){
            console.log("Login Failed");
        }
    }

    return (
        <div className="bg-white h-screen flex items-center justify-center">
           <div className="bg-gray-600 p-[90px] rounded-lg">
                <h1 className="text-black font-bold text-4xl mb-[40px] underline text-center">Login</h1>
                <form onSubmit={handleLogin} className="border-black p-[20px] rounded-lg flex flex-col gap-4 w-[400px] ">
                    <input 
                        type="text" 
                        value={email}
                        placeholder="Email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        onBlur={() => setTouchedEmail(true)}
                        className="bg-white text-black px-[10px] py-[5px] rounded focus:outline-none border-none" 
                    />
                    {showErrorEmail && (
                        <p className="text-red-500 text-sm mt-1">Field is required</p>
                    )}
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        onBlur={() => setTouched(true)}
                        className="bg-white text-black px-[10px] py-[5px] rounded focus:outline-none border-none" 
                    />
                    {showError && (
                        <p className="text-red-500 text-sm mt-1">Field is required</p>
                    )}

                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-black py-[5px] rounded"
                    >
                        Login
                    </button>
                    <h3>Create new account <Link to="/" className="text-blue-700">signup</Link></h3>
                </form>
           </div>
        </div>
    );
}

export default Login;
