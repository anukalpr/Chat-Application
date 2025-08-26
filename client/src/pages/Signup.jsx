import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://chatify-apo8.onrender.com/api/signup",
        {
          userName,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );
      localStorage.setItem("messanger", JSON.stringify(response.data));
      setAuthUser(response.data);
      navigate("/login");
    } catch (err) {
      alert("Signup Failed: " + err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-full"
        >
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="text-gray-900 bg-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
