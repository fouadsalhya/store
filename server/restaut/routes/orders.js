const express = require('express');
const router = express.Router()


const { create } = require('../controllers/orderController');
const { requireSignin, isAuth } = require('../middlewares/auth');
const { userById, addToUserHistory } = require('../middlewares/user')


router.post("/create/:userId",[requireSignin,isAuth,addToUserHistory],create)
router.param('userId',userById)



module.exports  = router