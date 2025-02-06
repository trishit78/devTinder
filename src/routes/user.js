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
        }).populate("fromUserId", ["firstName","lastName"])
        .populate("toUserId",["firstName","lastName"]);
        
        const data = connections.map((row) =>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.send(
            data
        )
    } catch (error) {
        res.status(400).json({message: error})
    }
})



userRouter.get("/feed",userAuth, async(req,res)=>{
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1)*limit;


        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[{
                fromUserId:loggedInUser._id }, {toUserId:loggedInUser._id      
            }],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        console.log(hideUsersFromFeed);

        const users = await User.find({
            $and:[
                { _id:{$nin : Array.from(hideUsersFromFeed)}  },
                { _id: {$ne: loggedInUser._id}},
            ]
        }).select("firstName lastName about skills").skip(skip).limit(limit);



        res.send(users);



    } catch (error) {
        res.status(400).json({message:error});
    }
})

module.exports = userRouter;


