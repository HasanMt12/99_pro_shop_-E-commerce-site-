const {  orderCollections } = require("../collections/collections");

const postPayment = async (req, res) => {
  try {
     const { transactionId } = req.query;

            if(!transactionId){
                return res.redirect(`${process.env.CLIENT_URL}/payment/success?transactionId=${transactionId}`);
            }
            
            const result = await orderCollections.updateOne(
              { transactionId },
              { $set: { paid: true, paidAt: new Date() } }
            );

            if(result.modifiedCount > 0){
                res.redirect(`${process.env.CLIENT_URL}/payment/success?transactionId=${transactionId}`);
            }
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

module.exports = { postPayment };