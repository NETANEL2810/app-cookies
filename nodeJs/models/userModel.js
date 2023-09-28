const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// sechma for user
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  role:{
    type:String, default:"user"
  }
},{timestamps:true})

exports.UserModel = mongoose.model("users",userSchema);
// create token for user - save in the cookies
exports.createToken = (user_id) => {
  const token = jwt.sign({_id:user_id},"monkeysSecret",{expiresIn:"1440mins"})
  return token;
}

// validation for user - add new user
exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}
// validation for login for user
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}