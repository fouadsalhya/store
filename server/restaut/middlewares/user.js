const User = require('../models/user')

exports.userById = (req,res,next,id) => {
     User.findById(id).exec((err,user) => {
         if(err || !user) {
             res.status(404).send(err)
         }
         req.profile = user
         next()
     })
}

exports.addToUserHistory = (req, res, next) => {
    let history = []
        history = req.body.foods.map(food => {
            return {
                _id:food._id,
                name:food.name,
                description:food.description,
                quantity:food.count,
                amount:food.price * food.count,
                transact_id:req.body.transactionId
            }
        })
         if(history.length > 0) {
            User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{$new:true},(err,data) => {
                if(err) {
                    return res.send(err)
                }
                return next()
          })
         }
         next()
       
}