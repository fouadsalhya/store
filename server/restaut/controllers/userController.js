const User = require('../models/user')



exports.getUserById = (req,res) => {
    let user = req.profile
    res.json({user})
}

exports.getAllUsers = (req,res) => {
    User.find().exec((err,users) => {
        if(err || !users) {
            res.status(404).send(err)
        }
        res.status(200).json({users})
    })
}



exports.removeUser = (req, res) => {
      User.findByIdAndRemove({_id:req.profile._id},(err,data) => {
          if(err) {
              return res.send(err)
          }
          res.json({})
        
      })
}

exports.updateUser = (req, res) => {
     let id = req.profile._id
     User.updateOne({id},{user:req.body}, (err,user) => {
         if(err) {
             return res.send(err)
         }
         res.json({user})
     })
}

