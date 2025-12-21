import { useState } from "react";
import { baseURL } from "../utils/constants";

function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("sales_rep");
    const [isActive, setIsActive] = useState("true")
    const [message, setMessage] = useState("");

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        const userObj = {name, email, password};

        try{
            const res = await fetch(`${baseURL}/api/signup`,{
                method : "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(userObj)
            });
            const data = await res.json();
            setMessage(data.message || "Signup Successful")

            alert("Signup success, please login")
            // navigate("/login")  ← react-router ho to
        }catch(err){
            setMessage("Signup Failed");
            console.log(err);
        }
    }

    return (
        <div>
            <h3>{message || "This is Signup page"}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                 />
                <input 
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                 />
                <input 
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                 />
                <input 
                type="text"
                placeholder="Enter role eg:admin, manager, sales_rep"
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                 />
                <input 
                type="text"
                placeholder="is user active true or false"
                value={isActive}
                onChange={(e)=>setIsActive(e.target.value)}
                 />
                <input type="submit" value="Signup" />
            </form>
        </div>
    )
}

export default Signup;