const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require("dotenv").config();


const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors())
app.use(express.json());


  const categoryHandler = require("./routeHandler/categoryHandler");
  const productsHandler = require("./routeHandler/productsHandler");
  const userHandler = require("./routeHandler/userHandler");
  const cartHandler = require("./routeHandler/cartHandler");
  const wishlistHandler = require("./routeHandler/wishlistHandler");


async function run(){

    try{

      app.use("/categories", categoryHandler);
      app.use("/categories", productsHandler);
      app.use("/allProducts", productsHandler);
      app.use("/users", userHandler);
      app.use("/cart", cartHandler);
      app.use("/wishlist", wishlistHandler);
  
    
      }

    
    finally{

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('99 pro server running')
})

app.listen(port, () => console.log(`99 pro server listening on ${port}`))