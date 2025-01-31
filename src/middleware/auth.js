// const adminAuth =  (req, res, next) => {
//     console.log("admin auth is getting checked");
//     const token = "xyz";
//     const isAuthorized = token === "xyz";

//     if (!isAuthorized) {  
//         return res.status(401).send("Unauthorized request");
//     } 
    
//     next(); // Proceed to the next middleware or route handler if authorized
// }

const jwt = require("jsonwebtoken");
const User = require("../models/user");



const userAuth = async (req, res, next) => {
    
    try {
        
        
        const {token}= req.cookies;
        if(!token) {
            res.status(400).send("Invalid Token");
        }       
        const decodedMsg = await jwt.verify(token,"Trishit");
    
        const {_id} = decodedMsg;

        const user = await User.findById(_id);
        if(!user) {
            res.status(400).send("MYUser not found")
        }
    
    req.user = user;
    
    next(); // Proceed to the next middleware or route handler if authorized
    
} 

    catch (error) {
        res.status(400).send("Error" + error);
    }


}

module.exports = {userAuth};




