import { useState } from "react";
import { baseURL } from "../utils/constants";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const userObj = {email, password};

        try{
            const res = await fetch(`${baseURL}/api/login`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(userObj)
            });
            const data = await res.json();
            console.log(data.user,res);
            setMessage(data.message || "login successful")

            //token save
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("role", data.user.role)
            localStorage.setItem("_id", data.user._id)
            //redirect
            // window.location.href = "/dashboard"
        }catch(err){
            setMessage("Login Failed")
        }
    }
    return (
        <div>
            <h3>{message || "This is login page"}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />
                <input 
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                 />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;