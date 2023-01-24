const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');


//ROUTE 1:Create a user using: POST "/api/auth" . Dosen't require Auth
//router.get('/',(req,res)=>{//code})

router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','password length should be atleast 8 characters').isLength({ min: 8 })
],async (req, res)=>{

    //if there are errors, return Bad Request and the error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{   
        // Check whether the user with the same email exists already
        let user= await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"A user with this email already exists "});
        }
        //bcrypt adds salt and hash to passwords 
        //For extra security
        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt)
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password: secPass
        });

        const data={
            user:{
                id:user.id
            }
        }
       const JWT_SECRET = 'Iknowyourdarkestsecretsobeverycarefulofme';
       const authToken= jwt.sign(data, JWT_SECRET);
      
        res.json({authToken});
        //no need to write ({authToken:authToken})

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    
        
    });

    //ROUTE 2:Authenticate a User using: POST '/api/auth/login'. no login required
    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','Password cannot be blank').exists()
        
    ],async (req, res)=>{
      //if there are errors, return Bad Request and the error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    const {email , password}=req.body;
    try {
     let user= await User.findOne({email});
     if(!user){
     return res.status(400).json({error:"Please try to connect with correct credentials"});

     }

     const passwordCompare= await bcrypt.compare(password,user.password);//Compares the entered password with the saved password(in the db)
     if(!passwordCompare){
        return res.status(400).json({error:"Please try to connect with correct credentials"});
  
     }

     const data={
        user:{
            id:user.id
        }
    }
   const JWT_SECRET = 'Iknowyourdarkestsecretsobeverycarefulofme';
   const authToken= jwt.sign(data, JWT_SECRET);
  
    res.json({authToken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    
//ROUTE 3: Get loggedin user details using: POST 'api/auth/getuser' . Login required
router.post('/getuser',fetchuser,async (req, res)=>{

 try {
   let  userId=req.user.id;
  const user= await User.findById(userId).select("-password");
  res.send(user);
 } catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error")
 }



})
})


module.exports=router