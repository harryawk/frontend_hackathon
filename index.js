
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var the_request = require('request')
var formidable = require('formidable')
var crypto = require('crypto')
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

function sha256(input, secret) {
  const hash = crypto.createHmac('sha256', secret)
    .update(input)
    .digest('hex');

  return hash;
}

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

  var reqJson = req.body
  console.log(reqJson)

  var the_data_1 = reqJson['data_1']

  // res.send('asdf')
  // return

  var form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    console.log('start')
    var file_type_1 = files.data_2.type
    var old_path_1 = files.data_2.path
    var file_size_1 = files.data_2.size
    var file_ext_1 = files.data_2.name.split('.').pop()
    var index_1 = old_path_1.lastIndexOf('\\') + 1
    var file_name_1 = old_path_1.substr(index_1)
    var new_path_1 = path.join(__dirname, 'public\\uploads', file_name_1 + '.' + file_ext_1)
    
    var file_type_2 = files.data_3.type
    var old_path_2 = files.data_3.path
    var file_size_2 = files.data_3.size
    var file_ext_2 = files.data_3.name.split('.').pop()
    var index_2 = old_path_2.lastIndexOf('\\') + 1
    var file_name_2 = old_path_2.substr(index_2)
    var new_path_2 = path.join(__dirname, 'public\\uploads', file_name_2 + '.' + file_ext_2)
    
    var file_type_3 = files.data_4.type
    var old_path_3 = files.data_4.path
    var file_size_3 = files.data_4.size
    var file_ext_3 = files.data_4.name.split('.').pop()
    var index_3 = old_path_3.lastIndexOf('\\') + 1
    var file_name_3 = old_path_3.substr(index_3)
    var new_path_3 = path.join(__dirname, 'public\\uploads', file_name_3 + '.' + file_ext_3)
    console.log('start')

    fs.readFile(old_path_1, (err_1, result_data_1) => {
      if (err_1) console.log(err_1)
      console.log('readfile_1')
      fs.writeFile(new_path_1, result_data_1, (err_1) => {
        console.log('writefile_1')

        fs.readFile(old_path_2, (err_2, result_data_2) => {
          console.log('readfile_2')
          fs.writeFile(new_path_2, result_data_2, (err_2) => {
            console.log('writefile_2')

            fs.readFile(old_path_3, (err_3, result_data_3) => {
              console.log('readfile_2')              
              fs.writeFile(new_path_3, result_data_3, (err_3) => {
                console.log('writefile_3')
                
                console.log("result_data_1")
                console.log('data:' + file_type_1 + ';base64,' + result_data_1.toString('base64'))
                console.log("result_data_2")
                console.log('data:' + file_type_2 + ';base64,' + result_data_2.toString('base64'))
                console.log("result_data_3")
                console.log('data:' + file_type_3 + ';base64,' + result_data_3.toString('base64'))

                var received_data_1 = 'data:' + file_type_1 + ';base64,' + result_data_1.toString('base64')
                var received_data_2 = 'data:' + file_type_2 + ';base64,' + result_data_2.toString('base64')
                var received_data_3 = 'data:' + file_type_3 + ';base64,' + result_data_3.toString('base64')

                var formData_1 = {
                  apikey: OCR_API_KEY,
                  base64Image: received_data_1
                }
                var formData_2 = {
                  apikey: OCR_API_KEY,
                  base64Image: received_data_2
                }
                var formData_3 = {
                  apikey: OCR_API_KEY,
                  base64Image: received_data_3
                }

                var result_1
                var result_2
                var result_3

                the_request.post({ url: 'https://api.ocr.space/parse/image', formData: formData_1 }, (err, httpResponse, body) => {
                  
                  if (err) {
                    console.log("err")
                    console.log(err)
                    
                    res.json({success: false, data_ke: 1, err: err})
                  } else {
                    console.log("body")
                    console.log(body)
                    result_1 = JSON.parse(body)
                    
                    the_request.post({ url: 'https://api.ocr.space/parse/image', formData: formData_2 }, (err, httpResponse, body) => {

                      if (err) {
                        console.log("err")
                        console.log(err)

                        res.json({ success: false, data_ke: 2, err: err})

                      } else {
                        console.log("body")
                        console.log(body)
                        result_2 = JSON.parse(body)

                        the_request.post({ url: 'https://api.ocr.space/parse/image', formData: formData_3 }, (err, httpResponse, body) => {
                          if (err) {
                            console.log("err")
                            console.log(err)
                            res.json({ success: false, data_ke: 3, err: err})
                          } else {

                            console.log("body")
                            console.log(body)
                            result_3 = JSON.parse(body)

                            res.json({success: true, data: {
                              result_1: sha256(JSON.stringify(result_1), '12345'),
                              result_2: sha256(JSON.stringify(result_2), '12345'),
                              result_3: sha256(JSON.stringify(result_3), '12345')
                            }})
                          }
                        })
                      }
                    })
                  }
                })

              })
            })
          })
        })

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

app.get('/nasabah_konfirmasi_berhasil', (req, res) => {
  res.render("nasabah_konfirmasi_berhasil");
})

app.get('/nasabah_konfirmasi_gagal', (req, res) => {
  res.render("nasabah_konfirmasi_gagal");
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});