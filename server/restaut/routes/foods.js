const express = require('express')
const router = express.Router()


const { 
    createFood, 
    getAllFoods, 
    getFoodById, 
    foodById, 
    removeFood, 
    photoFood, 
    updateFood 
      } = require('../controllers/foodController')

const {
       requireSignin,
       isAuth, 
       isAdmin 
       } = require('../middlewares/auth')
       
const {
       userById 
      } = require('../middlewares/user')



router.post("/create",createFood)
router.param('userId',userById)
router.get("/all",getAllFoods)
router.get('/:foodId',getFoodById)
router.param('foodId',foodById)
router.delete('/:foodId/:userId',[requireSignin,isAuth,isAdmin],removeFood)
router.get("/image/:foodId",photoFood)
router.put("/:foodId/",updateFood)

module.exports = router