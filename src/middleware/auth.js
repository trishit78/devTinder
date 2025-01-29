const adminAuth =  (req, res, next) => {
    console.log("admin auth is getting checked");
    const token = "xyz";
    const isAuthorized = token === "xyz";

    if (!isAuthorized) {  
        return res.status(401).send("Unauthorized request");
    } 
    
    next(); // Proceed to the next middleware or route handler if authorized
}


const userAuth =  (req, res, next) => {
    console.log("user auth is getting checked");
    const token = "xyz34";
    const isAuthorized = token === "xyz";

    if (!isAuthorized) {  
        return res.status(401).send("Unauthorized request");
    } 
    
    next(); // Proceed to the next middleware or route handler if authorized
}

module.exports = {adminAuth,userAuth};