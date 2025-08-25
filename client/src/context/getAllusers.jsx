import axios from "axios";
import { useEffect, useState } from "react";
function getAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/getUserProfile", {
          withCredentials: true,
        });
        setAllUsers(Array.isArray(response.data) ? response.data : response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default getAllUsers;