const Food = require('../models/food')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.createFood = (req,res) => {
    let form = new formidable.IncomingForm()
      form.keepExtensions = true;
      form.parse(req,(err,fields,files) => {
        if(err) {
            res.status(400).json({err})
        }
        let food = new Food(fields)
        if(files.image){
            food.image.data = fs.readFileSync(files.image.path)
            food.image.contentType = files.image.type
        }
        food.save((err,food) => {
           if(err) {
               res.status(400).json({err});
           }
           res.json({food})
        })
    })
}

exports.getAllFoods = (req,res) => {
       Food.find().exec((err,foods) => {
           if(err || !foods) {
               res.status(404).send(err);
           }
           res.status(200).json({foods});
       })
}

exports.foodById = (req,res,next,id) => {
    Food.findById(id).exec((err,food) => {
        if(err || !food) {
            res.status(404).send(err);
        }
         req.food = food
         next()
    })
}

exports.getFoodById = (req,res) => {
    let food = req.food;
    res.json({food})
}

exports.removeFood = (req,res) => {
    let food = req.food
    food.remove((err,food) => {
        if(err) {
            res.send(err)
        }
        res.json({})
    })
}

exports.updateFood = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(err) {
            res.status(400).json({err})
        }
        let food = req.food
            food = _.extend(food,fields)
            if(files.image){
                food.image.data = fs.readFileSync(files.image.path)
                food.image.contentType = files.image.type
            }
            food.save((err,food) => {
               if(err) {
                   res.status(400).json({err});
               }
               res.json({food})
            })
    })
        

    
}

exports.photoFood = (req,res) => {
          
    const { data , contentType } = req.food.image
    if(data) {
        res.set('Content-Type',contentType)
        return res.send(data)
    }
}

