const express = require("express");
const bcrypt = require("bcrypt")
const {auth} = require("../middlewares/auth")
const {UserModel,validateUser,validateLogin,createToken} = require("../models/userModel")


const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"user work 77777"})
})


// req for get in userInfo --> accordeing password
router.get("/myInfo", auth ,async(req,res) => {
  try{
    const data = await UserModel.findOne({_id:req.tokenData._id},{password:0});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


// req for add new user
router.post("/", async(req,res) => {
  const validBody = validateUser(req.body)
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password,10);
    await user.save();
    user.password = "******";
    res.status(201).json(user);
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({err:"Email already in system",code:11000})
    }
    console.log(err);
    res.status(502).json({err})
  }
})
// req for login
router.post("/login", async(req,res) => {
  // valid the token
  const validBody = validateLogin(req.body)
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    const user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(401).json({err:"Email not found!"});
    }
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
      return res.status(401).json({err:"Password not match"});
    }
    // save token in the cookies
    const token = createToken(user.id)
    res.cookie("token",token,{
      httpOnly:false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
    .json({token,msg:"You logged in"})
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
// req for delete token from cookies
router.delete(("/logout"),async(req,res)=>{
  res.cookie("token","",{
    httpOnly:false,
    expires: new Date(Date.now() -99999999)
  })
  .json({deleted:true,msg:"You logged out"})
})

module.exports = router;