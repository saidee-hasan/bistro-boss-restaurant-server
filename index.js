const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId, serialize } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser())

require("dotenv").config();

 


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.cnyhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const Collection = client.db("bistro").collection("boss");
   
   

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
