import { useState } from "react";
import { baseURL } from "../utils/constants";

interface SignupResponse {
  message?: string;
}

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales_rep");
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const data: SignupResponse = await res.json();
      setMessage(data.message || "Signup Successful");
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        <select
          value={role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setRole(e.target.value)
          }
        >
          <option value="sales_rep">Sales Rep</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsActive(e.target.checked)
            }
          />
          Active User
        </label>

        <input type="submit" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;