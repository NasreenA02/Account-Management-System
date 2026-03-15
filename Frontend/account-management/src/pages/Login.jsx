import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");

const{login}=useContext(AuthContext);
const navigate=useNavigate();

const handleLogin=async()=>{
try{
const res=await axios.post(
"http://localhost:5000/api/auth/login",
{email,password}
);
console.log("Login response:", res.data);
login(res.data.token);

navigate("/dashboard");
} catch (error) {
    console.log("Login error:", error.response?.data);
}
};

return(

<div>

<h2>Login</h2>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}/>

<input type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}/>

<button onClick={handleLogin}>Login</button>

   <button onClick={() => navigate("/dashboard")}> go to Dashboard </button>
</div>

);

}

export default Login;