
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
exports.auth=(req, res, next) =>{
 
   
   //const token = req.headers.authorization.split('')[1];
   const token =req.headers.authorization
   //const token =req.cookies.token
     console.log(token)
    if(!token){
    
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        
        req.user = decoded;
      
        next();
    } catch(e){
        
        res.status(400).json({ msg:'Token is not valid'});
    }
}


exports.userMiddleware = (req, res, next) => {
  console.log("user running")

  
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  exports.adminMiddleware = (req, res, next) => {
   
    console.log("admin running")
    
      if (req.user.role !== "admin") {
        return res.status(400).json({ message: "Admin access denied" });
      }
    
    // if (req.user.role !== "super-admin" ) {
    //   return res.status(200).json({ message: "Admin access denied" });
    //   }
    next();
  };
  
  
