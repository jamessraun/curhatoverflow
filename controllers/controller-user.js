const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const saltRounds = 10
const localStorage = require('localStorage')
const Token = localStorage.getItem('Token')

function signup (req,res,next){
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(req.body.password,salt)
  
  User.find({
    username: req.body.username
  },function(err,result){
    if(result){
      res.redirect('/login',{message: 'username already exist!'})
    }
    else{
      User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
      },function(err,result){
        if(!req.body.username || !req.body.password || !req.body.email){
          res.redirect('/login', message: 'Please fill all the data requirement')
        }
        else{
          res.redirect('/')
        }        
      })
    })
  }  
}

function loginscreen(req,res,next){
  res.render('login')
}

function login (req,res,next){
  User.findOne({
    username: req.body.username
  },function(err,result){
    if(bcrypt.compare(req.body.password,result.password)){
      var token = jwt.sign({username: data.username},process.env.SECRET)
      localStorage.setItem('Token',token)
      res.redirect('/')
    }
  })
}

function logout (req,res,next){
  Token = 'false'
  res.redirect('/login')
}

function editProfile (req,res,next){
  if(Token === 'false'){
    res.redirect('/login')
  }
  else{
    User.findOne({
      _id: req.params.id
    },function(err,result){
      res.render('editProfile',{user:result})
    })
  }  
}

function updateProfile (req,res,next){
  if(Token === 'false' || !Token){
    res.redirect('/login')
  }
  else{
    User.updateOne({
      id: req.params.id
    },{
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      fullname: req.body.fullname 
    },function(err,result){
      res.redirect(`/editProfile/${req.params.id}`)
    })
  }
}




module.exports = {
  signup,login,logout,editProfile,updateProfile,loginscreen
}