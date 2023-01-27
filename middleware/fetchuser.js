var jwt = require('jsonwebtoken');

const fetchuser =(req,res,next)=>{
   //Get the user from the  jwt token and add id to req object
   const token= req.header('auth-token');
   if(!token){
      res.status(401).send({error:"Please authenticate using a valid token"})
   }
   try {
    const JWT_SECRET = "Iknowyourdarkestsecretsobeverycarefulofme";
   //  const jwt_secret=process.env.JWT_SECRET;
    const data= jwt.verify(token, JWT_SECRET);
    //.verify(token=>['authToken' saved in the DataBase],secretOrPrivateKey)
    //.verify VERIFIES IF THE USER IS THE SAME OR NOT
    req.user=data.user;
    next();  
 } catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token"});
 }
}





module.exports=fetchuser;