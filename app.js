var express = require('express');
var bodyPaser = require('body-parser')
var ejs = require('ejs')
var index = require('./routes/index')
var app = express()


app.set('view engine','ejs')

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))


app.use('/',index)



app.listen(3000);
