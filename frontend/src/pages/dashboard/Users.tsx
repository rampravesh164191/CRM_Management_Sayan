// src/pages/dashboard/Users.tsx
import { useEffect, useState } from "react";
import { baseURL } from "../../utils/constants";
import { CircleUser } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    try {
      const res = await fetch(`${baseURL}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");

      const data: { users: User[]; message?: string } = await res.json();
      setUsers(data.users);
      console.log("API data :", data);
      setMessage(data.message || "Fetched users");
    } catch (err) {
      setMessage("Login Failed");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
      <div className="flex flex-wrap gap-4">
      {users.map((user) => (
        <div
          className="border h-[50px] flex items-center ml-10 rounded-r-full mt-10 overflow-visible pr-6"
          key={user._id}>
          <CircleUser size={80} strokeWidth={0.5} className="-ml-10 bg-white rounded-full border" />
          <div className="ml-[5px]">
            {/* <h4 className="border px-3 rounded-2xl text-[12px] bg-gray-200 text-gray-600">ID : {user._id}</h4> */}
            <h4>Name : {user.name}</h4>
            {/* <h4>Email : {user.email}</h4> */}
            <h4>Role : {user.role}</h4>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Users;