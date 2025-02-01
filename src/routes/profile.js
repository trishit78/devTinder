const express= require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const ProfileRouter = express.Router();

ProfileRouter.get("/profile",userAuth,async(req,res)=>{
    try {
        const user = req.user
       
    res.send("User Found"+  user);
} 
    catch (error) {
        res.status(400).send("Something went wrong" + error)       
    }
})


ProfileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser)
        
        Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
        await loggedInUser.save();

        console.log(loggedInUser)
        
        res.send(`${loggedInUser.firstName} , your profile updated successfully`)
        

    } catch (error) {
        res.status(400).send("ERROR  "+error);
    }
})


module.exports = ProfileRouter ;