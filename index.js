const connectToMongo=require('./db');
const express = require('express');
connectToMongo();


const app = express()
const port = 5000

//Middleware
app.use(express.json())

//Available Routes
app.use('/api/auth' ,require('./routes/auth'))
app.use('/api/notes' ,require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening at  http://localhost:${port}`)
})


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://user_23:47smwFOpExFD4XmA@clusterinb1.sbe2ses.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
