import { FaSearch } from "react-icons/fa";
function Search() {
    return(
      <>
        <div>
            <form action="">
                <div className="bg-white text-black h-[40px]  mt-[10px] ml-[10px] w-[300px] rounded-md " >
                    <input 
                      type="text" 
                      placeholder="Search...." 
                      className="bg-white ml-[10px] mb-[20px] w-[250px] h-[40px] focus:outline-none border-none"
                    />
                    <button 
                      className="  rounded cursor-pointer ml-[10px] "
                    >
                      <FaSearch className="w-[20px] h-[20px]"/>
                  </button>
                </div>
            </form>
        </div>
      </>
    )
  }
  export default Search;
  