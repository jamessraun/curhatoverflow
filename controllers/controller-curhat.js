const Curhat = require ('../models/curhat.js')
const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
const localStorage = require('localStorage')
const Token = localStorage.getItem('Token')
require('dotenv').config()

function createCurhat(req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    User.findOne({
    let user = jwt.verify(Token, process.env.SECRET)  
      _id: user._id 
    },function(err,result){
      Curhat.create({
        curhat: req.body.curhat,
        user_id: result._id
      },function(err,result){
        res.redirect('/')
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
      title: req.body.title
      curhat: req.body.curhat
    },function(err,result){
      res.redirect('/')
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
      res.redirect('/')
    })
  }  
}

function Home(req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    Curhat.find({})
    .populate('user_id')
    .exec(function(err,result){
    let user = jwt.verify(Token, process.env.SECRET)
      res.render('index',{curhats: result, user:user})
    })
  }  
}

function myCurhats (req,res,next){
  Curhat.find({
    let user = jwt.verify(Token, process.env.SECRET)
    user_id : user._id
  })
  .populate('user_id')
  .exec(function(err,result)=>{
    res.render('myCurhat', {curhats:result, user:user})
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