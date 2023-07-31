const express = require("express");
const { ObjectId } = require("mongodb");
const { donnerCollection, wishlistCollections,} = require("../collections/collections");
const router = express.Router();

try {
  router.get("/", async (req, res) => {
    const email = req.query.email
    const query = {
      email: email
    }
    const wishlist = await wishlistCollections.find(query).toArray();
    res.send(wishlist);
  });
} catch (error) {
  res.status(404).send({
    error: error.message
  });
}

router.post("/", async (req, res) => {
  try {
    const wishlist = req.body;
    const result = await wishlistCollections.insertOne(wishlist);
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

module.exports = router;
