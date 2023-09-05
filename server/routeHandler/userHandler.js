const express = require("express");
const router = express.Router();


const { getUsers , getUserByEmail , adminUserAction , postUserForLogin , makeGoldenUser} = require('../controller/userController')

  router.get("/", getUsers);

  router.get("/:email", getUserByEmail);
 
  router.get("/admin/:email", adminUserAction); //all user find and protect admin route

  router.post("/", postUserForLogin);

  router.put("/admin/:id", makeGoldenUser);


module.exports = router;
