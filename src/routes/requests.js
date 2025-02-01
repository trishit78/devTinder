const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");


const requestRouter = express.Router();

requestRouter.post("/request/send/interested/:toUserId",userAuth, async(req,res)=>{
   try {
    const fromUserId = req.body._id;
    const toUserId = req.params.toUserId;
    const status = req.params.toUserId;
    const connectionRequest = new ConnectionRequest({
        fromUserId,toUserId,status
    });

    const data =  await connectionRequest.save();
    
    res.send("connection request sent");

   } catch (error) {
    res.status(400).send("Error "+ error);
   }
});





module.exports = requestRouter; 