import { useState } from "react";
import { baseURL } from "../utils/constants";
import { Link } from "react-router-dom";

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
      setMessage(data.message || "Success");
    } catch (err) {
      setMessage("Signup Failed");
      console.error(err);
    }
  };

  return (
    <div className="border w-[100vw] h-[100vh]">
      <div className="border w-[450px] m-auto mt-[100px] rounded-lg p-3 shadow-2xl max-sm:w-[300px]">
        <h1 className="text-[30px] text-center mb-2 font-extrabold bg-linear-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-serif">CRM</h1>
        <form onSubmit={handleSubmit}>
        <input
          className="border w-full h-[50px] cursor-pointer hover:bg-gray-100 px-2 mb-2 rounded-lg"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />

        <input
          className="border w-full h-[50px] cursor-pointer hover:bg-gray-100 px-2 mb-2 rounded-lg"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          className="border w-full h-[50px] cursor-pointer hover:bg-gray-100 px-2 mb-2 rounded-lg"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />

        <div className="border w-full h-[50px] px-2 mb-2 rounded-lg flex items-center justify-between">
          <label>Role : </label>
        <select
          className=" w-[50%] h-full outline-0 decoration-0 cursor-pointer"
          value={role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setRole(e.target.value)
          }
        >
          <option value="sales_rep">Sales Rep</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        </div>

        <div className="border w-full h-[50px] px-2 mb-2 rounded-lg flex items-center justify-between">
          <label>Is Active : </label>
        <input
            className="border size-5"
            type="checkbox"
            checked={isActive}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsActive(e.target.checked)
            }
          />
        </div>

        <input 
        className="border w-full h-[50px] rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        type="submit" value="SignUp" />
      </form>
      <Link to="/login"><p className="text-center my-1">Already have account?</p></Link>
      {message == "Signup Failed"? (
        <h3 className="text-center my-2 text-red-500">{message}</h3>
      ):(
        <h3 className="text-center my-2 text-green-500">{message}</h3>
      )}
      </div>
      
    </div>
  );
}

export default Signup;