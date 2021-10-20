const expressJWT = require('express-jwt')
require('dotenv').config()
exports.requireSignin = expressJWT({
    algorithms:["HS256"],
    secret:process.env.JWT_SECRET,
    userProperty:'auth'
})

exports.isAuth = (req,res,next) => {
    const user = req.profile._id && req.auth._id && (req.profile._id == req.auth._id)
         if(!user) {
             res.json({messagr:'Access Denied'})
         }
         next()
}
exports.isAdmin = (req,res,next) => {
    if(req.auth.role == 0) {
        res.json({message:'Admin Resource , Access Denied'})
    }
    next()
}