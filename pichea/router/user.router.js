const express=require("express");
const {User}=require("../model/users.model");
const jwt=require("jsonwebtoken");

const bcrypt=require("bcrypt");
const { blacklist } = require("../blacklist.js");
const userrouter=express.Router();


userrouter.post("/signup",async(req,res)=>{
    try{
        const {name,email,pass}=req.body;
        const isPresent=await User.findOne({email});
        if(isPresent){
            res.send("Already Register");
        }else{
     bcrypt.hash(pass,5,async(err,hash_pass)=>{
        if(err){
            console.log(err)
        }else{
            let user=new User({name,email,pass:hash_pass});
            await user.save();
            res.send("Registration Completed")
        }
     })
        }
    }catch(err){
        console.log(err.massage)
    }
})

userrouter.post("/login",async(req,res)=>{

    const {email,pass}=req.body;
    try{
        let user=await User.find({email});
        let hash=user.pass
        if(user){
            window.location.href=".../otp.html"
            bcrypt.compare(pass,hash,(err,result)=>{
                if(result){
                    res.send({"msg":"login success","token":jwt.sign({UserId:user._id},"masai",{expiresIn:"1m"}),
                "refreshtoken":jwt.sign({UserId:user._id},"NXM",{expiresIn:"3m"})})
                }
            })
        }
    }catch(err){
        console.log(err.massage)
    }
})

userrouter.get("/getnewtoken",(req,res)=>{
    const refreshtoken=req.headers.authorization;
    jwt.verify(refreshtoken,"NXM",(errdecoded)=>{
        if(err){
            res.send("please login again");
        }else{
            const token=jwt.sign({UserId:decoded.UserId},"masai",{expiresIn:"1m"}
            );
            res.send({"token":token})
        }
    })
})


userrouter.get("/logout",(req,res)=>{
    try{

     const token=req.headers.authorization
     blacklist.push(token);
     res.send("you are loged out")
    }catch(err){
        console.log(err.massage)
    }
})





module.exports={
    userrouter
}