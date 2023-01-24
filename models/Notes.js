const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;


const NotesSchema = new Schema({
    user:{  // associate the userId to the notes,so that..user 1 can only see all the notes added by user 1 //not user2
       type:mongoose.Schema.Types.ObjectId, 
       ref:'user'   //refer to the User model
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('notes',NotesSchema);

