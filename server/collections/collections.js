const mongodb = require("mongodb");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gniuvqv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

 const categoryCollections = client.db('99proBusinessSite').collection('categories')
 const ProductsCollections = client.db('99proBusinessSite').collection('products')
 const AllProductsCollections = client.db('99proBusinessSite').collection('allProducts')
 const usersCollections = client.db('99proBusinessSite').collection('users')
 const cartCollections = client.db('99proBusinessSite').collection('cart')
 const wishlistCollections = client.db('99proBusinessSite').collection('wishlist')     
 const orderCollections = client.db('99proBusinessSite').collection('orders')     

 const collection = {
  categoryCollections,
  ProductsCollections,
  AllProductsCollections,
  usersCollections,
  cartCollections,
  wishlistCollections,
  orderCollections

};
module.exports = collection;
