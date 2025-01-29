const express = require("express");

const app = express();

require("./config/databse")

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



app.listen(3001,()=>{
    console.log("listening on port 3001");
})