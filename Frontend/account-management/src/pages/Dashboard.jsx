import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){

const[balance,setBalance]=useState(0);

const token=localStorage.getItem("token");

useEffect(()=>{

axios.get(
"http://localhost:5000/api/account/balance",
{
headers:{Authorization:`Bearer ${token}`}
}
)
.then(res=>setBalance(res.data.balance));

},[]);

return(

<div>

<h2>Dashboard</h2>

<h3>Balance: ₹{balance}</h3>

<a href="/send">Send Money</a>
<br/>
<a href="/statement">Account Statement</a>

</div>

);

}

export default Dashboard;