import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const navigate = useNavigate();

  const handleSignup = async () =>{
    
    
   try {
    console.log("sending signup Request");
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      {name,email,password}
    );
    console.log("signup success", res.data);

    navigate("/login");
    console.log("navigate triggered");
  } catch (error) {
console.log("signu error:",error);
  }
  };

  return(

    <div>

      <h2>Signup</h2>

      <input placeholder="Name"
      onChange={(e)=>setName(e.target.value)}/>

      <input placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}/>

      <input type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}/>

      <button onClick={handleSignup}>Signup</button>
      <button onClick={() => navigate("/login")}> go to login </button>

    </div>

  );
}

export default Signup;