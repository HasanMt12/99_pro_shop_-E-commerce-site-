const express = require("express");
const router = express.Router();

const { getAllProducts , getCategoryById , adminActions , postProduct ,productStockOut,  deletePRoduct, getProductDetails} = require('../controller/productController')


  router.get("/:categoryId", getCategoryById)

  router.get("/:id", getAllProducts);

  router.get("/product/:id", getProductDetails);

  router.get("/admin/:id", adminActions)

  router.post("/", postProduct)

  router.put("/verify/:id", productStockOut);

  router.delete("/:id", deletePRoduct);

module.exports = router;
