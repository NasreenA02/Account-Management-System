import { useState } from "react";
import axios from "axios";

function SendMoney(){

const[email,setEmail]=useState("");
const[amount,setAmount]=useState("");

const token=localStorage.getItem("token");

const sendMoney=async()=>{

await axios.post(
"http://localhost:5000/api/account/transfer",
{
receiverEmail:email,
amount:Number(amount)
},
{
headers:{Authorization:`Bearer ${token}`}
}
);

alert("Money sent");

};

return(

<div>

<h2>Send Money</h2>

<input placeholder="Receiver Email"
onChange={(e)=>setEmail(e.target.value)}/>

<input placeholder="Amount"
onChange={(e)=>setAmount(e.target.value)}/>

<button onClick={sendMoney}>Send</button>

</div>

);

}

export default SendMoney;