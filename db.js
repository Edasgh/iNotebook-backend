const mongoose= require('mongoose');
require('dotenv').config();
const mongoUrI=process.env.MONGO_URI;





const connectToMongo=()=>{
  mongoose.connect(mongoUrI,()=>{
    console.log('Connected to Mongo Successfully');
  })
}

module.exports=connectToMongo;
