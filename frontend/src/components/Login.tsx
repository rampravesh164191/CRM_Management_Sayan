import { useState } from "react";
import { baseURL } from "../utils/constants";
import { Link } from "react-router-dom";

interface LoginResponse {
  message?: string;
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    role: string;
  };
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userObj = { email, password };

    try {
      const res = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });
      const data: LoginResponse = await res.json();
      console.log(data.user, res);
      setMessage(data.message || "Login successful");

      window.location.href = "/dashboard";

      // token save
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("_id", data.user._id);
    } catch (err) {
      setMessage("Login Failed");
    }
  };

  return (
    <div className="border w-[100vw] h-[100vh]">
      <div className="border w-[450px] m-auto mt-[100px] rounded-lg p-3 shadow-2xl max-sm:w-[300px]">
        <h1 className="text-[30px] text-center mb-2 font-extrabold bg-linear-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-serif">CRM</h1>
        <form onSubmit={handleSubmit}>

        <input
          className="border w-full h-[50px] cursor-pointer hover:bg-gray-100 px-2 mb-2 rounded-lg"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border w-full h-[50px] cursor-pointer hover:bg-gray-100 px-2 mb-2 rounded-lg"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input 
        className="border w-full h-[50px] rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        type="submit" value="Login" />
      </form>
      <Link to="/signup"><p className="text-center my-1">Create a new account</p></Link>
      {message == "Login Failed"? (
        <h3 className="text-center my-2 text-red-500">{message}</h3>
      ):(
        <h3 className="text-center my-2 text-green-500">{message}</h3>
      )}
      </div>
      
    </div>
  );
}

export default Login;