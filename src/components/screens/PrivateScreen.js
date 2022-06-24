import React,{useEffect,useState} from 'react'
import axios from 'axios';

const PrivateScreen = ({history}) => {
const [error,setError]=useState("")
const [privateData,setprivateData]=useState("");

useEffect( () =>{
    if(!localStorage.getItem("authToken")){
        history.push("/login")
    }
const fetchPrivateData = async() =>{
const config={
    headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
}
try {
    const {data}=await axios.get("/api/secret",config);
    setprivateData(data.data);

} catch (error) {
    localStorage.removeItem("authToken");
setError("you are not authorized please login")
}

}

fetchPrivateData();
},[history])

const logoutHandler = () =>{
    localStorage.removeItem("authToken");
    history.push("/login")
}
    return (
        <>
<h1>Private Screen</h1>
{
    error ? <span>{error} </span>:
    <div>
    <h1>WELCOME TO HOME PAGE</h1>
    <p>{privateData} </p>
    <button onClick={logoutHandler}>logout </button>
     </div>
}

        </>
    ) 
}

export default PrivateScreen
