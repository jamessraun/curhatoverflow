const Curhat = require ('../models/curhat.js')
const User = require ('../models/user.js')
const Comment = require('../models/comment.js')
const jwt = require ('jsonwebtoken')
const Storage = require('dom-storage')
var localStorage = new Storage('./db.json',{strict:false,ws:' '})
var Token = localStorage.getItem('myKey')
require('dotenv').config()

function createcomment(req, res, next) {
  console.log(req.body);
  if(!Token){
    res.redirect('/login')
  } else {
    let user = jwt.verify(Token, process.env.SECRET)
    User.findOne({
        _id: user._id
      },(err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        } else {
          let UserID = result._id
          Comment.create({
            curhat_id: req.params.id,
            comment: req.body.komentar,
            user_id: UserID
          },(err, result) =>{
            res.redirect(`/`)
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
          res.redirect(`/`)
        }
      })
    }
  })
}}

function deleteComment(req, res, next) {
  if(!Token){
    res.redirect('/login')
  } else {
    // let commentID = req.params.id
    Comment.remove({
      _id: req.params.id
    }).exec( (err, result) => {
      console.log(result);
      res.redirect(`/`)
    })
}}

module.exports = {
  createcomment, editComment, updateComment, deleteComment
}
