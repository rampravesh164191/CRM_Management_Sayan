import { useState } from "react";
import { baseURL } from "../utils/constants";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales_rep");
  const [isActive, setIsActive] = useState(true); // boolean, not string
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userObj = { name, email, password, role, isActive };

    try {
      const res = await fetch(`${baseURL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      });

      const data = await res.json();
      setMessage(data.message || "Signup Successful");
      // navigate("/login") if using react-router
    } catch (err) {
      setMessage("Signup Failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{message || "This is Signup page"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="sales_rep">Sales Rep</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active User
        </label>

        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;