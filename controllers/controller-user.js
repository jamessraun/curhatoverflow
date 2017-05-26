const jwt = require ('jsonwebtoken')
const User = require ('../models/user.js')
const bcrypt = require ('bcrypt')
const saltRounds = 10
require('dotenv').config();
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const Storage = require('dom-storage');
var localStorage = new Storage('./db.json',{strict:false,ws:' '})
var Token = localStorage.getItem('myKey')
const transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth:{
    user: process.env.user_email,
    pass: process.env.password
  }
})

mongoose.connect('mongodb://localhost/library');


function signup (req,res,next){
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(req.body.password,salt)

  console.log('---------------------',req.body);

  User.find({$or:[
    {
      username: req.body.username
    },{
      email: req.body.email
    }]
  },function(err,result){
    console.log(result);
    if(result.length>0){
       if(result[0].username===req.body.username)
      res.render('signup',{title:"Signup",message:"username already exist"})

       if(result[0].email===req.body.email)
       res.render('signup',{title:"Signup",message:"email already exist"})
    }
    else{
      User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
      },function(err,result){

        console.log('masuk sini1`````````````````````');
            var mailOptions = {
                from: '"Curhatoverflow" <curhat@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Welcome to Curhatoverflow', // Subject line
                text: 'congratulation you are registered', // plain text body
                html: '<b>Please go here to get started!</b>\nwww.curhatoverflow.herokuapp.com' // html body
            }
            transporter.sendMail(mailOptions,(err,info)=>{
              console.log('mailOptions-----------',mailOptions);
              if(err){
                console.log(err);
              }
              else{
                res.redirect('/login')
              }
            })
    //      }
        })
      }
    })
  }

function loginscreen(req,res,next){
  res.render('login',{title:"Login",message:null})
}

function login (req,res,next){
  console.log('---------------',req.body);
  User.findOne({
    username: req.body.username
  },function(err,result){
    console.log(result);
    if(result===null){
      res.render('login',{title:'Login',message:"Invalid username or password!"})
    }
    else {
      if(bcrypt.compare(req.body.password,result.password)){

        var token = jwt.sign({_id: result._id,username: result.username,email:result.email},process.env.SECRET)
        localStorage = new Storage('./db.json',{strict:false, ws:' '})
          , myValue = token;

          localStorage.setItem('myKey',myValue)

          while (localStorage.getItem('myKey') === null) {
            localStorage.setItem('myKey',null)
          }res.redirect('/')
      }
    }

  })
}

function logout (req,res,next){

  localStorage = new Storage('./db.json',{strict:false, ws:' '})
    , myValue = null;

    localStorage.setItem('myKey',myValue);
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
      console.log(result);
      res.render('profile',{title:"Profile",user:result})
    })
  }
}

function updateProfile (req,res,next){
console.log(req.body);
  if(!Token){
    res.redirect('/login')
  }
  else{
    User.findOne({
      _id: req.params.id
    },function(err,result){

      result.email=req.body.email || result.email,
      result.phone= req.body.phone || result.phone,
      result.fullname=req.body.fullname || result.fullname
        result.save(function(err,result){
          res.redirect(`/profile/${result._id}`)
        })
    })
  }
}



module.exports = {
  signup,login,logout,editProfile,updateProfile,loginscreen
}
