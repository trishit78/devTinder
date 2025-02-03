const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const User = require("../models/user");

userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{
    try {
        const loggedInUser =  req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName"]);

        res.json({
            message:"data fetched successfully",
            data:connectionRequests,
        });

    } catch (error) {
        req.status(400).send("Something went wrong" + error);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ],
        }).populate("fromUserId", ["firstName","lastName"]);

        res.json({
            data:connections
        })
    } catch (error) {
        res.status(400).json({message: error})
    }
})


module.exports = userRouter;


