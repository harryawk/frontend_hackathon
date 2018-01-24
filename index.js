
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
var admin = require('firebase-admin')
var path = require('path')

app.get('/', (req, res) => {



  res.json({
    success: true
  })
})

app.get('/ocr/collect', (req, res) => {
  res.render('upload')
})

app.post('/ocr/test', (req, res) => {

  var reqJson = req.body

  var form  = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    var old_path = files.the_file.path
    var file_size = files.the_file.size
    var file_ext = files.the_file.name.split('.').pop()
    var index = old_path.lastIndexOf('\\') + 1
    var file_name = old_path.substr(index)
    console.log(old_path)
    console.log(file_name)
    var new_path = path.join(__dirname, 'public\\uploads', file_name + '.' + file_ext)
    console.log(new_path)

    fs.readFile(old_path, (err, data) => {
      // console.log("data_1")
      // console.log(data)
      fs.writeFile(new_path, data, (err) => {
        // console.log("data_2")
        // console.log(data)
        // fs.unlink(old_path, (err) => {
          if (err) {
            console.log("err")
            console.log(err)
            res.status(500).json({
              success: false,
              err: err
            })
          }
          else {

            res.status(200).json({success: true})
          }
        // })
      })
    })
  })
  
})

app.post('/ocr/request', (req, res) => {
  var form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    console.log(files.the_file)
    var file_type = files.the_file.type
    var old_path = files.the_file.path
    var file_size = files.the_file.size
    var file_ext = files.the_file.name.split('.').pop()
    var index = old_path.lastIndexOf('\\') + 1
    var file_name = old_path.substr(index)
    console.log(old_path)
    console.log(file_name)
    var new_path = path.join(__dirname, 'public\\uploads', file_name + '.' + file_ext)
    console.log(new_path)

    fs.readFile(old_path, (err, data) => {
      // console.log("data_1")
      // console.log(data)
      fs.writeFile(new_path, data, (err) => {
        console.log("data_2")
        console.log('data:image/'+file_ext+';base64,'+data.toString('base64'))
        // fs.unlink(old_path, (err) => {
        var baseURL = 'http://localhost:1337/uploads/'
        var formData = {
          apikey: OCR_API_KEY,
          base64Image: 'data:' + file_type + ';base64,' + data.toString('base64')
        }
        the_request.post({ url: 'https://api.ocr.space/parse/image', formData: formData }, (err, httpResponse, body) => {
          if (err) {
            console.log("err")
            console.log(err)
            res.json({ succes: false, err: err })
          } else {
            console.log("body")
            console.log(body)

            res.json({success: true, data: JSON.parse(body)})
          }
          
        })
        // if (err) {
        //   console.log("err")
        //   console.log(err)
        //   res.status(500).json({
        //     success: false,
        //     err: err
        //   })
        // }
        // else {

        //   res.status(200).json({ success: true })
        // }
        // })
      })
    })
  })
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