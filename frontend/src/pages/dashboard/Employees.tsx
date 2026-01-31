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

function Employees() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", role: "", email: "" });
  //popping up confirmation before removing employee
  const [viewBox, setViewBox] = useState<string | null>(null);

  async function editEmployee(userId: string) {
    try {
      const res = await fetch(`${baseURL}/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, ...data } : u))
      );
      setMessage("User updated successfully!");
      setEditingUserId(null); // close the box
      getUsers();
    } catch (error) {
      console.error(error);
      setMessage("Error updating user.");
    }
  }

  async function removeEmployee(userId: string) {
    try {
      const res = await fetch(`${baseURL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete user: ${res.statusText}`);
      }

      // Optionally parse response if backend returns something
      const data = await res.json();
      console.log("Deleted user:", data);

      // Update local state to remove the user
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setMessage("User removed successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error removing user.");
    }
  }


  const getUsers = async () => {
    try {
      const res = await fetch(`${baseURL}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch Employees");

      const data: { users: User[]; message?: string } = await res.json();
      setUsers(data.users);
      console.log("API data :", data);
      setMessage(data.message || "Fetched Employees");
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
      <div className="flex flex-col gap-2 mt-4">
        {users.map((user) => (
          <div
            className="border h-[100px] flex justify-between items-center rounded-lg "
            key={user._id}>
            <div className="flex items-center pr-4 ml-2">
              <CircleUser size={80} strokeWidth={0.5} className="bg-white border rounded-lg" />
              <div className="ml-[5px]">
                <h4 className="border px-3 rounded-2xl text-[12px] bg-gray-200 text-gray-600">ID : {user._id}</h4>
                <span className="mr-4">Name : {user.name}</span>
                <span>Role : {user.role}</span>
                <h4>Email : {user.email}</h4>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setEditingUserId(user._id);
                  setFormData({
                    name: user.name,
                    role: user.role,
                    email: user.email,
                  });
                }}
                className="px-4 py-1 mr-2 bg-green-500 hover:bg-green-600 text-white cursor-pointer rounded-lg active:bg-green-800 active:outline-2 active:outline-offset-2 outline-green-500">Edit</button>
              <button
                onClick={() => setViewBox("visible")}
                className="px-4 py-1 mr-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-lg active:bg-red-800 active:outline-2 active:outline-offset-2 outline-red-500">Remove</button>
            </div>
            {/* Conditional Edit Box */}
            {editingUserId && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Edit User</h2>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <select
                    className="border p-2 mb-2 w-full"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="sales_rep">Sales Rep</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="border p-2 mb-4 w-full rounded"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingUserId(null)} // close without saving
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => editEmployee(editingUserId)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* delete confirmation box */}
            {viewBox && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-center">Confirm Removing Employee?</p>
                <div className="flex justify-between mt-2">
                  <button
                  onClick={()=>setViewBox(null)}
                   className="border px-7 rounded-sm bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">No</button>
                  <button
                    onClick={() => {
                      removeEmployee(user._id)
                      setViewBox(null);
                    }}
                    className="border px-7 rounded-sm bg-red-500 text-white hover:bg-red-600 cursor-pointer">Yes</button>
                </div>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Employees;