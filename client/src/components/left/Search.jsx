
import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import Users from "./Users";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://chatify-apo8.onrender.com/api/searchUsers?query=${query}`,
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
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);       
      setIsSearching(false);
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
            onChange={handleChange}
            className="bg-white ml-[10px] mb-[20px] w-[250px] h-[40px] focus:outline-none border-none"
          />
          <button type="submit" className="rounded cursor-pointer ml-[10px]">
            <FaSearch className="w-[20px] h-[20px]" />
          </button>
        </div>
      </form>

      <UserContext.Provider value={results}>
        {loading || isSearching ? (
          results.length > 0 ? (
            <Users/>
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