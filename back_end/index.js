require("dotenv").config({path:"./config.env"});
const express =require("express")
const app=express()
const port =process.env.PORT || 8000
const router=require("./routes/auth")
const router1=require("./routes/private")
const connectDB=require("./config/db")
 
// DB 
connectDB()

app.use(express.json())

app.get("/",(req,res) =>{
    res.send("welcome")
})
app.use("/api/auth",router)
app.use("/api",router1)
// server 
const server= app.listen(port, () =>{ 
    console.log('listening..)');
})

process.on("unhandledRejection",(err,promise) =>{
    console.log(`error is ${err}`);
    server.close( () =>{
        process.exit(1)  
    })
})