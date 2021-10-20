const braintree = require('braintree')
require('dotenv').config()


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

exports.generateToken = (req,res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            return res.json({err})
        }
         res.json({token: response.clientToken});
      });
}

exports.processPayment = (req,res) => {
  let { amount, paymentMethodNonce } = req.body
  gateway.transaction.sale({
    amount,
    paymentMethodNonce,
    options: {
      submitForSettlement: true
    }
  },(err,result) => {
    if(err) {
      res.json({err})
    }
    res.send(result)
  })
}