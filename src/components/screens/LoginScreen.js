import React, {useState, useEffect } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';


const LoginScreen = ({history}) => {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
const [error,setError]=useState("");

useEffect( () =>{
if(localStorage.getItem("authToken")){
    history.push("/")
}
},[history])

const loginHandler =async(e) =>{
    e.preventDefault();

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
try {
    const {data}=await axios.post("/api/auth/login",
    {email,password},{config}
    )

  localStorage.setItem("authToken",data.token)  
  history.push("/")

} catch (error) {
    
    setError(error.response.data.error);
    setTimeout( () =>{
setError("")
    },5000)
}


}

//  end ....next

    return (
        <>
        
            <h1 className="text-center">Login Screen</h1>
<div className="container">
    <div className="row">
        <div className="col-md-6 col-12">
        <form onSubmit={loginHandler}>
      {error && <span>{error} </span>}
  
  <div className="form-group">
    
    <input  className="form-control" value={email} onChange={e =>setEmail(e.target.value)} placeholder="Email" />
  </div>

  <div className="form-group">
  <p>forgot password?<Link className="text-decoration-none"
   to="/forgotpassword">forgot password</Link> </p>
    
    <input  className="form-control"  value={password} onChange={e =>setPassword(e.target.value)} placeholder="Enter Password" />
  </div>

  
  <span>donot  have an account?
 <Link className="text-decoration-none" to="/register">Register</Link> </span>
<br/>
  <button type="submit" className="btn btn-primary text-decoration-none">Submit</button>


</form>

        </div>
    </div>
</div>

        </>
    )
}

export default LoginScreen
