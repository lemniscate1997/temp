const express = require('express')
const bodyParser = require('body-parser')
const getData = require('./router/getList')
const cors = require('cors')

var app = express()

app.options('*', cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/session-data', getData)
app.listen(3000);