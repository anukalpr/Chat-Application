const express=require("express");
const User=require("../models/User");
const verifyToken=require("../middleware/verifyToken");
const bcrypt=require("bcrypt");
const generateTokenAndVerify=require('../JWT/generateToken');
const router=express.Router();

router.post('/signup',async(req,res)=>{
    const{userName,email,password,confirmPassword}=req.body;
    if(password!=confirmPassword){
       return res.status(400).json({message:"Mismatch Password"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already Exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user= await new User({userName,email,password:hashedPassword});
        await user.save();
        generateTokenAndVerify(user._id,res);
        res.status(201).json({message:"Signup Successfully!",User:user})
    }
    catch(err){
       return res.status(500).json({message:"Register Failed",error:err.message});
    }
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid user"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(400).json({message:"Invalid Password"});
        }
        generateTokenAndVerify(user._id,res);
        res.status(201).json({message:"SignIn Successfull!",user:{
            id:user._id,
            userName:user.userName,
            email:user.email,
        }})
    }
    catch(err){
        res.status(500).json({message:"SigIn Failed",error:err.message});
    }
})
router.post('/signout',async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"user logout successfully"});
    }catch(err){
        res.status(500).json({message:"SigIn Failed",error:err.message});
    }
})
router.get("/searchUsers", async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({
            $or: [
              { userName: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } }
            ]
          });
          
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error searching users" });
    }
  });
  
router.get('/getUserProfile',verifyToken,async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const filteredUsers=await User.find({_id: {$ne: loggedInUser},}).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(err){
        res.status(500).json({message:`Server Error due to ${err}`});
    }
})
module.exports=router;