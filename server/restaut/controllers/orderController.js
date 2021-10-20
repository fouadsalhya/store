const { Order } = require('../models/order')

exports.create = (req,res) => {
    req.body = {
        ...req.body,
        user:req.profile
    }
    const order = new Order(req.body)
      order.save((err,data) => {
          if(err) {
              return res.json({err})
          }
              res.send(data)
      })
}