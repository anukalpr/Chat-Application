import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
function Logout() {
  const navigate=useNavigate();
    const handleLogout=async()=>{
      try{
        const response=await axios.post("http://localhost:3000/api/signout");
        localStorage.removeItem("messanger");
        Cookies.remove("jwt");
        navigate("/login");
      }
      catch(err){
        console.log(err);
        alert("logout failed");
      }
    }
    return(
      <>
        <div className="text-3xl m-[15px] cursor-pointer" onClick={handleLogout}>
          <IoMdLogOut />
        </div>
      </>
    )
  }
  export default Logout;
  