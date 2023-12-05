const mongoose = require("mongoose");

const userSchema = {
    email: String,
    name: String,
    password: String,
    accessToken: String,
 }; 

 const User = mongoose.model("User", userSchema);

 module.exports = {
    User
 }