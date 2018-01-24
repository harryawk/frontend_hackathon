
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var the_request = require('request')
var formidable = require('formidable')
var app = express().use(bodyParser.json()); // creates express http server
var cors = require('cors')

var OCR_API_KEY = '6347acde5088957'

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('port', (process.env.PORT || 1337));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var fs = require('fs');
// var admin = require('firebase-admin')
// var faker = require('faker')

app.get('/', (req, res) => {



  res.json({
    success: true
  })
})

app.post('/ocr/test', (req, res) => {

  var reqJson = req.body

  
})

app.get('/nasabah', (req, res) => {
  res.render("nasabah");
})

app.get('/perusahaan_asuransi', (req, res) => {
  res.render("perusahaan_asuransi");
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});