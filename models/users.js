const mongoose = require('mongoose');

const User = new mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  phoneno: {
    type: Number,
  },
 
  resetToken:{
    type:String,
  },
  expireToken:{
    type:String,
  },
  // usertype:{
  //   type:String,
  //  },
 role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  }
  
},{timestamps: true},);

module.exports = mongoose.model('Users', User);
