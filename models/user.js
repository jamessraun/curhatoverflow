const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String
  phone: String,
  fullname: String
})

var User = mongoose.model('User',UserSchema)

module.exports = User