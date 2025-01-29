const mongoose = require('mongoose');


const connectDB= async()=>{
    try {
        await mongoose.connect(  
          "mongodb+srv://bhowmiktrishit:uYf3hH0vklHwTokM@devtinder.zqegy.mongodb.net/?retryWrites=true&w=majority&appName=devTinder"
        );

            console.log("DB connected");
    } catch (error) {
        console.log(error)
    }
    
};

connectDB();

// connectDB()
//     .then(()=>{
//         console.log("DB connection established...");
//     })
//     .catch((err)=>{
//         console.error("DB cannot be connected")
//         console.log(err)
//     })


//uYf3hH0vklHwTokM
    