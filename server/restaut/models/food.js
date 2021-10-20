const mongoose = require('mongoose')


const foodSchema = new mongoose.Schema({
    name: {
        required:true,
        type:String
    },
    description: {
      type:String,
      required:true,
      minlength:8
    },
    image: {
        data:Buffer,
        contentType:String,
 
    },
    price: {
        type:Number
    }
})

module.exports = mongoose.model('Food',foodSchema)