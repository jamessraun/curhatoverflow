const Curhat = require ('../models/curhat.js')
const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
const localStorage = require('localStorage')
const Token = localStorage.getItem('Token')
require('dotenv').config()

function createCurhat(req,res,next){
<<<<<<< HEAD
  if(Token === 'false' || !Token){
=======
  if(!Token){
>>>>>>> master
    res.redirect('/login')
  }
  else{
    User.findOne({
      _id: req.params.id 
    },function(err,result){
      Curhat.create({
        curhat: req.body.curhat,
        user_id: result.id
      },function(err,result){
        res.redirect('/')
      })
    })
  }    
}

function updateCurhat(req,res,next){
<<<<<<< HEAD
  if(Token === 'false' || !Token){
=======
  if(!Token){
>>>>>>> master
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
<<<<<<< HEAD
  if(Token === 'false' || !Token){
=======
  if(!Token){
>>>>>>> master
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
<<<<<<< HEAD
  if(Token === 'false' || !Token){
=======
  if(!Token){
>>>>>>> master
    res.redirect('/login')
  }
  else{
    Curhat.find({})
    .populate('user_id')
    .exec(function(err,result){
    let username = jwt.verify(Token, process.env.SECRET)
<<<<<<< HEAD
      res.render('index',{curhats: result, user:username})
=======
      res.render('index',{curhats: result})
>>>>>>> master
    })
  }  
}

<<<<<<< HEAD
function searchCurhat(req,res,next){
  if(Token === 'false' || !Token){
=======
function myCurhats (req,res,next){
  Curhat.find({})
  .populate('user_id')
  .exec(function(err,result)=>{
    res.render('myCurhat', {curhats:result})
  })
}

function searchCurhat(req,res,next){
  if(!Token){
>>>>>>> master
    res.redirect('/login')
  }
  else{
    Curhat.find({
      title: req.body.title
<<<<<<< HEAD
    },function(err,result){
=======
    })
    .populate('user_id')
    .exec(function(err,result){
>>>>>>> master
      res.render('search',{curhats:result})
    })
  }  
}

function editCurhat (req,res,next){
<<<<<<< HEAD
  if(Token === 'false' || !Token){
=======
  if(!Token){
>>>>>>> master
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
  createCurhat,updateCurhat,deleteCurhat,Home,editCurhat
}