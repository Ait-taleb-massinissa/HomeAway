const mongoose = require("mongoose");

const usersSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    number:String,
    password:String,
    isHost:Boolean
})


const usersModel = mongoose.model("users",usersSchema);


module.exports=usersModel;
