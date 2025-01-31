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

app.post("/signup", async (req,res)=>{

    try {
    //validation of data 
    validateSignUpData(req);
    //encryption of password
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash =await bcrypt.hash(password,10);
    console.log(passwordHash)
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
});

app.post("/login",async(req,res)=>{
    try {
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //creating a jwt token 

            const token = await jwt.sign({_id:user._id},"Trishit");
            console.log(token)


            //add the token to cookie and send the user back the token
            res.cookie("token", token);
            res.send("login successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try {
        
        const user = req.user
       
    res.send("User Found"+  user);
} 
    catch (error) {
        res.status(400).send("Something went wrong" + error)       
    }
})







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
