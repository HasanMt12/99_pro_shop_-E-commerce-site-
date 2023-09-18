const express = require("express");
const router = express.Router();

const { getOrderByTranId, postOrder } = require('../controller/orderController')


  router.get("/by-transaction-id/:id", getOrderByTranId)
  router.post("/", postOrder)



    
      
         








   

module.exports = router;
