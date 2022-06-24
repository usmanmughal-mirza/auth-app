const model=require("../models/User");
const sendEmail = require("../utils/sendEmail");
const crypto=require("crypto")


exports.register=async (req,res,next) =>{
    const {name,email,password}=req.body;

    try {
        const user=await model.create({
            name,
            email, 
            password
        });
    
sendToken(user,201,res);
    } catch (error) { 
        
res.status(500).send({
    error:error.message,
    success:false  
})

    }
}

exports.login=async (req,res,next) =>{
    const {email,password}=req.body;

    if(!email || !password){
return  res.status(400).json({success:false,error:"please provide email and password" })
    }
try { 
const user=await model.findOne({email}).select("+password")
    
    if(!user){
     return   res.status(404).json({status:false,error:"invalid credential"})
    }
    // methods  check password is right
    const isMatch=await user.matchPasswords(password);
if(!isMatch){
  return  res.status(404).json({success:false,error:"wrong password"})
}
else{
    sendToken(user,200,res)
}

} catch (error) { 
    
    res.status(500).json({success:false,error:error.message})
}


}


// next 
exports.forgotpassword=async (req,res,next) =>{
    const {email}=req.body;

    try {
        const user=await model.findOne({email})
        if(!user){
            res.status(404).send("email not exist")
        }
const resetToken=await user.getResetPasswordToken();

await user.save()

const resetUrl=`http://localhost:3000/passwordreset/${resetToken}`

const message=`
<h1>you have requested a password reset </h1>
<p>please go to this link </p>
<a href=${resetUrl} clicktracking=off>${resetUrl} </a>

`
// send email 
try {
   await sendEmail({
to:user.email,
subject:`password reset request`,
text:message
    })
    console.log(`email send successfullly`);
 return  res.status(200).status({success:true,data:"Email sent"})
    
} catch (error) {
    user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
return res.status(500).send("theere is an error while sending email")
}

// main block 
    } catch (error) {
        
    }
}

exports.resetpassword=async (req,res,next) =>{
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.resetToken).digest("hex");

    try {
        const user=await model.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}

        })
        if(!user){
            return res.status(400).send("invalid reset token")
        }
user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save()
    } 
    // next block 
    catch (error) {
        res.status(404).send("user not found with this token")
    }

}


// generate token  
const sendToken =async(user,statusCode,res)=>{
 const token=await user.getSignedToken();
 
  res.status(statusCode).json({success:true,token});

}   
    
