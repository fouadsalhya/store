const express = require('express')
const router = express.Router()


const { getUserById, getAllUsers, removeUser, updateUser } = require('../controllers/userController')
const { requireSignin, isAuth, isAdmin } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')


router.get('/:userId',[requireSignin,isAuth],getUserById)
router.param('userId',userById)
router.get('/all/:userId',[requireSignin,isAdmin],getAllUsers)
router.delete('/:userId',[requireSignin],removeUser)
router.put('/:userId',updateUser)
module.exports = router