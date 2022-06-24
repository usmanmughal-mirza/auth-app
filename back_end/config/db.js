const mongoose=require("mongoose")

const connectDB =async () =>{
await mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true

})
console.log("connect to mongo love");
}
module.exports=connectDB