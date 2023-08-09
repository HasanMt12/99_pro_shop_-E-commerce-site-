const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const {  usersCollections } = require("../collections/collections");


try {
  router.post("/", async (req, res) => {
    
    const email = req.query.email;
            const query = { email: email };
            const user = await usersCollections.findOne(query);
            console.log(user)
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
                expiresIn: "50d",
                });
                return res.send({ token: token });
            }
            res.status(403).send({ token: "" });
            });  
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
}

module.exports = router;