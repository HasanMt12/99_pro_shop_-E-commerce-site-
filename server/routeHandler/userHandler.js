const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const {  usersCollections } = require("../collections/collections");
// demo code

try {
  router.get("/", async (req, res) => {
   const query = {};
   const users = await usersCollections.find(query).toArray();
   res.send(users);
  });
} catch (error) {
  res.status(404).send({
    error: error.message
  });
}

try {
  router.get("/:email", async (req, res) => {
   const email = req.params.email;
   const query = { email : email }
   const user = await usersCollections.find(query).toArray();
   res.send(user)
  });
} catch (error) {
  res.status(404).send({
    error: error.message
  });
}

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    // console.log(user);
    const result = await usersCollections.insertOne(user);
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});




   

module.exports = router;
