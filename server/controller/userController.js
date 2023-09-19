const { ObjectId } = require("mongodb");
const {  usersCollections } = require("../collections/collections");



// Get all user
const getUsers = async (req, res) => {
   try {const query = {};
     const result = await usersCollections.find().toArray();
      res.send(result);
   } catch (error) {
    res.send({
      error: error.message,
    });
  }
}

//get single user by email
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

// users action secure 
const adminUserAction = async (req, res) => {
  try {  const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      const query = { email: email }
      const user = await usersCollections.findOne(query);
      const result = { admin: user?.role === 'admin' }
      res.send(result);
    } catch (error) {
         res.send({
         error: error.message,
    });
  }
  }

  const visitorUserAction = async (req, res) => {
  try {  const email = req.params.email;
            const query = { email }
            const user = await usersCollections.findOne(query);
            res.send({ isVisitor: user?.role === 'visitor'});
    } catch (error) {
         res.send({
         error: error.message,
    });
  }
  }

  

//user create for login
const postUserForLogin = async (req, res) => {
  try {
    const user = req.body;
      const query = { email: user.email }
      const existingUser = await usersCollections.findOne(query);

      if (existingUser) {
        return res.send({ message: 'user already exists' })
      }

      const result = await usersCollections.insertOne(user);
      res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
}

//make a golden user
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
                postUserForLogin , makeGoldenUser , visitorUserAction}