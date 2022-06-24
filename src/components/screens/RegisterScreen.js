import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterScreen = ({history}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [c_password,setcPassword]=useState("")
const [error,setError]=useState("");

const registerHandler =async(e) =>{
    e.preventDefault();

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    if(password !== c_password){
    setPassword("");
    setcPassword("");
    setTimeout( () =>{
setError("");
    },5000);
    return setError("Passwords donot match")
}

try {
    const {data}=await axios.post("/api/auth/register",
    {name,email,password},{config}
    )
    console.log(data);

  localStorage.setItem("authToken",data.token)  
  history.push("/")

} catch (error) {
    setError(error.response.data.error);
    setTimeout( () =>{
setError("")
    },5000)
}


}
    return (
        <>
<h1 className="text-center">Register Screen</h1>
<div className="container">
    <div className="row">
        <div className="col-md-6 col-12"> 
        <form onSubmit={registerHandler}>
        {error && <span>{error} </span>}
  <div className="form-group">
    
    <input  className="form-control"  value={name} onChange={e =>setName(e.target.value)} placeholder="Enter Name" />
  </div>
  <div className="form-group">
    
    <input  className="form-control" value={email} onChange={e =>setEmail(e.target.value)} placeholder="Email" />
  </div>

  <div className="form-group">
    
    <input  className="form-control"  value={password} onChange={e =>setPassword(e.target.value)} placeholder="Enter Password" />
  </div>

  <div className="form-group">
    
    <input  className="form-control"  value={c_password} onChange={e =>setcPassword(e.target.value)} placeholder="Enter Password" />
  </div>
  <span>already have an account?
 <Link className="text-decoration-none" to="/login">Login</Link> </span>
<br/>
  <button type="submit" className="btn btn-primary text-decoration-none">Submit</button>


</form>

        </div>
    </div>
</div>
        </>
    )
}

export default RegisterScreen
