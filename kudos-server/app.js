var express = require('express')
var cors = require('cors')
var indexRouter = require('./routes/index')

var app = express()

app.use(cors())
app.use(express.json())
app.set('view engine', 'html');

app.use('/', indexRouter)

app.use(function(_, res, _) {
    res.status(404).json("Not found.")
})

var port = process.env.PORT || 5003
app.listen(port)

console.log('Server started '+ port)
