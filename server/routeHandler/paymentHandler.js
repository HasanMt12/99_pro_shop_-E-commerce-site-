const express = require("express");
const router = express.Router();

const { postPayment } = require('../controller/paymentController')

router.post("/success", postPayment)

module.exports = router;