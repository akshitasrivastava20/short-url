const User=require('../models/user');
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require('../service/auth')

async function handlesignup(req,res) {
    const {username,email,password}=req.body
    await User.create({
        username,
        email,
        password,
    });
    return res.render('home');

    
}
async function handlelogin(req,res){
     const {email,password}=req.body;
     const user = await User.findOne({email,password});
     if(!user){ return res.render("login",{
        error:"invalid username or password",
     });}
 
     const token=setUser(user);
    //  res.cookie("uid",token);
    //  return res.redirect("/");
    res.json({token});

}
module.exports={
    handlesignup,
    handlelogin,
}