const mongoose= require('mongoose');

const mongoUrI="mongodb://localhost:27017";

const connectToMongo=()=>{
  mongoose.connect(mongoUrI,()=>{
    console.log('Connected to Mongo ');
  })
}

module.exports=connectToMongo;