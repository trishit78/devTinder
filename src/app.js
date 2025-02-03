const express = require("express");

const app = express();
const connectDB=require("./config/databse")

const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

const User = require("./models/user");

app.use(cookieParser());

const bcrypt = require("bcrypt");

const {userAuth} = require("./middleware/auth");

const {validateSignUpData} = require("./utils/validation");

app.use(express.json());  // used as a middleware to read the req.body


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
    .then(()=>{
        console.log("DB connection established...");

        //once I am connected to the DB ,then call the app.listen
        app.listen(3000,()=>{
            console.log("listening on port 30000");
        })
    })
    .catch((err)=>{
        console.error("DB cannot be connected")
        console.log(err)
    });
app.use((req,res)=>{
    res.send("welcome to my world");
})
