const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUsers , getUserByEmail , adminUserAction , postUserForLogin , makeGoldenUser} = require('../controller/userController');
const { usersCollections } = require("../collections/collections");

  
// middlerWare
      const verifyJWT = (req, res, next) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
      }
      // bearer token
      const token = authorization.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }
        // Warning: use verifyJWT before using verifyAdmin
      const verifyAdmin = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email }
        const user = await usersCollections.findOne(query);
        if (user?.role !== 'admin') {
          return res.status(403).send({ error: true, message: 'forbidden message' });
        }
        next();
    }
//middleware End Here
    
  router.get("/",verifyJWT, verifyAdmin,  getUsers); //get users

  router.get("/:email", getUserByEmail);
 
  router.get("/admin/:email",verifyJWT, adminUserAction); //all user find and protect admin route

  router.post("/", postUserForLogin);

  router.put("/admin/:id", makeGoldenUser);


module.exports = router;
