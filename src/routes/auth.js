const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

authRouter.post("/signup", async(req,res)=>{
    try {
        //validation of data 
        validateSignUpData(req);
        //encryption of password
        const {firstName,lastName,emailId,password} = req.body;
        const passwordHash =await bcrypt.hash(password,10);
        //console.log(passwordHash)
        //creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        });
        
        
            await user.save();
            res.send("user added")
        } catch (error) {
            res.status(400).send("there is an error"+ error);
        }
})


authRouter.post("/login",async(req,res)=>{
    try {
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //creating a jwt token 
            const token = await jwt.sign({_id:user._id.toString()}, "Trishit", {expiresIn:"7d"});

            //add the token to cookie and send the user back the token
            res.cookie("token", token,{
                expires:new Date(Date.now()+8*3600000),
            });
            res.send("login successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).send("something went wrong")
    }
});

authRouter.post("/logout", async(req,res)=>{
    // res.cookie("token",null,
    //     {
    //         expires:new Date(Date.now()),
    //     }
    //     );
        res.clearCookie("token");
    res.send("logout sucessful");
});



module.exports = authRouter;