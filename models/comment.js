
const mongoose = require('mongoose')
const Schema = mongoose.Schema


var CommentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  curhat_id: {
    type: Schema.Types.ObjectId,
    ref: 'Curhat'
  }
})

var Comment = mongoose.model('Comment',CommentSchema)

module.exports = Comment
