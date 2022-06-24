const jwt=require("jsonwebtoken");
const user=require("../models/User")

const protect =async (req,res,next) =>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // Bearer 4348394949..token 
    token=req.headers.authorization.split(" ")[1];
 
}
if(!token){
  return  res.status(404).send("token donot contain in header")
} 
try {
    
    const verifyToken=jwt.verify(token,process.env.JWT_SECRET)
// we store id in payload , while creating token  

    const user=await user.findById(verifyToken._id)

    if(!user){
      return  res.status(404).send("user not found with this id")
    }
req.user=user;
next();
} catch (error) {
    res.status(401).send("not authorized to access this route")
}


}

module.exports=protect