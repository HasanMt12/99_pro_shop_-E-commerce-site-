const express = require("express");
const { reviewCollections } = require("../collections/collections");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
      const query = req.body
      const result = await reviewCollections.insertOne(query);
      res.status(201).send(result)
  } catch (error) {
    res.status(300).send({
      error: error.message,
    });
  }
});

try {
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
            const query = { id };
            const cursor = reviewCollections.find(query);
              const userReview = await cursor.toArray();
      res.send(userReview);
          
  });
} catch (error) {
  res.status(404).send({
    error: error.message
  });
}

module.exports = router;