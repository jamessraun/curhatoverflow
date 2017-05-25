const Curhat = require ('../models/curhat.js')
const User = require ('../models/user.js')
const Comment = require('../models/comment.js')
const jwt = require ('jsonwebtoken')
const localStorage = require('localStorage')
const Token = localStorage.getItem('Token')
require('dotenv').config()

function createcomment(req, res, next) {
  if(!Token){
    res.redirect('/login')
  } else {
    let username = jwt.verify(Token, process.env.SECRET)
    User.findOne({
        username: username
      }).exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          let UserID = result.id
          Comment.create({
            curhat_id: req.params.id
            comment: req.body.komen
            user_id: UserID
          }).exec( (err, result) => {
            res.redirect(`/curhat/${req.params.id}`)
          })
        }
      })
  }
}

function editComment(req, res, next) {
  if(!Token){
    res.redirect('/login')
  } else {
    let commentID = req.params.commentID
  Comment.findOne({
    _id: commentID
  }).exec( (err, result) => {
    res.render('yang nantinya ejs untuk edit comment', { data: result })
  })
}}

function updateComment(req, res, next) {
  if(!Token){
    res.redirect('/login')
  } else {
    let commentID = req.params.id
  Comment.findOne({
    _id: commentID
  }).exec( (err, result) => {
    if (err) {
      console.log(err);
    } else {
      Comment.updateOne({
        comment: req.body.komen
      }).exec( (err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/curhat/${result.curhat_id}`)
        }
      })
    }
  })
}}

function deleteComment(req, res, next) {
  if(!Token){
    res.redirect('/login')
  } else {
    let commentID = req.params.id
  Comment.findOne({
    _id: commentID
  })exec( (err, result) => {
    Comment.remove({
      _id: CommentID
    }).exec( (err, result) => {
      res.redirect(`/curhat/${result.curhat_id}`)
    })
  })
}}

module.exports = {
  createcomment, editComment, updateComment, deleteComment
}
