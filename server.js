const express = require('express')
const app = express()
const path = require('path')
const robbie = require('./public/robbie')

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url)
  next()
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString())
  next()
}

app.use(urlLogger, timeLogger)
app.use(express.static('public'))

app.get('/sunsets', (request, response) => {
  response.status(200).sendFile(path.join(__dirname + '/public/sunsets.html'))
})

app.get('/json', (request, response) => {
  response.status(200).json(robbie)
})

app.listen(3000, () => {
  console.log('Express Intro running on localhost:3000')
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
