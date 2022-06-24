import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

const ResetPasswordScreen = ({history,match}) => {
     const [password,setPassword]=useState("");
    const [c_password,setcPassword]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

const resetPasswordHandler =async (e) =>{
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
    return setError("Passwords donot match");
}
try {
    const {data}=await axios.put(`/api/auth/resetpassword
    /${match.params.resetToken}`,
    {password},config
    );
setSuccess(data.data);
 
} 
catch (error) {
    setError(error.response.data.error);
    setTimeout( () =>{
setError("")
    },5000)
}


}

    return (
       <>
<h1 className="text-center">ResetPasswordScreen Screen</h1>
<div className="container">
    <div className="row">
        <div className="col-md-6 col-12">
        <form onSubmit={resetPasswordHandler}>
        {error && <span>{error} </span>}
        {success && 
        <span> {success} <Link to="/login">Login </Link> </span>
        }

  <div className="form-group">
    
    <input  className="form-control"  value={password} onChange={e =>setPassword(e.target.value)} placeholder="Enter Password" />
  </div>

  <div className="form-group">
    
    <input  className="form-control"  value={c_password} onChange={e =>setcPassword(e.target.value)} placeholder="Enter Password" />
  </div>
 
  <button type="submit" className="btn btn-primary text-decoration-none">Submit</button>


</form>

        </div>
    </div>
</div>

       </>
    )
}

export default ResetPasswordScreen
