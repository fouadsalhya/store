const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
      name      : {
         type:String,
         required:true,
         minlength:3,
         trim:true
      },
      email    : {
         type:String,
         required:true,
         minlength:3,
         trim:true,
         unique:true
      },
      hashed_password : {
         type:String,
         required:true
      },
      salt    : {
         type:String
      },
      role    : {
         type:Number,
         default:0
      },
      history : {
          type:Array,
          default:[]
      }
}, {timestamps:true})


userSchema.virtual('password')
  .set(function(password) {
      this._password = password
      this.salt = uuidv4()
      this.hashed_password = this.cryptPassword(password)
  })
  .get(function() {
      return this._password;
  })

  userSchema.methods = {
      authenticated : function(Text) {
          return this.cryptPassword(Text) === this.hashed_password
      },
      cryptPassword : function(password) {
          if(!password) return ''
          try {
              return crypto
                     .createHmac('sha1',this.salt)
                     .update(password)
                     .digest('hex')
          } catch (error) {
               return ''
          }
      }
  }

  module.exports = mongoose.model('User',userSchema)