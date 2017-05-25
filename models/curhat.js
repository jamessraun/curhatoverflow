
const mongoose = require('mongoose')
const Schema = mongoose.Schema


var CurhatSchema = new Schema({
  title: String,
  curhat: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Curhat = mongoose.model('Curhat',CurhatSchema)

module.exports = Curhat
