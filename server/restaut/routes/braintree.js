const express = require('express')
const router = express.Router()


const { generateToken, processPayment } = require('../controllers/braintreeController')
const { requireSignin, isAuth, isAdmin } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')



router.get('/getToken/:userId',[requireSignin,isAuth],generateToken)
router.param('userId',userById)
router.post('/purchase/:userId',[requireSignin,isAuth],processPayment)



module.exports = router