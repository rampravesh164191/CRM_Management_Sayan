import { useEffect, useState } from "react";
import { baseURL } from "../../utils/constants";

function Users(){
    const [users, setUsers] = useState([]);
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
                const data = await res.json();
                setUsers(data.users);
                console.log("API data :", data);
                setMessage(data.message || "Fetched leads")
    
                //redirect
                // window.location.href = "/dashboard"
            } catch (err) {
                setMessage("Login Failed")
            }
        }
    useEffect(()=>{
        getUsers();
    },[])
    return (
        <div>
            {users.map((user)=>(
                <div key={user._id}>
                    <h4>ID : {user._id}</h4>
                    <h4>Name : {user.name}</h4>
                    <h4>Email : {user.email}</h4>
                    <h4>Role : {user.role}</h4>
                </div>
            ))}
        </div>
    )
}

export default Users;