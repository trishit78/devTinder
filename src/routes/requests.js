const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");

const requestRouter = express.Router();



requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
      try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
  
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
          return res
            .status(400)
            .json({ message: "Invalid status type: " + status });
        }
  
        const toUser = await User.findById(toUserId);
        if (!toUser) {
          return res.status(404).json({ message: "User not found!" });
        }

       
  
        const existingConnectionRequest = await ConnectionRequest.findOne({
          $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
          ],
        });
        if (existingConnectionRequest) {
          return res
            .status(400)
            .send({ message: "Connection Request Already Exists!!" });
        }
  
        const connectionRequest = new ConnectionRequest({
          fromUserId,
          toUserId,
          status,
        });
  
        const data = await connectionRequest.save();
  res.send(req.user.firstName + "," +status + "in" + toUser.firstName)
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    }
  );





requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) =>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: "Invalid request ID" });
        }

        console.log("loggedInUser :  "+ loggedInUser);
        console.log("status   " + status)
        console.log("requestId  "  +requestId )

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("status is not valid");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
      //  const connectionRequest = await ConnectionRequest.findById(requestId);
        console.log(connectionRequest)

        if(!connectionRequest){
            return res.status(400).json({message:"connectionRequest not found"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({message:"connection request" + status,data});

    } catch (error) {
        res.status(400).send("Something went wrong" + error);
    }
}
);


module.exports = requestRouter; 
