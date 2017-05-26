const Comment = require ('../models/comment.js')
const Curhat = require ('../models/curhat.js')
const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
require('dotenv').config()
const Storage = require('dom-storage')
var localStorage = new Storage('./db.json',{strict:false,ws:' '})
var Token = localStorage.getItem('myKey')
const OAuth = require('oauth')
require('dotenv').config()
var oauth = new OAuth.OAuth(
       'https://api.twitter.com/oauth/request_token',
       'https://api.twitter.com/oauth/access_token',
       process.env.Consumer_Key,
       process.env.Consumer_Secret,
       '1.0A',
       null,
       'HMAC-SHA1'
     )

function createCurhat(req,res,next){

  if(!Token){
    res.redirect('/login')
  }
  else{
    let user = jwt.verify(Token, process.env.SECRET)
    User.findOne({
      _id: user._id
    },function(err,result){
      Curhat.create({
        curhat: req.body.curhat,
        user_id: result._id
      },function(err,result){
            let post = `${req.body.curhat}`
            oauth.post(
                        `https://api.twitter.com/1.1/statuses/update.json?status=www.curhatoverflow.herokuapp.com\n${req.body.curhat}`,
                        process.env.Access_token,
                        process.env.Access_token_secret,
                        post,
                        'text',
                        function(e, data) {
                          if (e) console.error(data);
                          res.redirect('/mycurhat')
                        }
                      );
                    })
                  })
                }
              }

function updateCurhat(req,res,next){

  if(!Token){

    res.redirect('/login')
  }
  else{
    Curhat.updateOne({
      _id: req.params.id
    },{
      curhat: req.body.curhatnew
    },function(err,result){
      res.redirect('/mycurhat')
    })
  }
}

function deleteCurhat(req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    Curhat.remove({
      _id: req.params.id
    },function(err,result){
      res.redirect('/myCurhat')
    })
  }
}

function Home(req,res,next){

  console.log('HOME-------------',Token);
  if(Token===null){
    let user={_id:null}
    Curhat.find({})
    .populate('user_id')
    .exec(function(err,result){
      console.log('-------curhat------\n'+result);
      Comment.find({curhat_id: result._id},(err,comments) =>{
        console.log('-----komen-------\n'+ comments);
        res.render('home',{title:"Home",curhats: result, user:user,comments:comments})
      })

    })
  }
  else{
    Curhat.find({})
    .populate('user_id')
    .exec(function(err,result){
        console.log('-------curhat------\n'+result);
    let user = jwt.verify(Token, process.env.SECRET)
    console.log(user);
    Comment.find((err,comments) =>{
      console.log(comments);
      res.render('home',{title:"Home",curhats: result, user:user,comments:comments})
    })
    })
  }
}


function myCurhats (req,res,next){
  let user = jwt.verify(Token, process.env.SECRET)
  Curhat.find({
    user_id : user._id
  })
  .populate('user_id')
  .exec(function(err,result){
    res.render('mycurhat', {title:'Mycurhat',curhats:result, user:user})
  })
}

function searchCurhat(req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    Curhat.find({
      title: req.body.title

    })
    .populate('user_id')
    .exec(function(err,result){

      res.render('search',{curhats:result})
    })
  }
}

function editCurhat (req,res,next){

  if(!Token){

    res.redirect('/login')
  }
  else{
    Curhat.findOne({
      _id: req.params.id
    },function(err,result){
      res.render('edit',{curhat: result})
    })
  }
}

module.exports = {
  createCurhat,updateCurhat,deleteCurhat,Home,editCurhat,searchCurhat,myCurhats
}
