// import axios from "axios";
// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import UserContext from "../../context/userContext";
// import Users from "./Users";
// function Search() {
//   const[query,setQuery]=useState("");
//   const[results,setResults]=useState([]);
//   const[loading,setLoading]=useState(false);
  
//   const handleSearch=async(e)=>{
//       e.preventDefault();
//       if(!query.trim()){
//         return;
//       }
//       try{
//         setLoading(true);
//         const response=await axios.get(`http://localhost:3000/api/searchUsers?query=${query}`,{withCredentials:true});
//         setResults(response.data);
//         // console.log(response.data);
//       }
//       catch(error){
//         console.error("Error searching users", error);
//         setResults([]);
//       }
//       finally{
//         setLoading(false);
//       }
//       console.log(results);
//   }
//     return(
//       <>
//         <div>
//             <form onSubmit={handleSearch}>
//                 <div className="bg-white text-black h-[40px]  mt-[10px] ml-[10px] w-[300px] rounded-md " >
//                     <input 
//                       type="text" 
//                       placeholder="Search...." 
//                       value={query}
//                       onChange={(e)=>setQuery(e.target.value)}
//                       className="bg-white ml-[10px] mb-[20px] w-[250px] h-[40px] focus:outline-none border-none"
//                     />
//                     <button 
//                       type="submit" className="rounded cursor-pointer ml-[10px]"
//                     >
//                       <FaSearch className="w-[20px] h-[20px]"/>
//                   </button>
//                 </div>
//             </form>
//             <div>
//             <UserContext.Provider value={results}>
//               {!loading ? <p></p>: <Users/>}
//             </UserContext.Provider>
//             </div>
//         </div>
//       </>
//     )
//   }
//   export default Search;
  // import axios from "axios";
// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import UserContext from "../../context/userContext";
// import Users from "./Users";
// function Search() {
//   const[query,setQuery]=useState("");
//   const[results,setResults]=useState([]);
//   const[loading,setLoading]=useState(false);
  
//   const handleSearch=async(e)=>{
//       e.preventDefault();
//       if(!query.trim()){
//         return;
//       }
//       try{
//         setLoading(true);
//         const response=await axios.get(`http://localhost:3000/api/searchUsers?query=${query}`,{withCredentials:true});
//         setResults(response.data);
//         // console.log(response.data);
//       }
//       catch(error){
//         console.error("Error searching users", error);
//         setResults([]);
//       }
//       finally{
//         setLoading(false);
//       }
//       // console.log(results);
//   }
//     return(
//       <>
//         <div>
//             <form onSubmit={handleSearch}>
//                 <div className="bg-white text-black h-[40px]  mt-[10px] ml-[10px] w-[300px] rounded-md " >
//                     <input 
//                       type="text" 
//                       placeholder="Search...." 
//                       value={query}
//                       onChange={(e)=>setQuery(e.target.value)}
//                       className="bg-white ml-[10px] mb-[20px] w-[250px] h-[40px] focus:outline-none border-none"
//                     />
//                     <button 
//                       type="submit" className="rounded cursor-pointer ml-[10px]"
//                     >
//                       <FaSearch className="w-[20px] h-[20px]"/>
//                   </button>
//                 </div>
//             </form>
//             <div>
//             <UserContext.Provider value={results}>
//               {!loading ? <p></p>: <Users/>}
//             </UserContext.Provider>
//             </div>
//         </div>
//       </>
//     )
//   }
//   export default Search;
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserContext from "../../context/userContext";
import Users from "./Users";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/searchUsers?query=${query}`,
        { withCredentials: true }
      );
      setResults(response.data);
      setIsSearching(true);
    } catch (error) {
      console.error("Error searching users", error);
      setResults([]);
      setIsSearching(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="bg-white text-black h-[40px] mt-[10px] ml-[10px] w-[300px] rounded-md">
          <input
            type="text"
            placeholder="Search...."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white ml-[10px] mb-[20px] w-[250px] h-[40px] focus:outline-none border-none"
          />
          <button type="submit" className="rounded cursor-pointer ml-[10px]">
            <FaSearch className="w-[20px] h-[20px]" />
          </button>
        </div>
      </form>

      <UserContext.Provider value={results}>
        {loading ? (
          <p className="ml-[10px] mt-[10px] text-gray-500">Searching...</p>
        ) : isSearching ? (
          results.length > 0 ? (
            <Users />
          ) : (
            <p className="ml-[10px] mt-[10px] text-red-500">No users found for "{query}"</p>
          )
        ) : (
          <p></p>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default Search;