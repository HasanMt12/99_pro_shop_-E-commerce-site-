const { ObjectId } = require("mongodb");
const {  usersCollections } = require("../collections/collections");

const getUsers = async (req, res) => {
   try {const query = {};
   const users = await usersCollections.find(query).toArray();
   res.send(users);
   } catch (error) {
    res.send({
      error: error.message,
    });
  }
}

const getUserByEmail = async (req, res) => {
   try {
   const email = req.params.email;
   const query = { email : email }
   const user = await usersCollections.find(query).toArray();
   res.send(user)
} catch (error) {
    res.send({
      error: error.message,
    });
  }
}

const adminUserAction = async (req, res) => {
  try {  const email = req.params.email;
         const query = { email }
         const user = await usersCollections.findOne(query);
         res.send({ isAdmin: user?.role === 'admin'});
    } catch (error) {
         res.send({
         error: error.message,
    });
  }
  }

const postUserForLogin = async (req, res) => {
  try {
    const user = req.body;
    const result = await usersCollections.insertOne(user);
    res.status(200).send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
}
  
const makeGoldenUser = async (req, res) => {
  try {
      const id = req.params.id;
              const filter = {_id: new ObjectId(id)}
              const options = {upsert: true};
              const updatedDoc = {
                $set: {
                  verification: 'goldenUser'
                }
              }
              const result = await usersCollections.updateOne(filter,  updatedDoc, options);
              res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
}

module.exports = {getUsers , getUserByEmail , adminUserAction ,
                postUserForLogin , makeGoldenUser}