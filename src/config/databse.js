const mongoose = require('mongoose');


// const connectDB= async()=>{
//     try {
//         await mongoose.connect(  
//           "mongodb+srv://bhowmiktrishit:uYf3hH0vklHwTokM@devtinder.zqegy.mongodb.net/?retryWrites=true&w=majority&appName=devTinder"
//         );

//             console.log("DB connected");
//     } catch (error) {
//         console.log(error)
//     }
    
// };

const connectDB = async()=>{
    await mongoose.connect(  
                //    "mongodb+srv://bhowmiktrishit:uYf3hH0vklHwTokM@devtinder.zqegy.mongodb.net/?retryWrites=true&w=majority&appName=devTinder"
                 "mongodb+srv://bhowmiktrishit:uYf3hH0vklHwTokM@devtinder.zqegy.mongodb.net/devTinder_DB?retryWrites=true&w=majority&appName=devTinder"

    )

                }

module.exports = connectDB;






//uYf3hH0vklHwTokM
    



// "mongodb+srv://bhowmiktrishit:uYf3hH0vklHwTokM@devtinder.zqegy.mongodb.net/devTinder_DB?retryWrites=true&w=majority&appName=devTinder"
