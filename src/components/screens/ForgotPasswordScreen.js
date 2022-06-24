import React,{useState,useEffect} from 'react'
import axios from 'axios';

const ForgotPasswordScreen = () => {
    const [email,setEmail]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

const forgotPasswordHandler =async (e) =>{
e.preventDefault();
  
const config={
    headers:{
        "Content-Type":"application/json"
    }
};
try {
    const {data}=await axios.post(
        "/api/auth/forgotpassword",{email},
        config);
  setSuccess(data.data)      
  
} 
catch (error) {
   setError(error.response.data.error);
    setEmail("");
    setTimeout( () =>{
setError("");
    },5000)
}

}    
    return (
        <>
    <h1 className="text-center">ForgotPassword Screen</h1>
<div className="container">
    <div className="row">
        <div className="col-md-6 col-12">
        <form onSubmit={forgotPasswordHandler}>
        {error && <span>{error} </span>}
  
  <div className="form-group">
    
    <input  className="form-control" value={email} onChange={e =>setEmail(e.target.value)} placeholder="Email" />
  </div>

  <button type="submit" className="btn btn-primary text-decoration-none">Submit</button>


</form>
</div>
</div>
</div>
        </>
    )
}

export default ForgotPasswordScreen
