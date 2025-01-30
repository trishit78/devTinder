const express = require("express");

const app = express();

const User = require("./models/user");

app.use(express.json());  // used as a middleware to read the req.body 

app.post("/signup", async (req,res)=>{

    const user = new User(req.body);



    // const user = new User({          hardcoded data import
    //     firstName:"virat",
    //     lastName:"roy",
    //     emailId:"roy456@gmail.com",
    //     password:"roy0987",
    //     age:21,
    //     gender:"male"
    // });
    
    
    try {
        await user.save();
        res.send("user added")
    } catch (error) {
        res.status(400).send("there is an error"+ error);
    }
});



//update
app.patch("/update",async(req,res)=>{
    const userId = req.body._id;
    console.log(userId)
    const data = req.body;
    console.log(data)
    try {

        // if (!userId) {
        //     return res.status(400).json({ error: "User ID is required" });
        // }

        

        // if (!updatedUser) {
        //     return res.status(404).json({ error: "User not found" });
        // }
    await User.findByIdAndUpdate(userId,data,{new:true});
        res.send("updated the user");
    }
     catch (error) {
        res.status(400).send("something went wrong");
    }
})






//delete a user
app.delete("/delete",async (req,res)=>{
    const delUser = req.body._id;
    try {
     const users = await User.findByIdAndDelete(delUser);
        res.send("user deleted");
    } catch (err) {
        res.status(404).send("something went wrong");
    }
})



//getting the user (one single user)
app.get("/userdata", async (req,res)=>{

    //find user by id
    const userId = req.query._id;
    console.log(userId)
    
    
    //const userEmail = req.body.emailId;
    //const users = await User.findOne({emailId:userEmail});
    try {
        const users = await User.findById(userId).exec();
        res.send("found the user with id");
        
    } catch (err) {
        console.log(err)
    }

    // const userEmail = req.body.emailId;
    // const users = await User.find({emailId:userEmail});
    // try {
    //     if(users.length===0){
    //     res.status(404).send("user not found");
    //     }else{
    //         res.send(users);
    //     }

        
    // } catch (error) {
    //     res.status(400).send("something went wrong");
    // }
})

app.get("/feed",async(req,res)=>{
    const users = await User.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(404).send("something went wrong");
    }
})








//connecting DataBase

const connectDB=require("./config/databse")

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


//error handling

app.get("/getUserData",(req,res)=>{
    try {
        throw new Error("fsadsga");
        res.send("user data sent");
    } catch (err) {
        res.status(500).send("some error contact support team");
    }


});
// wildcard error handling
app.use("/", (err,req,res,next)=>{
    if(err){
        res.status(500).send("something is wrong");
    }
});















//middleware foor auth
const {adminAuth,userAuth} = require("./middleware/auth");

app.use("/admin",adminAuth);

app.get("/user/login", (req,res)=>{
    res.send("user logged in")
})

app.get("/user",userAuth,(req,res)=>{
    res.send("user data is sent");
})



app.get("/admin/getAllData",(req,res)=>{
    res.send("all data sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted a user");
})
























app.use("/user",[
    (req,res,next)=>{
    console.log("response 1");      
    res.send("response 1 printed");  // if we don't send the response then it goes on an infinite cycle , after sometime when the timeout is called then it will give error
    next();
},
(req,res,next)=>{
    console.log("response 2");
  //  res.send("response 2 printed");
    next();
}],
(req,res,next)=>{
    console.log("response 3");
  //  res.send("response 3 printed");
    next();
},
(req,res,next)=>{
    console.log("response 4");
   // res.send("response 4 printed");
    next();
},
(req,res,next)=>{
    console.log("response 5");
    //res.send("response 5 printed");
    next();
}
)

//  if   ab?c  -> then b becomes optional  works for abc,ab
// if ab+c  -> then you can increase the no of b       works for abc,abbc,abbbbbbbbbbc
// if ab*cd -> then you can write anything between ab and cd
// if a(bc)?d  -> then bc is optional
// if /a/  -> then a has to be there in the string,  works for  /ab/  /cab/ , not for /b/
// if /.*fly$/  -> it can start with anything and should end with fly

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    const a = req.params.userId;
    res.send(`the use with userId: ${a}`)
})


app.get("/user/:userId",(req,res)=>{
    console.log(req.params);
    const a = req.params.userId;
    res.send(`the use with userId: ${a}`)
})


app.get("/usecase" , (req,res)=>{
    console.log(req.query);
    res.send("this is usecase with id");
})


app.use("/abc",(req,res)=>{
    res.send("this is paatern route");
})


app.get("/user",(req,res)=>{
    res.send({firstName:"Trishit", lastName:"Bhowmik"});
})


app.post("/user",(req,res)=>{
    res.send("this is the post route for users");
})


app.delete("/user",(req,res)=>{
    res.send("user deleted")
})

// this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("hello");
})



app.use((req,res)=>{
    res.send("welcome to the world");
})



// app.listen(3001,()=>{
//     console.log("listening on port 3001");
// })