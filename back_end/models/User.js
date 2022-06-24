const mongoose =require("mongoose")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto=require("crypto")

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a username"]
    },
    email:{
        type:String,
        required:[true,"please enter a email "],
        unique:true,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "please provide a valid email"
        ]
    },
    password:{
        type:String,
        minlength:6,
        select:false,
        required:[true,"please enter a password"]
    },
resetPasswordToken:String,
resetPasswordExpire:Date
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
    next()
})

UserSchema.methods.matchPasswords=async function(password){
return await bcrypt.compare(password,this.password)

} 

 UserSchema.methods.getSignedToken=async function(){
      return await jwt.sign({_id:this._id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE
      })
 }   
 
UserSchema.methods.getResetPasswordToken=async function(){
    const resetToken=crypto.randomBytes(20).toString("hex");

 this.resetPasswordToken= crypto.createHash("sha256")
    .update(resetToken).digest("hex"); 
    
 
    this.resetPasswordExpire=Date.now() + 10*(60*1000)
return  resetToken;
}



const model=mongoose.model("Auth-app",UserSchema)
 
module.exports=model