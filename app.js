var mongoose=require('mongoose');
var express = require('express');
var bodyPaser = require('body-parser')
var logger = require('morgan')
var ejs = require('ejs')
var index = require('./routes/index')
var app = express()
//var uri = 'mongodb://curhatoverflow:curhatoverflow@ds153521.mlab.com:53521/curhatoverflow'
mongoose.connect('mongodb://localhost/library');
// mongoose.connect(uri)
// const db = mongoose.connect(uri)

app.set('view engine','ejs')

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))
app.use(logger('dev'))


app.use('/',index)

// app.use(function(req, res, next) {
//   var err = new Error('Not Found lagi render');
//   err.status = 404;
//   next(err);
// });


app.listen(3000);
