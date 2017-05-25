var express = require('express');
var bodyPaser = require('body-parser')
var ejs = require('ejs')
var index = require('./routes/index')
var app = express()
var uri = 'mongodb:curhatoverflow:curhatoverflow@ds153521.mlab.com:53521/curhatoverflow'
mongoose.connect(uri)
const db = mongoose.conect(uri)

app.set('view engine','ejs')

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))


app.use('/',index)



app.listen(3000);
