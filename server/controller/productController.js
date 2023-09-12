const { ObjectId } = require("mongodb");
const { ProductsCollections } = require("../collections/collections");

//get all products
const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search;
    const query = {name: { $regex: search, $options: 'i'}}
    const allProducts = await ProductsCollections.find(query).toArray();
    res.send(allProducts);
   } catch (error) {
    res.send({
      error: error.message,
    });
  }
}
// get categories
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const query = { categoryId: categoryId};
    const products = await ProductsCollections.find(query).toArray();
    res.send(products);
   } catch (error) {
    res.send({
      error: error.message,
    });
  }
}
//get product details 
const getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const details = await ProductsCollections.findOne(query);
    console.log(details)
    res.status(200).send(details);
  } catch (error) {
    console.log('error hoise')
    res.status(404).send({ error: error.message, });
    
  }
}

//admin action security 
const adminActions = async (req, res) => {
  try {
     const id = req.params.id;
     const query = { _id }
     const user = await ProductsCollections.findOne(query);
     res.send({ isAdmin: user?.role === 'admin'});
   } catch (error) {
    res.send({
      error: error.message,
    });
  }
}

// post a product
const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await ProductsCollections.insertOne(product);
    res.send(result);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

// make a product stock out
const productStockOut = async (req, res) => {
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
}

//delete a product
const deletePRoduct = async (req, res) => {
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
}
module.exports={getAllProducts , getCategoryById , getProductDetails , adminActions , postProduct , productStockOut , deletePRoduct};