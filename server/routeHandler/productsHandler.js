const express = require("express");
const { ObjectId } = require("mongodb");
const { ProductsCollections } = require("../collections/collections");
const router = express.Router();

try {
  router.get("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;
    const query = { categoryId: categoryId};
    const products = await ProductsCollections.find(query).toArray();
    res.send(products);
  });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
}

try {
  router.get("/", async (req, res) => {
   const query = {};
   const allProducts = await ProductsCollections.find(query).toArray();
   res.send(allProducts);
  });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
}


module.exports = router;
