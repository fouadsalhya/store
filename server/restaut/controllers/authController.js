const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req,res) => {
    let user = new User(req.body)
         user.save((err,user) => {
             if(err) {
                 return  res.status(400).json({err})
             }
             else {
                  return res.status(200).json({user})

             }
         })
}

exports.signin = (req,res) => {
     const { email , password } = req.body
        User.findOne({email},(err,user) => {
            if(err || !user) {
                return  res.json({message:'email not found'})
            }
            if(!user.authenticated(password)) {
                 return  res.json({message:'password not found'})
            }
            const token = jwt.sign({_id:user._id,role:user.role,},process.env.JWT_SECRET)
            res.cookie('token',token,{expire : new Date() + 99999999999999999999999999999})
            const { _id , name , email , role } = user
             res.json({
                 token, user:{_id,name,email,role}
             })
        })
 }

 exports.signout = (req,res) => {
     res.clearCookie('token')
     res.json({message: 'user signout'})
 }