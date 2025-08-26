import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const showError = touched && password.trim() === "";
  const showErrorEmail = touchedEmail && email.trim() === "";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://chatify-apo8.onrender.com/api/signin",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login Successfully", response.data);
      localStorage.setItem("messanger", JSON.stringify(response.data));
      setAuthUser(response.data);
      navigate("/home");
    } catch (err) {
      console.log("Login Failed");
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center px-4">
      <div className="bg-gray-600 w-full max-w-md p-6 sm:p-10 rounded-lg shadow-lg">
        <h1 className="text-black font-bold text-2xl sm:text-3xl mb-6 underline text-center">
          Login
        </h1>
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg flex flex-col gap-4"
        >
          {/* Email Input */}
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            className="bg-gray-100 text-black px-3 py-2 rounded focus:outline-none"
          />
          {showErrorEmail && (
            <p className="text-red-500 text-sm">Field is required</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(true)}
            className="bg-gray-100 text-black px-3 py-2 rounded focus:outline-none"
          />
          {showError && (
            <p className="text-red-500 text-sm">Field is required</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>

          <h3 className="text-center text-sm text-gray-700">
            Create new account{" "}
            <Link to="/" className="text-blue-700 font-medium hover:underline">
              Signup
            </Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
