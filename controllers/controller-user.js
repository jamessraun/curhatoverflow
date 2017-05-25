const User = require ('../models/user.js')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const saltRounds = 10
const localStorage = require('localStorage')
const Token = localStorage.getItem('Token')

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail.com'
  auth:{
    user: process.env.user_email,
    password: process.env.password
  }
})
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
          let user = jwt.verify(Token,process.env.SECRET)
          var mailOptions = {
              from: '<curhat@gmail.com>', // sender address
              to: user.email, // list of receivers
              subject: 'Welcome to Curhatoverflow', // Subject line
              text: 'congratulation you are registered!', // plain text body
              html: '<b>Please go here to get started!</b>\nwww.curhatoverflow.herokuapp.com' // html body
          }
          transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
              console.log(err);
            }
            else{
              res.redirect('/')
            }            
          })          

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

      var token = jwt.sign({_id: result._id,username: data.username,email:data.email},process.env.SECRET)
      localStorage.setItem('Token',token)
      res.redirect('/')
    }
  })
}

function logout (req,res,next){

  localStorage.clear()
  res.redirect('/login')
}

function editProfile (req,res,next){

  if(!Token){
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

  if(!Token){
    res.redirect('/login')
  }
  else{
    User.findOne({
      _id: req.params.id
    },function(err,result){

      res.redirect(`/editProfile/${req.params.id}`)
  if(!Token){
    res.redirect('/login')
  }
  else{
    User.findOne({
      _id: req.params.id
    },function(err,result){

      User.updateOne({
        _id: req.params.id
      },{
        username: req.body.username || result.username,
        password: req.body.password || result.password,
        email: req.body.email || result.email,
        phone: req.body.phone || result.phone,
        fullname: req.body.fullname || result.fullname 
      },function(err,result){
        res.redirect(`/editProfile/${req.params.id}`)
      })
    })
  }
}




module.exports = {
  signup,login,logout,editProfile,updateProfile,loginscreen
}