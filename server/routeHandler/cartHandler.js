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
   const result = await cartCollections.insertOne(cart);
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

module.exports = router;
