exports.privateRoute=(req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"you got a private route"
    })
}
