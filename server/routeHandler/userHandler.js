const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const {  usersCollections } = require("../collections/collections");


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
  //all user find and protect admin route
try {
  router.get("/admin/:email", async (req, res) => {
   const email = req.params.email;
            const query = { email }
            const user = await usersCollections.findOne(query);
            res.send({ isAdmin: user?.role === 'admin'});
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

router.put("/admin/:id", async (req, res) => {
  try {
      const id = req.params.id;
              const filter = {_id: new ObjectId(id)}
              const options = {upsert: true};
              const updatedDoc = {
                $set: {
                  verification: 'goldenUser'
                }
              }
              const result = await usersCollections.updateOne(filter,  updatedDoc, options);
              res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});







   

module.exports = router;
