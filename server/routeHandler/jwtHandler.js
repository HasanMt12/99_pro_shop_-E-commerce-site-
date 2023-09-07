const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

try {
  router.post("/", async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '100d' })
    console.log(token)
    res.send({ token })  
 });  
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
}

module.exports = router;