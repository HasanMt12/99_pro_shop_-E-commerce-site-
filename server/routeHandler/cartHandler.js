const express = require("express");
const { cartCollections } = require("../collections/collections");
const { ObjectId } = require("mongodb");
const router = express.Router();


try {
  router.get("/", async (req, res) => {
    const email = req.query.email
    const query = {email: email}
    const cart = await cartCollections.find(query).toArray();
    res.send(cart);
  });
} catch (error) {
  res.status(404).send({
    error: error.message
  });
}


router.delete("/:id", async (req, res) => {
  try {
     const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollections.deleteOne(query);
            res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
   const cart = req.body;
  //  const query = { email: user.email }
   const existingCart = await cartCollections.findOne(cart);
      if (existingCart) {
        return res.send({ message: 'cart already exists' })
      }
   const result = await cartCollections.insertOne(cart);
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
   const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
       const cartItem = await cartCollections.findOne(filter);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    // Define the fixed price per unit
    const pricePerUnit = cartItem.price / cartItem.quantity;

    // Get the current quantity
    const currentQuantity = cartItem.quantity;

    // Calculate the new quantity and price
    const newQuantity = currentQuantity + 1;
    const newPrice = pricePerUnit * newQuantity;

    const options = { upsert: true };
    const updatedDoc = {
    
        $set: {
           quantity: newQuantity,
           price: newPrice,
        }, 
      };
      const result = await cartCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});


router.put("/cartMinus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const cartItem = await cartCollections.findOne(filter);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Define the fixed price per unit
    const pricePerUnit = cartItem.price / cartItem.quantity;

    // Get the current quantity
    const currentQuantity = cartItem.quantity;

    // Ensure that the new quantity doesn't go below 1
    const newQuantity = Math.max(1, currentQuantity - 1);

    // Calculate the new price
    const newPrice = pricePerUnit * newQuantity;

    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        quantity: newQuantity,
        price: newPrice,
      }, 
    };

    const result = await cartCollections.updateOne(filter, updatedDoc, options);
    res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

module.exports = router;
