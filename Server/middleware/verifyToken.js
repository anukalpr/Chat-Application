const jwt=require("jsonwebtoken");
const User=require("../models/User");

const verifyToken=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Not authorised"});
        }
        const verified=jwt.verify(token,'z9VObZ29dgq/98FM3Qdzx2Z4SaYtJli59+3SFcjPWo4=');
        if(!verified){
           return res.status(403).json({message:"Invalid Token"});
        }
        const user=await User.findById(verified.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}
module.exports=verifyToken;