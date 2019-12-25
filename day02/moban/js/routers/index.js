const express=require("express");
const bodyParser=require("body-parser");

const Router= express.Router();

Router.get("/home",(req,res)=>{
    res.send("首页");
})
Router.get("/login",(req,res)=>{
    res.send("登录页")
})
Router.post("/login",(req,res)=>{
    res.send("登录页++")
})

;;
module.exports = Router; 