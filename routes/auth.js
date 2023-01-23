const express=require('express');
const router=express.Router();
const User=require('../models/User');


//Create a user using: POST "/api/auth" . Dosen't require Auth
//router.get('/',(req,res)=>{//code})

router.post('/',(req, res)=>{
    console.log(req.body);
    const user=User(req.body);
    res.send(req.body);
    user.save();

          })

module.exports=router