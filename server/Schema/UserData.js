const mongoose = require('mongoose')


const userData = new mongoose.Schema({
    name: String,
    DOB: String,
    email: String,
    password: String,
  });
  
const Data = mongoose.model("data",userData, "UserData");

module.exports= Data