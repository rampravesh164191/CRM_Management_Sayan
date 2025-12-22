import { useState } from "react";
import { baseURL } from "../utils/constants";

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
    <div>
      <h3>{message || "This is login page"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;