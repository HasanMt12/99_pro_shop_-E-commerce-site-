const { ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
const { orderCollections, cartCollections } = require("../collections/collections");

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // true for live, false for sandbox

const getOrderByTranId = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderCollections.findOne({ transactionId: id });
    console.log(id, order);
    res.send(order);
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
  }
};

const postOrder = async (req, res) => {
  try {
    const order = req.body;
    const { cart, email, location } = order;

    if (!cart || !email || !location) {
      return res.send({ error: "Please provide all the information" });
    }

    const orderedService = await cartCollections.findOne({ _id: new ObjectId(order.cart) });

    console.log(orderedService);
    const transactionId = new ObjectId().toString();
    const data = {
      total_amount: orderedService.price,
      currency: order.currency,
      tran_id: transactionId, // use unique tran_id for each API call
      success_url: `${process.env.SERVER_URL}/payment/success?transactionId=${transactionId}`,
      fail_url: `${process.env.SERVER_URL}/payment/fail?transactionId=${transactionId}`,
      cancel_url: `${process.env.SERVER_URL}/payment/cancel`,
      ipn_url: "http://localhost:5000/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: order.customerName,
      cus_email: order.email,
      cus_add1: order.location,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: order.postcode,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to the payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      console.log(apiResponse);
      orderCollections.insertOne({
        ...order,
        price: orderedService.price,
        transactionId,
        paid: false,
      });
      res.send({ url: GatewayPageURL });
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

module.exports = { getOrderByTranId, postOrder };
