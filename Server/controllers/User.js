const express=require("express");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const generateTokenAndVerify=require('../JWT/generateToken');
const router=express.Router();

router.post('/signup',async(req,res)=>{
    const{userName,email,password,confirmPassword}=req.body;
    if(password!=confirmPassword){
        res.status(400).json({message:"Missmatch Password"});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User already Exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user= await new User({userName,email,password:hashedPassword,confirmPassword:hashedPassword});
        await user.save();
        generateTokenAndVerify(user._id,res);
        res.status(201).json({message:"Signup Successfully!",User:user})
    }
    catch(err){
        res.status(500).json({message:"Register Failed",error:err.message});
    }
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"Invalid user"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({message:"Invalid Password"});
        }
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
module.exports=router;