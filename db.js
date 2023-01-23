const mongoose= require('mongoose');

const mongoUrI="mongodb+srv://user_23:47smwFOpExFD4XmA@clusterinb1.sbe2ses.mongodb.net/?retryWrites=true&w=majority";

// const { MongoClient, ServerApiVersion } = require('mongodb');

//const uri = "mongodb+srv://user_23:47smwFOpExFD4XmA@clusterinb1.sbe2ses.mongodb.net/?retryWrites=true&w=majority";


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const connectToMongo=()=>{
  mongoose.connect(mongoUrI,()=>{
    console.log('Connected to Mongo Successfully');
  })
}

module.exports=connectToMongo;