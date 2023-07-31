const express = require("express");
const { ObjectId } = require("mongodb");
const { categoryCollections } = require("../collections/collections");
const router = express.Router();

// demo code

// router.get("/", async (req, res) => {
//   try {
//     res.send("sending data");
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

/* -----Categories-------- */

try {
  router.get("/", async (req, res) => {
    const query = {};
    const categories = await categoryCollections.find(query).toArray();
    res.send(categories);
  });
} catch (error) {
  res.status(404).send({ error: error.message });
}



module.exports = router;
