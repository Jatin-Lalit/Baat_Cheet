const mongoose = require("mongoose");
const UsserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
  
});
const User=mongoose.model("Users",UsserSchema);

module.exports={
    User
}