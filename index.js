const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId, serialize } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(cors())
require("dotenv").config();

 


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@bistro-boss.mtnkq.mongodb.net/?retryWrites=true&w=majority&appName=bistro-boss`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollection = client.db("bistro").collection("menu");
    const reviewsCollection = client.db("bistro").collection("reviews");
    const   cartsCollection = client.db("bistro").collection("carts");
    const   usersCollection = client.db("bistro").collection("users");
   
   app.get('/menu',async(req,res)=>{
 const result = await menuCollection.find().toArray()
 res.send(result)
   })
   app.get('/reviews',async(req,res)=>{
  const result = await reviewsCollection.find().toArray()
 res.send(result)
   })
// carts collection
app.delete('/carts/:id',async(req,res)=>{
  const id = req.params.id;
  const query= {_id : new ObjectId(id)}
const result =await cartsCollection.deleteOne(query)
res.send(result)

})
// users
app.post('/users',async(req,res)=>{
  const user = req.body;
  const result = await usersCollection.insertOne(user)
  res.send(result)
})


   app.post('/carts',async(req,res)=>{
    const cartItem = req.body;
    console.log(cartItem)
    const result = await cartsCollection.insertOne(cartItem)
    res.send(result)

   })
   app.get('/carts',async(req,res)=>{
    const email = req.query.email;
    const query = {email:email}
    const result = await cartsCollection.find(query).toArray()
   res.send(result)
     })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log(`Bistro Boss is Counting ${port}`);
});
/**
 * 
 * 
 * .....................................................
 * 
 * NAMEING CONVATION
 * ........................................................
 * 
 * 
 * 
 */