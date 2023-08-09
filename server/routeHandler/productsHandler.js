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

try {
  router.get("/admin/:id", async (req, res) => {
   const id = req.params.id;
            const query = { _id }
            const user = await ProductsCollections.findOne(query);
            res.send({ isAdmin: user?.role === 'admin'});
  });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
}

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const result = await ProductsCollections.insertOne(product);
    res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

router.put("/verify/:id", async (req, res) => {
  try {
   const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          verification: "stockOut",
        },
      };
      const result = await ProductsCollections.updateOne(
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

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      _id: new ObjectId(id),
    };
    const result = ProductsCollections.deleteOne(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
module.exports = router;
