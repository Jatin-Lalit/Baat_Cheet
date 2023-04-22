const express=require("express");
const {connect}=require("./db.js");
const { userrouter } = require("./router/user.router.js");
const app=express();

const cors=require("cors")
require('dotenv').config();
app.use(cors());
app.use(express.json());





app.use("/",userrouter)









app.listen(process.env.Port,async()=>{

try{
    await connect
    
    console.log("Connected to DataBase")
}catch(err){
    console.log(err.message)
}
console.log("Server is on Rocks")


})