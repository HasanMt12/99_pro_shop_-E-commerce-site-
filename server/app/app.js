const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const createError = require('http-errors')     //http error handling 
const bodyParser = require('body-parser')     //express error handling
const rateLimit = require('express-rate-limit')
require("dotenv").config();

const app = express();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'To many request from this IP. please try again later'
})

//middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // for logging data
app.use(limiter)


      const categoryHandler = require("../routeHandler/categoryHandler");
      const productsHandler = require("../routeHandler/productsHandler");
      const userHandler = require("../routeHandler/userHandler");
      const cartHandler = require("../routeHandler/cartHandler");
      const wishlistHandler = require("../routeHandler/wishlistHandler");


      app.use("/categories", categoryHandler);
      app.use("/categories", productsHandler);
      app.use("/allProducts", productsHandler);
      app.use("/users", userHandler);
      app.use("/cart", cartHandler);
      app.use("/wishlist", wishlistHandler);


      app.get('/', async (req, res) => {
          res.send('99 pro server running')
      })
      app.get('/test', async (req, res) => {
          res.send('API testing 99 server')
      })
      
    //   app.all('*', (req, res) => {
    //     res.send('invalid URL')
    //   })

      //client error handling
      app.use((req, res , next) =>{
        next(createError(404, 'route not found'));
      })

      //server error handling -- all routs error show in this area
      app.use((err, req, res, next)=>{
        return res.status(err.status || 500 ).json({
            success: false,
            message: err.message,
        });
      });
      module.exports = app;