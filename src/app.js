const express = require("express");

const app = express();


app.use("/test",(req,res)=>{
    res.send("hello");
})



app.use((req,res)=>{
    res.send("welcome to the world");
})



app.listen(3001,()=>{
    console.log("listening on port 3001");
});